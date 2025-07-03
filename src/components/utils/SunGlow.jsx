import { useLoader } from '@react-three/fiber'
import { SpriteMaterial, Sprite, AdditiveBlending, TextureLoader } from 'three'

export default function SunGlow() {
  const texture = useLoader(TextureLoader, '/2k_sun.jpg') // <- Add this image

  return (
    <sprite scale={[5, 5, 1]}>
      <spriteMaterial
        map={texture}
        color="orange"
        transparent
        blending={AdditiveBlending}
      />
    </sprite>
  )
}
