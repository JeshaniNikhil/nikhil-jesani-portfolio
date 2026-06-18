"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── DNA Double Helix Particle Stream ─────────────────────────────────────
function DNAHelix() {
  const groupRef = useRef<THREE.Points>(null);
  const STRANDS = 2;
  const PER_STRAND = 120;
  const TOTAL = STRANDS * PER_STRAND;

  const { positions, colors, phases } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);
    const phases = new Float32Array(TOTAL);

    for (let s = 0; s < STRANDS; s++) {
      const strandOffset = (s / STRANDS) * Math.PI * 2;
      for (let i = 0; i < PER_STRAND; i++) {
        const idx = (s * PER_STRAND + i) * 3;
        const t = (i / PER_STRAND) * Math.PI * 6; // 3 full twists
        const y = (i / PER_STRAND) * 16 - 8;
        const r = 1.8;

        positions[idx]     = Math.cos(t + strandOffset) * r;
        positions[idx + 1] = y;
        positions[idx + 2] = Math.sin(t + strandOffset) * r - 2;

        phases[s * PER_STRAND + i] = t;

        // Cyan → Purple color gradient along helix
        const ratio = i / PER_STRAND;
        if (s === 0) {
          colors[idx]     = 0.0;
          colors[idx + 1] = 0.96 - ratio * 0.4;
          colors[idx + 2] = 1.0;
        } else {
          colors[idx]     = 0.66 + ratio * 0.2;
          colors[idx + 1] = 0.33;
          colors[idx + 2] = 0.97;
        }
      }
    }
    return { positions, colors, phases };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  // Cross-strand connection lines
  const connGeo = useMemo(() => new THREE.BufferGeometry(), []);
  const connMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.45;
    const pa = geo.attributes.position.array as Float32Array;

    // Animate helix flowing upward
    for (let s = 0; s < STRANDS; s++) {
      const strandOffset = (s / STRANDS) * Math.PI * 2;
      for (let i = 0; i < PER_STRAND; i++) {
        const idx = (s * PER_STRAND + i) * 3;
        const angle = phases[s * PER_STRAND + i] + t;
        const y = ((i / PER_STRAND + (t * 0.06) % 1.0)) * 16 - 8;
        const r = 1.8 + Math.sin(angle * 2 + t) * 0.12;

        pa[idx]     = Math.cos(angle + strandOffset) * r;
        pa[idx + 1] = y;
        pa[idx + 2] = Math.sin(angle + strandOffset) * r - 2;
      }
    }
    geo.attributes.position.needsUpdate = true;

    // Build rung connections every ~6 particles
    const rungs: number[] = [];
    const rungColors: number[] = [];
    for (let i = 0; i < PER_STRAND; i += 6) {
      const a = i * 3;
      const b = (PER_STRAND + i) * 3;
      rungs.push(pa[a], pa[a + 1], pa[a + 2], pa[b], pa[b + 1], pa[b + 2]);
      const glow = 0.5 + Math.sin(t * 3 + i * 0.3) * 0.5;
      rungColors.push(0, glow, 1, 0.66, 0.33, glow);
    }
    connGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(rungs), 3));
    connGeo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(rungColors), 3));
    connGeo.setDrawRange(0, rungs.length / 3);
    if (connGeo.attributes.position) connGeo.attributes.position.needsUpdate = true;
    if (connGeo.attributes.color) connGeo.attributes.color.needsUpdate = true;
  });

  return (
    <group position={[-3.5, 0, 0]} rotation={[0, 0.3, 0.08]}>
      <points ref={groupRef} geometry={geo}>
        <pointsMaterial
          vertexColors
          size={0.07}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments geometry={connGeo} material={connMat} />
    </group>
  );
}

