/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from "react";
import { globalAudio } from "./AudioEngine";

interface VisualizerProps {
  isPlaying: boolean;
  activeTrackId: string | null;
  className?: string;
}

export const Visualizer: React.FC<VisualizerProps> = ({ isPlaying, activeTrackId, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width;
    let height = canvas.height;
    const css = getComputedStyle(document.documentElement);
    const saffron = css.getPropertyValue("--saffron").trim();
    const hexToRgb = (hex: string) => {
      const value = hex.replace("#", "");
      const normalized = value.length === 3
        ? value.split("").map((char) => char + char).join("")
        : value;
      const numeric = Number.parseInt(normalized, 16);
      return {
        r: (numeric >> 16) & 255,
        g: (numeric >> 8) & 255,
        b: numeric & 255,
      };
    };
    const saffronRgb = hexToRgb(saffron);
    const saffronAlpha = (alpha: number) => `rgb(${saffronRgb.r} ${saffronRgb.g} ${saffronRgb.b} / ${alpha})`;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (canvas) {
          const { width: newWidth, height: newHeight } = entry.contentRect;
          canvas.width = newWidth * window.devicePixelRatio;
          canvas.height = newHeight * window.devicePixelRatio;
          canvas.style.width = `${newWidth}px`;
          canvas.style.height = `${newHeight}px`;
          width = canvas.width;
          height = canvas.height;
          ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    // Set initial size
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
    canvas.style.width = `${canvas.clientWidth}px`;
    canvas.style.height = `${canvas.clientHeight}px`;
    width = canvas.width;
    height = canvas.height;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let phase = 0;

    const draw = () => {
      const analyser = globalAudio.getAnalyser();
      const clientWidth = width / window.devicePixelRatio;
      const clientHeight = height / window.devicePixelRatio;

      ctx.clearRect(0, 0, clientWidth, clientHeight);

      const isReallyPlaying = isPlaying && activeTrackId;

      if (isReallyPlaying && analyser) {
        const bufferLength = analyser.frequencyBinCount;
        if (!dataArrayRef.current || dataArrayRef.current.length !== bufferLength) {
          dataArrayRef.current = new Uint8Array(bufferLength);
        }
        
        analyser.getByteFrequencyData(dataArrayRef.current);

        // Render audio visualizer spectrum
        // We render vertical lines with burnt saffron color
        const barWidth = (clientWidth / bufferLength) * 2.5;
        let x = 0;

        ctx.fillStyle = saffronAlpha(0.08);
        ctx.fillRect(0, 0, clientWidth, clientHeight);

        // Center line
        ctx.beginPath();
        ctx.moveTo(0, clientHeight / 2);
        ctx.lineTo(clientWidth, clientHeight / 2);
        ctx.strokeStyle = saffronAlpha(0.15);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        for (let i = 0; i < bufferLength; i++) {
          const value = dataArrayRef.current[i];
          const percent = value / 255;
          const barHeight = percent * (clientHeight * 0.8);

          const y = clientHeight / 2 - barHeight / 2;

          ctx.fillStyle = saffronAlpha(0.4 + percent * 0.6);
          ctx.fillRect(x, y, barWidth - 1, barHeight);

          x += barWidth;
        }
      } else {
        // Subtle kinetic ambient curves when idle / silent
        // Draws complex weaving overlapping sine waves reflecting the "Heritage Weaving" motif
        phase += 0.015;
        ctx.lineWidth = 1.2;

        const waveCount = 4;
        for (let w = 0; w < waveCount; w++) {
          ctx.beginPath();
          const opacity = 0.08 + (w / waveCount) * 0.15;
          ctx.strokeStyle = saffronAlpha(opacity);

          for (let col = 0; col < clientWidth; col += 4) {
            const relativeX = col / clientWidth;
            
            // Multiple sinusoidal harmonics
            const y1 = Math.sin(relativeX * Math.PI * 2.5 + phase + w * 0.7) * 24;
            const y2 = Math.cos(relativeX * Math.PI * 4.0 - phase * 0.5 + w * 1.2) * 12;
            const totalY = clientHeight / 2 + y1 + y2;

            if (col === 0) {
              ctx.moveTo(col, totalY);
            } else {
              ctx.lineTo(col, totalY);
            }
          }
          ctx.stroke();
        }

        // Add modular grid dots
        ctx.fillStyle = saffronAlpha(0.06);
        const dotGap = 20;
        for (let gx = 10; gx < clientWidth; gx += dotGap) {
          for (let gy = 10; gy < clientHeight; gy += dotGap) {
            ctx.fillRect(gx, gy, 1, 1);
          }
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [isPlaying, activeTrackId]);

  return (
    <div id="visualizer-container" className={`w-full h-full relative overflow-hidden ${className ? className : "bg-bg-app border border-saffron/15"}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
};
