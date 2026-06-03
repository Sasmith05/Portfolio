import React, { useEffect, useRef } from 'react';

export const CSBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle representation
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      text: string;
      baseOpacity: number;
      pulseOffset: number;
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 48;
    const symbols = ['0', '1', '< />', '{ }', '[ ]', '++', '&&', '||', ';', 'fn', '=>', 'const', 'let', 'JSON'];

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25, // slow drift
        vy: -Math.random() * 0.35 - 0.15, // slow drift upwards
        size: Math.random() * 25 + 18,    // font size between 18px and 43px (increased size)
        text: symbols[Math.floor(Math.random() * symbols.length)],
        baseOpacity: Math.random() * 0.05 + 0.03, // opacity between 3% and 8%
        pulseOffset: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        // Wrap around screen boundaries
        if (p.y < -40) {
          p.y = height + 40;
          p.x = Math.random() * width;
        }
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;

        // Pulse the opacity of individual symbols gently
        const currentOpacity = p.baseOpacity * (0.7 + Math.sin(time + p.pulseOffset) * 0.3);

        // Draw binary character or code symbol
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font = `bold ${p.size}px Outfit, sans-serif`;
        ctx.fillStyle = `rgba(12, 12, 12, ${currentOpacity})`;
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      });

      // Draw faint connections representing network lines, pulsing gently
      const lineOpacityPulse = 0.015 * (0.6 + Math.sin(time * 1.5) * 0.4);
      ctx.strokeStyle = `rgba(12, 12, 12, ${lineOpacityPulse})`;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default CSBackgroundAnimation;
