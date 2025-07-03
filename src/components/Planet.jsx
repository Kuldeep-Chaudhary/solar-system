import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import JupiterRing from './utils/JupiterRing';

export default function Planet({
  radius = 6,
  speed = 0.01, // orbital speed
  color = 'skyblue',
  size = 0.5,
  initialAngle = 0,
  textureUrl = null,
  onClick,
  hasRing = false,
  selfRotationSpeed = 0.02, // <-- NEW: planet spin speed
  ringRotationSpeed = 0.005, // <-- optional: ring speed
}) {
  const planetRef = useRef();
  const meshRef = useRef(); // for axial rotation
  const angleRef = useRef(THREE.MathUtils.degToRad(initialAngle));

  const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) : null;

  useFrame(() => {
    // Orbit around the Sun
    angleRef.current += speed;
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    planetRef.current.position.set(x, 0, z);

    // Axial rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += selfRotationSpeed;
    }
  });

  return (
    <group ref={planetRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(planetRef); // Pass ref to camera system
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={texture ? undefined : color}
          map={texture || null}
        />
      </mesh>

      {hasRing && (
        <JupiterRing rotationSpeed={ringRotationSpeed} />
      )}
    </group>
  );
}
