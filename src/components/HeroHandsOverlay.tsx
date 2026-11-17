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

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let posBuffer: WebGLBuffer | null = null;
    let texture: WebGLTexture | null = null;

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

    const initGL = () => {
      gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });

      if (!gl) {
        gl = canvas.getContext("experimental-webgl", {
          alpha: true,
          premultipliedAlpha: false,
          antialias: false,
          preserveDrawingBuffer: true,
        }) as WebGLRenderingContext | null;
      }

      if (!gl) {
        console.warn("[HeroHandsOverlay] WebGL not available");
        return false;
      }

      // Match native 1920x1080 Full HD resolution for 1:1 pixel precision
      canvas.width = 1920;
      canvas.height = 1080;
      gl.viewport(0, 0, 1920, 1080);

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

      vs = compileShader(gl.VERTEX_SHADER, vsSource);
      fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("[HeroHandsOverlay] Program link error:", gl.getProgramInfoLog(program));
        return false;
      }
      gl.useProgram(program);

      // Fullscreen quad
      const quadVertices = new Float32Array([
        -1,  1,
         1,  1,
        -1, -1,
         1, -1,
      ]);
      posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

      const aPosLoc = gl.getAttribLocation(program, "a_pos");
      gl.enableVertexAttribArray(aPosLoc);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

      // Texture setup
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      return true;
    };

    if (!initGL()) return;

    let isVisible = true;
    let isRunning = false;
    let vfcId: number | null = null;
    let rafId: number | null = null;
    let lastRenderedTime = -1;

    const render = () => {
      if (!gl || !video || video.readyState < 2) return;

      const currentTime = video.currentTime;
      // Skip redundant GPU re-uploads when frame hasn't progressed
      if (currentTime === lastRenderedTime && lastRenderedTime >= 0) {
        return;
      }
      lastRenderedTime = currentTime;

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const scheduleNextFrame = () => {
      if (!isRunning) return;

      if ("requestVideoFrameCallback" in video) {
        vfcId = video.requestVideoFrameCallback(() => {
          vfcId = null;
          if (!isRunning) return;
          if (isVisible) {
            render();
          }
          scheduleNextFrame();
        });
      } else {
        rafId = requestAnimationFrame(() => {
          rafId = null;
          if (!isRunning) return;
          if (isVisible) {
            render();
          }
          scheduleNextFrame();
        });
      }
    };

    const startAnimation = () => {
      if (isRunning || prefersReducedMotion) return;
      isRunning = true;
      if (isVisible) {
        lastRenderedTime = -1;
        render();
      }
      scheduleNextFrame();
    };

    const stopAnimation = () => {
      isRunning = false;
      if (vfcId !== null && "cancelVideoFrameCallback" in video) {
        video.cancelVideoFrameCallback(vfcId);
        vfcId = null;
      }
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // Event listeners on video element to guarantee sync
    const handleCanPlay = () => {
      lastRenderedTime = -1;
      render();
      startAnimation();
    };

    const handleSeeked = () => {
      lastRenderedTime = -1;
      render();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", startAnimation);
    video.addEventListener("play", startAnimation);
    video.addEventListener("seeked", handleSeeked);

    if (video.readyState >= 2) {
      handleCanPlay();
    }

    // IntersectionObserver targeting #hero to suspend render loop when offscreen
    const heroSection = document.getElementById("hero") || canvas;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isVisible = inView;
        if (inView) {
          startAnimation();
          lastRenderedTime = -1;
          render();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);

    // Tab visibility handling
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        stopAnimation();
      } else {
        isVisible = true;
        startAnimation();
        lastRenderedTime = -1;
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // WebGL Context Loss / Restoration
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      stopAnimation();
    };

    const handleContextRestored = () => {
      initGL();
      startAnimation();
      lastRenderedTime = -1;
      render();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", startAnimation);
      video.removeEventListener("play", startAnimation);
      video.removeEventListener("seeked", handleSeeked);

      if (gl) {
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        if (posBuffer) gl.deleteBuffer(posBuffer);
        if (texture) gl.deleteTexture(texture);
      }
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