// ── Galaxy Particle Wave Field ────────────────────────────────────────────
function ParticleField() {
  const COUNT = 280;
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  const { geo, origins, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const origins = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    const phases = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      // Distribute in a wide field with clustering
      const ring = Math.random();
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + ring * 9;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6 - 1;

      positions[i * 3]     = origins[i * 3]     = x;
      positions[i * 3 + 1] = origins[i * 3 + 1] = y;
      positions[i * 3 + 2] = origins[i * 3 + 2] = z;

      speeds[i] = 0.15 + Math.random() * 0.6;
      phases[i] = Math.random() * Math.PI * 2;

      // Color: 40% cyan, 40% purple, 20% pink
      const r = Math.random();
      if (r < 0.4) {
        colors[i * 3] = 0.0; colors[i * 3 + 1] = 0.96; colors[i * 3 + 2] = 1.0;
      } else if (r < 0.8) {
        colors[i * 3] = 0.66; colors[i * 3 + 1] = 0.33; colors[i * 3 + 2] = 0.97;
      } else {
        colors[i * 3] = 0.93; colors[i * 3 + 1] = 0.28; colors[i * 3 + 2] = 0.6;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geo, origins, speeds, phases };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pa = geo.attributes.position.array as Float32Array;
    const mx = mouse.current.x * 5;
    const my = mouse.current.y * 3.5;

    for (let i = 0; i < COUNT; i++) {
      const ox = origins[i * 3];
      const oy = origins[i * 3 + 1];
      const oz = origins[i * 3 + 2];

      // Wave distortion
      const wx = Math.sin(t * speeds[i] + phases[i]) * 0.6;
      const wy = Math.cos(t * speeds[i] * 0.7 + phases[i] + ox * 0.2) * 0.5;

      // Mouse attraction (gentle pull toward cursor)
      const dx = mx - (ox + wx);
      const dy = my - (oy + wy);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = dist < 3 ? (1 - dist / 3) * 0.25 : 0;

      pa[i * 3]     = ox + wx + dx * pull;
      pa[i * 3 + 1] = oy + wy + dy * pull;
      pa[i * 3 + 2] = oz + Math.sin(t * 0.3 + phases[i]) * 0.2;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points geometry={geo}>
      <pointsMaterial
        vertexColors
        size={0.055}
        transparent
        opacity={0.75}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Flowing Energy Lines (data streams) ──────────────────────────────────
function DataStreams() {
  const STREAMS = 8;
  const PTS = 40;

  const streamData = useMemo(() => {
    return Array.from({ length: STREAMS }, (_, s) => {
      const startX = (Math.random() - 0.5) * 16;
      const startY = (Math.random() - 0.5) * 10;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      const color = s % 3 === 0
        ? new THREE.Color(0, 0.96, 1)
        : s % 3 === 1
        ? new THREE.Color(0.66, 0.33, 0.97)
        : new THREE.Color(0.93, 0.28, 0.6);
      return { startX, startY, angle, speed, color };
    });
  }, []);

  const geos = useMemo(() =>
    streamData.map(() => new THREE.BufferGeometry()), [streamData]);

  const mats = useMemo(() =>
    streamData.map((s) =>
      new THREE.LineBasicMaterial({
        color: s.color,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    ), [streamData]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    streamData.forEach((s, si) => {
      const pts: number[] = [];
      for (let i = 0; i < PTS; i++) {
        const frac = i / PTS;
        const offset = t * s.speed + si * 1.3;
        const x = s.startX + Math.cos(s.angle + frac * Math.PI * 3 + offset) * (2 + frac * 3);
        const y = s.startY + frac * 8 - 4 + Math.sin(offset * 0.5 + frac * Math.PI * 2) * 0.8;
        const z = Math.sin(frac * Math.PI + offset * 0.3) * 1.5 - 1;
        pts.push(x, y, z);
      }
      geos[si].setAttribute("position", new THREE.BufferAttribute(new Float32Array(pts), 3));
      if (geos[si].attributes.position) geos[si].attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      {geos.map((geo, i) => {
        // @ts-expect-error - React 19 type conflict with SVG line vs Three.js line
        return <line key={i} geometry={geo} material={mats[i]} />;
      })}
    </>
  );
}

// ── Floating Geometric Data Glyphs ────────────────────────────────────────
function DataGlyphs() {
  const GLYPHS = 7;
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  const glyphData = useMemo(() =>
    Array.from({ length: GLYPHS }, (_, i) => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4 - 2,
      ),
      rotSpeed: (Math.random() - 0.5) * 0.8,
      floatPhase: Math.random() * Math.PI * 2,
      scale: 0.12 + Math.random() * 0.22,
      colorIdx: i % 3,
    })), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = glyphData[i];
      mesh.rotation.x = t * d.rotSpeed * 0.7;
      mesh.rotation.y = t * d.rotSpeed;
      mesh.rotation.z = t * d.rotSpeed * 0.4;
      mesh.position.y = d.pos.y + Math.sin(t * 0.4 + d.floatPhase) * 0.5;
    });
  });

  const colors = ["#00f5ff", "#a855f7", "#ec4899"];

  return (
    <>
      {glyphData.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={[d.pos.x, d.pos.y, d.pos.z]}
          scale={d.scale}
        >
          {i % 2 === 0
            ? <icosahedronGeometry args={[1, 0]} />
            : <octahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial
            color={colors[d.colorIdx]}
            transparent
            opacity={0.12}
            wireframe
          />
        </mesh>
      ))}
    </>
  );
}

