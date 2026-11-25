"use client";

import { useEffect, useRef } from "react";

interface HeroHandsOverlayProps {
  video: HTMLVideoElement | null;
  children: React.ReactNode;
}

export function HeroHandsOverlay({ video, children }: HeroHandsOverlayProps) {
  const robotCanvasRef = useRef<HTMLCanvasElement>(null);
  const humanCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const robotCanvas = robotCanvasRef.current;
    const humanCanvas = humanCanvasRef.current;
    if (!robotCanvas || !humanCanvas || !video) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const vsSource = `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = vec2((a_pos.x + 1.0) * 0.5, (1.0 - a_pos.y) * 0.5);
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    // Layer 1: Left Robot Hand ONLY (discard human hand where mask > 0.02 and black background)
    const fsRobotSource = `
      precision mediump float;
      uniform sampler2D u_video;
      varying vec2 v_uv;
      void main() {
        vec2 color_uv = vec2(v_uv.x, v_uv.y * 0.5);
        vec2 mask_uv = vec2(v_uv.x, 0.5 + v_uv.y * 0.5);

        float human_mask = texture2D(u_video, mask_uv).r;
        if (human_mask > 0.02) {
          discard;
        }

        vec4 color = texture2D(u_video, color_uv);
        float luma = max(color.r, max(color.g, color.b));
        if (luma < 0.02) {
          discard;
        }

        // Match contrast (1.28) and brightness (1.06)
        vec3 rgb = color.rgb * 1.06;
        rgb = clamp((rgb - 0.5) * 1.28 + 0.5, 0.0, 1.0);
        float alpha = clamp(luma * 10.0, 0.0, 1.0);

        gl_FragColor = vec4(rgb, alpha);
      }
    `;

    // Layer 3: Right Human Hand ONLY (masked by alpha mask in bottom half of stacked video)
    const fsHumanSource = `
      precision mediump float;
      uniform sampler2D u_video;
      varying vec2 v_uv;
      void main() {
        vec2 color_uv = vec2(v_uv.x, v_uv.y * 0.5);
        vec2 mask_uv = vec2(v_uv.x, 0.5 + v_uv.y * 0.5);

        float mask = texture2D(u_video, mask_uv).r;
        if (mask < 0.02) {
          discard;
        }

        vec4 color = texture2D(u_video, color_uv);

        // Match contrast (1.28) and brightness (1.06)
        vec3 rgb = color.rgb * 1.06;
        rgb = clamp((rgb - 0.5) * 1.28 + 0.5, 0.0, 1.0);

        gl_FragColor = vec4(rgb, mask);
      }
    `;

    type LayerContext = {
      gl: WebGLRenderingContext;
      program: WebGLProgram;
      texture: WebGLTexture;
      posBuffer: WebGLBuffer;
      vs: WebGLShader;
      fs: WebGLShader;
    };

    const initLayer = (canvas: HTMLCanvasElement, fsCode: string): LayerContext | null => {
      let gl = canvas.getContext("webgl", {
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

      if (!gl) return null;

      const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
      const targetWidth = isMobile ? 960 : 1920;
      const targetHeight = isMobile ? 540 : 1080;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      gl.viewport(0, 0, targetWidth, targetHeight);

      const compileShader = (type: number, src: string) => {
        const shader = gl!.createShader(type);
        if (!shader) return null;
        gl!.shaderSource(shader, src);
        gl!.compileShader(shader);
        if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
          gl!.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compileShader(gl.VERTEX_SHADER, vsSource);
      const fs = compileShader(gl.FRAGMENT_SHADER, fsCode);
      if (!vs || !fs) return null;

      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return null;
      }
      gl.useProgram(program);

      const quad = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]);
      const posBuffer = gl.createBuffer();
      if (!posBuffer) return null;
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

      const aPosLoc = gl.getAttribLocation(program, "a_pos");
      gl.enableVertexAttribArray(aPosLoc);
      gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

      const texture = gl.createTexture();
      if (!texture) return null;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      return { gl, program, texture, posBuffer, vs, fs };
    };

    const robotLayer = initLayer(robotCanvas, fsRobotSource);
    const humanLayer = initLayer(humanCanvas, fsHumanSource);

    if (!robotLayer || !humanLayer) {
      console.warn("[HeroHandsOverlay] WebGL initialization failed");
      return;
    }

    let isVisible = true;
    let isRunning = false;
    let vfcId: number | null = null;
    let rafId: number | null = null;
    let lastRenderedTime = -1;

    const render = () => {
      if (!video || video.readyState < 2) return;

      const currentTime = video.currentTime;
      if (currentTime === lastRenderedTime && lastRenderedTime >= 0) {
        return;
      }
      lastRenderedTime = currentTime;

      // 1. Render Robot Hand to background canvas (behind FULL-STACK)
      const gl1 = robotLayer.gl;
      gl1.bindTexture(gl1.TEXTURE_2D, robotLayer.texture);
      gl1.texImage2D(gl1.TEXTURE_2D, 0, gl1.RGBA, gl1.RGBA, gl1.UNSIGNED_BYTE, video);
      gl1.clearColor(0, 0, 0, 0);
      gl1.clear(gl1.COLOR_BUFFER_BIT);
      gl1.drawArrays(gl1.TRIANGLE_STRIP, 0, 4);

      // 2. Render Human Hand to foreground canvas (above AI DEVELOPER)
      const gl2 = humanLayer.gl;
      gl2.bindTexture(gl2.TEXTURE_2D, humanLayer.texture);
      gl2.texImage2D(gl2.TEXTURE_2D, 0, gl2.RGBA, gl2.RGBA, gl2.UNSIGNED_BYTE, video);
      gl2.clearColor(0, 0, 0, 0);
      gl2.clear(gl2.COLOR_BUFFER_BIT);
      gl2.drawArrays(gl2.TRIANGLE_STRIP, 0, 4);
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

    // Suspend render loop & pause video decoder when offscreen
    const heroSection = document.getElementById("hero") || robotCanvas;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isVisible = inView && !document.hidden;
        if (isVisible) {
          if (video.paused && !prefersReducedMotion) {
            video.play().catch(() => {});
          }
          startAnimation();
          lastRenderedTime = -1;
          render();
        } else {
          stopAnimation();
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);

    // Tab visibility handling (prevents duplicate hands during tab switches & hover previews)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isVisible = false;
        stopAnimation();
        if (!video.paused) {
          video.pause();
        }
      } else {
        isVisible = true;
        if (video.paused && !prefersReducedMotion) {
          video.play().catch(() => {});
        }
        startAnimation();
        lastRenderedTime = -1;
        render();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", startAnimation);
      video.removeEventListener("play", startAnimation);
      video.removeEventListener("seeked", handleSeeked);

      const destroyLayer = (layer: LayerContext) => {
        const { gl, program, vs, fs, posBuffer, texture } = layer;
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(posBuffer);
        gl.deleteTexture(texture);
      };

      destroyLayer(robotLayer);
      destroyLayer(humanLayer);
    };
  }, [video]);

  return (
    <div className="relative">
      {/* Layer 1: Left Robot Hand (Behind FULL-STACK, z-10) */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-[100px] -mb-4 aspect-video w-screen select-none overflow-hidden sm:-mt-[13vw] sm:-mb-[15.5vw] z-10"
      >
        <canvas
          ref={robotCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block h-full w-full select-none"
        />
      </div>

      {/* Layer 2: Main Typography & Action Content (z-20) */}
      <div className="relative z-20">
        {children}
      </div>

      {/* Layer 3: Right Human Hand (Above AI DEVELOPER, z-30) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-video w-screen select-none overflow-hidden z-30"
      >
        <canvas
          ref={humanCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block h-full w-full select-none"
        />
      </div>
    </div>
  );
}
