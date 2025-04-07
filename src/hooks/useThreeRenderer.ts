
import { useRef, useEffect } from 'react';
import type { WebGLRenderer, Scene, Camera, Clock } from 'three';

interface UseThreeRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setupScene: () => {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;
    clock: Clock;
    uniforms: Record<string, any>;
    cleanup: () => void;
  };
  animate: (props: {
    renderer: WebGLRenderer;
    scene: Scene;
    camera: Camera;
    clock: Clock;
    uniforms: Record<string, any>;
  }) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onResize?: (renderer: WebGLRenderer, uniforms: Record<string, any>) => void;
}

/**
 * Custom hook to handle Three.js rendering setup and animation loop
 */
export const useThreeRenderer = ({
  canvasRef,
  setupScene,
  animate,
  onMouseMove,
  onResize
}: UseThreeRendererProps) => {
  const animationFrameId = useRef<number | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<Camera | null>(null);
  const clockRef = useRef<Clock | null>(null);
  const uniformsRef = useRef<Record<string, any> | null>(null);
  
  useEffect(() => {
    if (onMouseMove) {
      window.addEventListener('mousemove', onMouseMove);
    }
    
    import('three').then(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const { renderer, scene, camera, clock, uniforms, cleanup } = setupScene();
      
      rendererRef.current = renderer;
      sceneRef.current = scene;
      cameraRef.current = camera;
      clockRef.current = clock;
      uniformsRef.current = uniforms;

      const handleAnimation = () => {
        if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !clockRef.current || !uniformsRef.current) return;
        
        animate({
          renderer: rendererRef.current,
          scene: sceneRef.current,
          camera: cameraRef.current,
          clock: clockRef.current,
          uniforms: uniformsRef.current
        });
        
        animationFrameId.current = requestAnimationFrame(handleAnimation);
      };

      handleAnimation();

      const handleResize = () => {
        if (!rendererRef.current || !uniformsRef.current) return;
        if (onResize) {
          onResize(rendererRef.current, uniformsRef.current);
        }
      };

      if (onResize) {
        window.addEventListener('resize', handleResize);
      }

      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        
        if (onResize) {
          window.removeEventListener('resize', handleResize);
        }
        
        if (onMouseMove) {
          window.removeEventListener('mousemove', onMouseMove);
        }
        
        cleanup();
      };
    });

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (onMouseMove) {
        window.removeEventListener('mousemove', onMouseMove);
      }
    };
  }, [canvasRef, setupScene, animate, onMouseMove, onResize]);
};
