'use client';
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points } from "three";

interface Particle {
  position: [number, number, number];
  speed: number;
}

interface ParticlesProps {
  count?: number;
}

const Particles: React.FC<ParticlesProps> = ({ count = 200 }) => {
  // Properly type the mesh reference as THREE.Points or null
  const mesh = useRef<Points | null>(null);

  // UseMemo to generate particles with proper typing
  const particles = useMemo<Particle[]>(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          Math.random() * 10 + 5, // higher starting point
          (Math.random() - 0.5) * 10,
        ],
        speed: 0.005 + Math.random() * 0.001,
      });
    }
    return temp;
  }, [count]);

  // UseFrame to update particle positions
  useFrame(() => {
    if (!mesh.current) return; // Ensure mesh is not null
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      let y = positions[i * 3 + 1];
      y -= particles[i].speed;
      if (y < -2) y = Math.random() * 10 + 5;
      positions[i * 3 + 1] = y;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  // Create positions array for particles
  const positions = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      posArray[i * 3] = p.position[0];
      posArray[i * 3 + 1] = p.position[1];
      posArray[i * 3 + 2] = p.position[2];
    });
    return posArray;
  }, [particles, count]);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 0]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.05}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  );
};

export default Particles;