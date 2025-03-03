// Earth.js (Updated for JavaScript Only, No glslify)
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import atmosphereVertexShader from "@/shaders/atmosphereVertex.glsl";
import atmosphereFragmentShader from "@/shaders/atmosphereFragment.glsl";
import { Float32BufferAttribute } from "three";

export default function Earth() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    camera.position.z = 15;

    renderer.setSize(canvasWidth, canvasHeight);
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
    

    const atmosphere = new THREE.Mesh(geometry, atmosphereMaterial);
    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    camera.position.z = 5;

    const group = new THREE.Group();
    group.add(earth);
    scene.add(group);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 3, 
    sizeAttenuation: true,
  });
    const starVertices = [];
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 2000;
    starVertices.push(x, y, z);
  }
starGeometry.setAttribute(
  "position",
  new Float32BufferAttribute(starVertices, 3)
);

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

    const clock = new THREE.Clock();
    const mouse = { x: undefined, y: undefined };
    function animate() {
      requestAnimationFrame(animate);
      earth.rotation.y = clock.getElapsedTime()/8;
      gsap.to(group.rotation, {
        x: mouse.y ? -mouse.y * 0.3 : 0,
        y: mouse.x ? mouse.x * 0.5 : 0,
        duration: 2,
      });
      renderer.render(scene, camera);
    }

    animate();

    // ✅ Mouse move event listener
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);

      if (canvasRef.current) {  // ✅ Fix: Check before accessing firstChild
        while (canvasRef.current.firstChild) {
          canvasRef.current.removeChild(canvasRef.current.firstChild);
        }
      }
    };
  }, []);

  return <div ref={canvasRef} className="w-full h-full"></div>;
}