// ── Central Pulsing Energy Core ───────────────────────────────────────────
function EnergyCore() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const halo  = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.8) * 0.08;
    if (outer.current) {
      outer.current.scale.setScalar(pulse);
      outer.current.rotation.y = t * 0.3;
      outer.current.rotation.z = t * 0.15;
    }
    if (inner.current) {
      inner.current.scale.setScalar(1 + Math.sin(t * 3.2) * 0.15);
    }
    if (halo.current) {
      halo.current.scale.setScalar(1 + Math.sin(t * 0.9 + 1) * 0.04);
      (halo.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 1.5) * 0.025;
    }
  });

  return (
    <group position={[2.5, 0, -1]}>
      {/* Outer wireframe sphere */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.07} wireframe />
      </mesh>
      {/* Inner glowing core */}
      <mesh ref={inner}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.45} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Bright center */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Large halo ring */}
      <mesh ref={halo}>
        <torusGeometry args={[2.2, 0.008, 6, 200]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#00f5ff" intensity={1.2} distance={10} />
    </group>
  );
}

// ── Orbital Halos ─────────────────────────────────────────────────────────
function OrbitalHalos() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  const rings = useMemo(() => [
    { r: 5.5, tube: 0.009, color: "#00f5ff", opacity: 0.11, rx: Math.PI / 4,  rz: 0,            speed:  0.09 },
    { r: 7.5, tube: 0.006, color: "#a855f7", opacity: 0.08, rx: Math.PI / 3,  rz: Math.PI / 5,  speed: -0.06 },
    { r: 10,  tube: 0.004, color: "#ec4899", opacity: 0.05, rx: Math.PI / 5,  rz: -Math.PI / 4, speed:  0.04 },
    { r: 3.8, tube: 0.01,  color: "#a855f7", opacity: 0.09, rx: -Math.PI / 3, rz: Math.PI / 6,  speed: -0.12 },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.z = rings[i].speed * t;
      mesh.rotation.y = t * rings[i].speed * 0.4;
    });
  });

  return (
    <>
      {rings.map((ring, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          rotation={[ring.rx, 0, ring.rz]}
        >
          <torusGeometry args={[ring.r, ring.tube, 6, 180]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

// ── Camera parallax ───────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse  = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", h, { passive: true });
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.8 - target.current.x) * 0.035;
    target.current.y += (-mouse.current.y * 0.5 - target.current.y) * 0.035;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Main Export ───────────────────────────────────────────────────────────
export function NeuralNetworkBg() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraRig />
        <ParticleField />
        <DNAHelix />
        <DataStreams />
        <DataGlyphs />
        <EnergyCore />
        <OrbitalHalos />
      </Canvas>

      {/* Vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/75 via-transparent to-[#030014]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#030014]/65 via-transparent to-[#030014]/55 pointer-events-none" />
      {/* Bottom fade to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent pointer-events-none" />
    </div>
  );
}
