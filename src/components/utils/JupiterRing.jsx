import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';

export default function JupiterRing({rotationSpeed}) {
  const ringRef = useRef();

  const rocks = useMemo(() => {
    const count = 500;
    const innerRadius = 0.8;
    const outerRadius = 1.4;
    const positions = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = THREE.MathUtils.lerp(innerRadius, outerRadius, Math.random());
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.05;

      const scale = 0.02 + Math.random() * 0.04;
      const rotation = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ];

      positions.push({ position: [x, y, z], scale, rotation });
    }

    return positions;
  }, []);

  // 🌪️ Rotate the ring around its Y-axis
  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={ringRef} rotation={[0, 0, 0]}>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
        >
          <sphereGeometry args={[0.2, 1, 1]} />
          <meshStandardMaterial
          color="gray"
            roughness={1}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
