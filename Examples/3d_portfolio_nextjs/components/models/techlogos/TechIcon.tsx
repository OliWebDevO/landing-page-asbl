'use client'
import { Environment, Float, OrbitControls, useGLTF, Preload } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState, Suspense } from "react"
import { Mesh, MeshStandardMaterial } from "three"

const Model = ({ model }: ModelType) => {
  const scene = useGLTF(model.modelPath)

  useEffect(() => {
    // Dispatch event when model loads for ScrollTrigger refresh
    window.dispatchEvent(new Event('model-loaded'));

    if (model.name === 'Interactive Developer') {
      scene.scene.traverse((child) => {
        if (
          child instanceof Mesh &&
          child.name === 'Object_5'
        ) {
          child.material = new MeshStandardMaterial({
            color: 'white',
          })
        }
      })
    }
  }, [scene, model.name])

  return (
    <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
      <group>
        <primitive
          object={scene.scene}
          scale={model.scale}
          rotation={model.rotation}
          position={[0, 0, 0]}
        />
      </group>
    </Float>
  )
}

const TechIcon = ({ model }: ModelType) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div style={{ width: '100%', height: '100%', minHeight: '200px' }} />
  }

  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0)
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <OrbitControls enableZoom={false} />
        <Environment preset="city" />
        <Model model={model} />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default TechIcon