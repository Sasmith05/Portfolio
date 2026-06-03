import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Check if mouse is within padding range of the element edges
      const isWithinX = mouseX >= rect.left - padding && mouseX <= rect.right + padding;
      const isWithinY = mouseY >= rect.top - padding && mouseY <= rect.bottom + padding;

      if (isWithinX && isWithinY) {
        // Calculate center of element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Position relative to center
        const relX = mouseX - centerX;
        const relY = mouseY - centerY;

        // Apply strength division
        const tx = relX / strength;
        const ty = relY / strength;

        setTransition(activeTransition);
        setTransform(`translate3d(${tx}px, ${ty}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0px, 0px, 0px)");
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={containerRef}
      style={{
        transform,
        transition,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </div>
  );
};
export default Magnet;
