import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

export default function OrbitRing({ radius = 5, segments = 128, color = 'white' }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    return pts
  }, [radius, segments])

  return <Line points={points} color={color} lineWidth={0.1} />
}
