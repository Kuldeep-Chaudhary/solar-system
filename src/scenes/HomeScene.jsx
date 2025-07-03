import { Stars } from '@react-three/drei';
import Sun from '../components/Sun';
import { useState, useRef } from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useThree, useFrame } from '@react-three/fiber';
import OrbitRing from '../components/OrbitRing';
import Planet from '../components/Planet';
import * as THREE from 'three';
import ColoredStars from '../components/utils/ColoredStars';

export default function HomeScene({ controlsRef }) {
  const { camera } = useThree();
  const [targetPlanetRef, setTargetPlanetRef] = useState(null);

  const isResettingRef = useRef(false);
  const resetTargetPos = useRef(new THREE.Vector3(0, 15, 25)); // default cam pos
  const resetTargetLookAt = useRef(new THREE.Vector3(0, 0, 0)); // default lookAt

  useFrame(() => {
    // ✅ Smooth camera reset to Sun
    if (isResettingRef.current && controlsRef.current) {
      camera.position.lerp(resetTargetPos.current, 0.05);
      controlsRef.current.target.lerp(resetTargetLookAt.current, 0.05);
      controlsRef.current.update();

      // ✅ Stop resetting when close enough
      if (
        camera.position.distanceTo(resetTargetPos.current) < 0.1 &&
        controlsRef.current.target.distanceTo(resetTargetLookAt.current) < 0.1
      ) {
        isResettingRef.current = false;
        setTargetPlanetRef(null);
      }

      return; 
    }

    // ✅ Follow selected planet
    if (targetPlanetRef?.current && controlsRef.current) {
      const planetPos = new THREE.Vector3();
      targetPlanetRef.current.getWorldPosition(planetPos);

      // Smoothly move camera and target toward planet
      controlsRef.current.target.lerp(planetPos, 0.1);
      controlsRef.current.update();

      const offset = new THREE.Vector3(0, 1.5,3); // Camera offset from planet
      const desiredCameraPos = planetPos.clone().add(offset);
      camera.position.lerp(desiredCameraPos, 0.05);
    }
  });

  const handlePlanetClick = (planetRef) => {
    setTargetPlanetRef(planetRef);
    isResettingRef.current = false; // cancel any reset
  };

  const resetCameraToDefault = () => {
    isResettingRef.current = true;
    setTargetPlanetRef(null); // this is enough
    if (controlsRef.current) {
      controlsRef.current.target.copy(resetTargetLookAt.current);
      controlsRef.current.update();
    }
  };

  return (
    <>
      <Stars radius={100} depth={50} count={3000} factor={4} />
      <ColoredStars count={3000} />

      <Sun onClick={resetCameraToDefault} />
      <ambientLight intensity={0.9} />

      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          intensity={1.5}
          resolutionScale={0.5}
        />
      </EffectComposer>

      {/* PLANETS */}
      <OrbitRing radius={4} />
      <Planet onClick={handlePlanetClick} radius={4} speed={0.020} size={0.2} initialAngle={0} textureUrl="/2k_mercury.jpg" />

      <OrbitRing radius={5} />
      <Planet onClick={handlePlanetClick} radius={5} speed={0.0146} size={0.25} initialAngle={45} textureUrl="/2k_venus_surface.jpg" />

      <OrbitRing radius={6} />
      <Planet onClick={handlePlanetClick} radius={6} speed={0.0124} size={0.3} initialAngle={90} textureUrl="/2k_earth_daymap.jpg" />

      <OrbitRing radius={7} />
      <Planet onClick={handlePlanetClick} radius={7} speed={0.0101} size={0.28} initialAngle={180} textureUrl="/2k_mars.jpg" />

      <OrbitRing radius={9} />
      <Planet radius={9} speed={0.0055} size={0.6} initialAngle={270}
           textureUrl="/2k_jupiter.jpg" onClick={handlePlanetClick} hasRing={true} selfRotationSpeed={0.03}ringRotationSpeed={0.005} 
      />

       {/* <JupiterRing /> */}
      <OrbitRing radius={11} />
      <Planet onClick={handlePlanetClick} radius={11} speed={0.0040} size={0.5} initialAngle={135} textureUrl="/2k_saturn.jpg" />

      <OrbitRing radius={13} />
      <Planet onClick={handlePlanetClick} radius={13} speed={0.0028} size={0.45} initialAngle={225} textureUrl="/2k_uranus.jpg" />

      <OrbitRing radius={15} />
      <Planet onClick={handlePlanetClick} radius={15} speed={0.0023} size={0.43} initialAngle={315} textureUrl="/2k_neptune.jpg" />
    </>
  );
}
