import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';

export default function SaturnRings({ rotationSpeed = 0.002 }) {
  const ringRef = useRef();

  // Define ring specifications
  const ringSpecs = [
    { inner: 0.6, width: 0.08, density: 0.3, color: '#999999', size: 0.012, opacity: 0.3 },
    { inner: 0.7, width: 0.1,  density: 0.5, color: '#bbbbbb', size: 0.016, opacity: 0.4 },
    { inner: 0.82, width: 0.15, density: 1.0, color: '#ffffff', size: 0.03,  opacity: 0.9 },
    { inner: 1.0, width: 0.12, density: 0.8, color: '#eeeeee', size: 0.025, opacity: 0.8 },
    { inner: 1.15, width: 0.05, density: 0.4, color: '#ccf2ff', size: 0.015, opacity: 0.5 },
    { inner: 1.22, width: 0.06, density: 0.2, color: '#cceeff', size: 0.01,  opacity: 0.4 },
    { inner: 1.3, width: 0.07, density: 0.1, color: '#ccddee', size: 0.008, opacity: 0.3 },
  ];

  const ringInstances = useMemo(() => {
    const totalParticles = 8000;
    const allRocks = [];

    ringSpecs.forEach((spec, ringIndex) => {
      const count = Math.floor(totalParticles * spec.density);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = THREE.MathUtils.lerp(spec.inner, spec.inner + spec.width, Math.random());
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (Math.random() - 0.5) * 0.015;

        const scale = spec.size + Math.random() * spec.size;
        const rotation = [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ];

        allRocks.push({
          position: [x, y, z],
          scale,
          rotation,
          color: spec.color,
          opacity: spec.opacity,
        });
      }
    });

    return allRocks;
  }, []);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={ringRef}>
      {ringSpecs.map((spec, i) => {
        const rocks = ringInstances.filter((_, index) => {
          // split by density proportions
          const start = Math.floor(8000 * ringSpecs.slice(0, i).reduce((sum, s) => sum + s.density, 0));
          const end = Math.floor(8000 * ringSpecs.slice(0, i + 1).reduce((sum, s) => sum + s.density, 0));
          return index >= start && index < end;
        });

        return (
          <Instances
            key={i}
            limit={rocks.length}
            geometry={new THREE.SphereGeometry(0.2, 1, 1)}
          >
            <meshStandardMaterial
              color={spec.color}
              roughness={1}
              metalness={0.3}
              emissive={spec.color}
              emissiveIntensity={0.4}
              transparent
              opacity={spec.opacity}
              depthWrite={false}
            />
            {rocks.map((rock, index) => (
              <Instance
                key={index}
                position={rock.position}
                scale={rock.scale}
                rotation={rock.rotation}
              />
            ))}
          </Instances>
        );
      })}
    </group>
  );
}
