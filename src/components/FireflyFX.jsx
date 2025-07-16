import { useEffect, useRef } from "react";

function FireflyFX({ count = 10 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing fireflies
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      dot.className = "firefly";
      
      // Set random starting positions
      const randomX = Math.random();
      const randomY = Math.random();
      dot.style.setProperty('--random-x', randomX);
      dot.style.setProperty('--random-y', randomY);
      
      // Add random delay for staggered animation
      dot.style.animationDelay = `${Math.random() * 10}s`;
      
      container.appendChild(dot);
    }
  }, [count]);

  return <div ref={containerRef} className="firefly-container pointer-events-none absolute inset-0 z-0" />;
}

export default FireflyFX; 