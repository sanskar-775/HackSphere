// Earth.js (Updated for JavaScript Only, No glslify)
import { useEffect, useRef } from "react";
import * as THREE from "three";

import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import atmosphereVertexShader from "@/shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "@/shaders/atmosphereFragment.glsl";


export default function Earth() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    camera.position.z = 15;

    renderer.setSize(450, 400);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    const earthTexture = loader.load("/globe.jpg");

    // Earth Shader Material
    const earthMaterial = new THREE.ShaderMaterial({
      uniforms: { globeTexture: { value: earthTexture } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    });

    // Atmosphere Shader Material
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });

    const geometry = new THREE.SphereGeometry(2.75,100,100);
    const earth = new THREE.Mesh(geometry, earthMaterial);
    scene.add(earth);

    const atmosphere = new THREE.Mesh(geometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    camera.position.z = 5;
    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y = clock.getElapsedTime()/8;
      renderer.render(scene, camera);
    }

    animate();
    return () => {
      

      if (canvasRef.current) {  // ✅ Fix: Check before accessing firstChild
        while (canvasRef.current.firstChild) {
          canvasRef.current.removeChild(canvasRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div ref={canvasRef} className="w-full h-full"></div>;
}
