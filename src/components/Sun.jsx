import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

export default function Sun({ onClick }) {
  const texture = useLoader(TextureLoader, '/2k_sun.jpg') // Use a glowing-ish texture
  const sunRef = useRef()

  useFrame(() => {
    sunRef.current.rotation.y += 0.015
  })

  return (
    <group>
      <mesh ref={sunRef} onClick={onClick}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={'#ff9900'}
          emissiveMap={texture}
          emissiveIntensity={2.5}
          roughness={0.4}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Optional: Add soft light coming from sun */}
      <pointLight
        position={[0, 0, 0]}
        intensity={1.5}
        distance={100}
        decay={2}
        color={'#ffaa33'}
      />
    </group>
  )
}
