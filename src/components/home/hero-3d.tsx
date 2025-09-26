'use client';

import * as THREE from 'three';
import { useEffect, useRef } from 'react';

const Hero3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // DNA Helix
    const group = new THREE.Group();
    scene.add(group);

    const numStrands = 2;
    const numPoints = 100;
    const radius = 1;
    const height = 4;
    const turns = 3;

    const createStrand = (offset: number) => {
      const points = [];
      for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        const angle = 2 * Math.PI * turns * t + offset;
        const x = radius * Math.cos(angle);
        const y = height * (t - 0.5);
        const z = radius * Math.sin(angle);
        points.push(new THREE.Vector3(x, y, z));
      }
      return new THREE.CatmullRomCurve3(points);
    };

    const strandGeometry = new THREE.TubeGeometry(
      createStrand(0),
      numPoints - 1,
      0.05,
      8,
      false
    );
    const strandMaterial = new THREE.MeshPhongMaterial({ color: '#3CB371' });
    const strand1 = new THREE.Mesh(strandGeometry, strandMaterial);
    group.add(strand1);

    const strand2 = new THREE.Mesh(
      new THREE.TubeGeometry(createStrand(Math.PI), numPoints - 1, 0.05, 8, false),
      strandMaterial
    );
    group.add(strand2);

    // Rungs
    const rungMaterial = new THREE.MeshPhongMaterial({ color: '#BFFF00' });
    const rungGeometry = new THREE.CylinderGeometry(0.03, 0.03, radius * 2, 8);
    
    for (let i = 0; i < numPoints / 5; i++) {
        const t = i / (numPoints / 5 -1);
        const angle = 2 * Math.PI * turns * t;
        const y = height * (t - 0.5);
        const rung = new THREE.Mesh(rungGeometry, rungMaterial);
        rung.position.y = y;
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = -angle;
        group.add(rung);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (mountRef.current) {
        camera.aspect =
          mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
};

export default Hero3D;
