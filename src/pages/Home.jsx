import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, Text } from '@react-three/drei'

const Home = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />
       <Float speed={5} rotationIntensity={5} floatIntensity={5}>
        {/* Name */}
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Kuldeep Chaudhary
        </Text>

        {/* Designation */}
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.3}
          color="lightblue"
          anchorX="center"
          anchorY="middle"
        >
          Frontend Developer
        </Text>
        </Float>
      </Canvas>
    </div>
  )
}

export default Home
