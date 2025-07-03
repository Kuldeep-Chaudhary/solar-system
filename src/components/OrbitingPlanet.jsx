import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Text } from '@react-three/drei';
import Planet from './Planet';

const OrbitingPlanet = ({ label, radius, speed, angleOffset = 0, color, onClick }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed + angleOffset;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    ref.current.position.set(x, 0, z);
  });

  return (
    <group ref={ref} onClick={onClick} style={{ cursor: 'pointer' }}>
      <Planet size={1} color={color} />
      <Text position={[0, 1.5, 0]} fontSize={0.4}>{label}</Text>
    </group>
  );
};

export default OrbitingPlanet;
