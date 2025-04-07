
import React, { useRef } from 'react';
import { vertexShader } from '../shaders/basicVertex';
import { fragmentShader } from '../shaders/subtleBackgroundFragment';
import { useThreeRenderer } from '../hooks/useThreeRenderer';
import { setupShaderScene } from '../utils/threeSceneSetup';

const ShaderBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosition = useRef<[number, number]>([0, 0]);

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = [event.clientX, event.clientY];
  };

  // Setup the Three.js scene
  const setupScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error('Canvas ref is not available');
    }

    return setupShaderScene(canvas, vertexShader, fragmentShader);
  };

  // Animation function
  const animate = ({ uniforms, clock }) => {
    uniforms.time.value = clock.getElapsedTime() % 1000;
    uniforms.mouse.value = mousePosition.current;
  };

  // Handle window resize
  const handleResize = (renderer, uniforms) => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.resolution.value = [window.innerWidth, window.innerHeight];
  };

  // Initialize the Three.js renderer
  useThreeRenderer({
    canvasRef,
    setupScene,
    animate,
    onMouseMove: handleMouseMove,
    onResize: handleResize
  });

  return <canvas ref={canvasRef} className="fixed top-0 left-0 -z-10 w-full h-full pointer-events-none" />;
};

export default ShaderBackground;
