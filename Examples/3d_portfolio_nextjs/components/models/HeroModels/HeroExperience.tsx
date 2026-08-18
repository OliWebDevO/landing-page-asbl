'use client'

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import { OrbitControls, Preload } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Room } from "./Room"
import HeroLights from "./HeroLights"
import Particles from "./Particles"

const HeroExperience = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    let lastWidth = window.innerWidth
    setIsMobile(lastWidth <= 768)

    const checkMobile = () => {
      const newWidth = window.innerWidth
      if (newWidth === lastWidth) return
      lastWidth = newWidth
      setIsMobile(newWidth <= 768)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Don't render anything on server or before client check
  if (!isClient) {
    return <div style={{ width: "100%", height: "100%", minHeight: "50svh" }} />
  }

  /* Mobile fallback image — commented out, uncomment to restore
  if (isMobile) {
    return (
      <Image
        src="/images/hero-mobile.webp"
        alt="Room Model"
        width={800}
        height={600}
        quality={80}
        sizes="100vw"
        loading="lazy"
        style={{ width: "100%", height: "auto", marginTop: "15rem" }}
      />
    )
  }
  */
  if (isMobile) {
    return null
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0)
      }}
    >
      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={7} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          maxDistance={20}
          minDistance={5}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />
        <group
          scale={1}
          position={[0, -3.5, 0]}
          rotation={[0, -Math.PI / 4, 0]}
        >
          <Room />
        </group>
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default HeroExperience