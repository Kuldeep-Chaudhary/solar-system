import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import HomeScene from '../scenes/HomeScene';
import { useRef } from 'react';

const Explore3D = () => {
  const controlsRef = useRef();
  return (
    <div className="w-full h-screen relative bg-black">
      <Canvas camera={{ position: [0, -320, 0], fov: 60 }}  style={{ background: 'black' }}>
        <ambientLight intensity={0.5} />
        {/* <directionalLight position={[5, 5, 5]} /> */}
        <HomeScene controlsRef={controlsRef} />
        <OrbitControls ref={controlsRef}/>
      </Canvas>
    </div>
  );
};

export default Explore3D;
