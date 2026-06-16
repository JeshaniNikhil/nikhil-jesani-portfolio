"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Floating neural nodes ──────────────────────────────────────────────
function FloatingNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 60;

  const data = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 10,
      ),
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      scale: 0.04 + Math.random() * 0.08,
      isHub: i < 8, // larger central hubs
    }));
  }, []);

  const posArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    data.forEach((d, i) => {
      arr[i * 3] = d.pos.x;
      arr[i * 3 + 1] = d.pos.y;
      arr[i * 3 + 2] = d.pos.z;
    });
    return arr;
  }, [data]);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(posArray.slice(), 3));
    return g;
  }, [posArray]);

  const lineGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const pa = geo.attributes.position.array as Float32Array;
    const mx = mousePos.current.x * 4;
    const my = mousePos.current.y * 3;

    // Animate positions
    data.forEach((d, i) => {
      const ox = d.pos.x + Math.sin(t * d.speed + d.phase) * 0.8;
      const oy = d.pos.y + Math.cos(t * d.speed * 0.7 + d.phase) * 0.5;
      const oz = d.pos.z + Math.sin(t * 0.3 + d.phase) * 0.3;

      // Mouse repulsion
      const dx = mx - ox;
      const dy = my - oy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulse = dist < 2.5 ? (1 - dist / 2.5) * 0.4 : 0;

      pa[i * 3] = ox - dx * repulse;
      pa[i * 3 + 1] = oy - dy * repulse;
      pa[i * 3 + 2] = oz;
    });
    geo.attributes.position.needsUpdate = true;

    // Build connection lines
    const maxDist = 3.5;
    const lines: number[] = [];
    const colors: number[] = [];

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const ax = pa[i * 3], ay = pa[i * 3 + 1], az = pa[i * 3 + 2];
        const bx = pa[j * 3], by = pa[j * 3 + 1], bz = pa[j * 3 + 2];
        const d = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
        if (d < maxDist) {
          const a = (1 - d / maxDist) * (data[i].isHub || data[j].isHub ? 1.5 : 1);
          lines.push(ax, ay, az, bx, by, bz);
          // cyan-to-purple gradient based on y
          const t2 = (ay + 6) / 12;
          colors.push(0, 0.94 * a, a,  0.66 * a, 0.33 * a, 0.97 * a);
        }
      }
    }

    const lp = new Float32Array(lines);
    const lc = new Float32Array(colors);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(lp, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lc, 3));
    lineGeo.setDrawRange(0, lines.length / 3);
    lineGeo.attributes.position.needsUpdate = true;
    lineGeo.attributes.color?.needsUpdate && (lineGeo.attributes.color.needsUpdate = true);
  });

  return (
    <group ref={groupRef}>
      {/* Particle dots */}
      <points geometry={geo}>
        <pointsMaterial
          size={0.09}
          color="#00f5ff"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Connection lines */}
      <lineSegments geometry={lineGeo} material={lineMat} />
    </group>
  );
}

// ── Orbiting rings ─────────────────────────────────────────────────────
function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (r1.current) { r1.current.rotation.z = t * 0.12; r1.current.rotation.x = Math.PI / 4; }
    if (r2.current) { r2.current.rotation.z = -t * 0.08; r2.current.rotation.y = t * 0.05; r2.current.rotation.x = Math.PI / 3; }
    if (r3.current) { r3.current.rotation.y = t * 0.1; r3.current.rotation.z = Math.PI / 6; }
  });

  const ringMat = (color: string, opacity: number) => (
    <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} />
  );

  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[4.5, 0.012, 8, 128]} />
        {ringMat("#00f5ff", 0.15)}
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[6.5, 0.008, 8, 128]} />
        {ringMat("#a855f7", 0.1)}
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[8.5, 0.006, 8, 128]} />
        {ringMat("#ec4899", 0.07)}
      </mesh>
    </>
  );
}

// ── Central glowing orb ────────────────────────────────────────────────
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.05);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 0.8 + Math.sin(t * 2) * 0.3;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} color="#00f5ff" intensity={0.8} distance={12} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.3} />
      </mesh>
      {/* Inner bright core */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
      </mesh>
    </>
  );
}

// ── Camera parallax on mouse ───────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 1.2 - target.current.x) * 0.04;
    target.current.y += (-mouse.current.y * 0.8 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function NeuralNetworkBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraRig />
        <FloatingNodes />
        <OrbitalRings />
        <CentralOrb />
      </Canvas>

      {/* Vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/70 via-transparent to-[#030014]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030014]/60 via-transparent to-[#030014]/60 pointer-events-none" />
    </div>
  );
}
