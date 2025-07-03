import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei'; // You need this for 3D text
import JupiterRing from './utils/JupiterRing';

export default function Planet({
  radius = 6,
  speed = 0.01,
  color = 'skyblue',
  size = 0.5,
  initialAngle = 0,
  textureUrl = null,
  onClick,
  hasRing = false,
  selfRotationSpeed = 0.02,
  ringRotationSpeed = 0.005,
  label = null, // <-- NEW: label for planets like "Earth" or "Mars"
}) {
  const planetRef = useRef();
  const meshRef = useRef();
  const angleRef = useRef(THREE.MathUtils.degToRad(initialAngle));
  const [showLabel , setShowLabel] = useState(false);

  const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) : null;

  useFrame(() => {
    angleRef.current += speed;
    const x = Math.cos(angleRef.current) * radius;
    const z = Math.sin(angleRef.current) * radius;
    planetRef.current.position.set(x, 0, z);

    if (meshRef.current) {
      meshRef.current.rotation.y += selfRotationSpeed;
    }
  });

  return (
    <group ref={planetRef} rotation={hasRing ? [THREE.MathUtils.degToRad(45), 0, 0] : [0, 0, 0]}>
      {/* Planet Mesh */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick(planetRef);
          setShowLabel(true)
        }}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={texture ? undefined : color}
          map={texture || null}
        />
      </mesh>

      {/* Optional Ring */}
      {hasRing && <JupiterRing rotationSpeed={ringRotationSpeed} />}

      {/* Laser Signboard for specific planets */}
      {label && showLabel && (
        <>
          {/* Laser Line */}
          <mesh position={[0, size + 0.2, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 1, 8]} />
            <meshStandardMaterial color="#00008b" emissive="#00008b" />
          </mesh>

          {/* Glowing Label Board */}
          <mesh position={[0, size + 0.7, 0]}>
            <planeGeometry args={[0.6, 0.3]} />
            <meshStandardMaterial color="black" emissive="red" />
            <Text position={[0, 0, 0.01]} fontSize={0.1} color="white">
              {label}
            </Text>
          </mesh>
        </>
      )}
    </group>
  );
}
