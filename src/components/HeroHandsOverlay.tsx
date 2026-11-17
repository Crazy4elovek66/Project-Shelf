"use client";

import { useEffect, useRef } from "react";

interface HeroHandsOverlayProps {
  video: HTMLVideoElement | null;
}

export function HeroHandsOverlay({ video }: HeroHandsOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !video) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Low-power, fast alpha WebGL context
    let gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    });

    if (!gl) {
      gl = canvas.getContext("experimental-webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
      }) as WebGLRenderingContext | null;
    }

    if (!gl) {
      console.warn("[HeroHandsOverlay] WebGL not supported, right hand rendered via background video.");
      return;
    }

    // Set canvas internal resolution to 1280x720 for 60 FPS performance and crisp detail
    canvas.width = 1280;
    canvas.height = 720;
    gl.viewport(0, 0, 1280, 720);

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = vec2((a_pos.x + 1.0) * 0.5, (1.0 - a_pos.y) * 0.5);
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      uniform sampler2D u_video;
      varying vec2 v_uv;
      void main() {
        // Top half: 1920x1080 RGB color frame
        vec2 color_uv = vec2(v_uv.x, v_uv.y * 0.5);
        // Bottom half: 1920x1080 right hand alpha mask
        vec2 mask_uv = vec2(v_uv.x, 0.5 + v_uv.y * 0.5);

        float mask = texture2D(u_video, mask_uv).r;
        if (mask < 0.02) {
          discard;
        }

        vec4 color = texture2D(u_video, color_uv);

        // Match contrast (1.28) and brightness (1.06) from background CSS video
        vec3 rgb = color.rgb * 1.06;
        rgb = clamp((rgb - 0.5) * 1.28 + 0.5, 0.0, 1.0);

        gl_FragColor = vec4(rgb, mask);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error("[HeroHandsOverlay] Shader compile error:", gl!.getShaderInfoLog(shader));
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[HeroHandsOverlay] Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Fullscreen quad
    const quadVertices = new Float32Array([
      -1,  1,
       1,  1,
      -1, -1,
       1, -1,
    ]);
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Texture configuration
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Enable standard alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let isVisible = true;
    let animId: number | null = null;

    const renderFrame = () => {
      if (!isVisible) return;

      if (video.readyState >= 2 && !video.paused && !video.ended) {
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, video);
        gl!.clearColor(0, 0, 0, 0);
        gl!.clear(gl!.COLOR_BUFFER_BIT);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    const startAnimation = () => {
      if (!animId && !prefersReducedMotion) {
        animId = requestAnimationFrame(renderFrame);
      }
    };

    const stopAnimation = () => {
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    const handleCanPlay = () => {
      renderFrame();
      startAnimation();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", startAnimation);

    if (video.readyState >= 2) {
      startAnimation();
    }

    // Observer targeting #hero to suspend render loop when offscreen
    const heroSection = document.getElementById("hero") || canvas;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        if (inView && !isVisible) {
          isVisible = true;
          startAnimation();
        } else if (!inView && isVisible) {
          isVisible = false;
          stopAnimation();
        }
      },
      { threshold: 0 }
    );
    observer.observe(heroSection);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        stopAnimation();
      } else {
        isVisible = true;
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", startAnimation);
      gl?.deleteProgram(program);
      gl?.deleteShader(vs);
      gl?.deleteShader(fs);
      gl?.deleteBuffer(posBuffer);
      gl?.deleteTexture(texture);
    };
  }, [video]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[25] block h-full w-full select-none"
    />
  );
}
