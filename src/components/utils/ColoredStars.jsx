import React, { useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function ColoredStars({
  count = 5000,
  color = '#00008b',
  size = 0.5,
  spread = 300,
}) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * spread
    }
    return arr
  }, [count, spread])

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial 
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}
