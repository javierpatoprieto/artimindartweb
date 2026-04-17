'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleHoverTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.classList.contains('hover-target') ||
          target.closest('.hover-target'))) {
        setIsActive(true);
        cursor.classList.add('active');
      }
    };

    const handleLeaveTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.classList.contains('hover-target') ||
          target.closest('.hover-target'))) {
        setIsActive(false);
        cursor.classList.remove('active');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleHoverTarget);
    document.addEventListener('mouseleave', handleLeaveTarget);

    // Hover targets
    const hoverTargets = document.querySelectorAll('.hover-target');
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
      });
      target.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleHoverTarget);
      document.removeEventListener('mouseleave', handleLeaveTarget);
    };
  }, []);

  return null;
}
