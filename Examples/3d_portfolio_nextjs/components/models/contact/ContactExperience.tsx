import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { OrbitControls, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Computer from "./Computer";

const ContactExperience = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    let lastWidth = window.innerWidth;
    setIsDesktop(lastWidth >= 768);

    const check = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth) return;
      lastWidth = newWidth;
      setIsDesktop(newWidth >= 768);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Don't render anything on server or before client check
  if (!isClient) {
    return <div style={{ width: "100%", height: "100%" }} />;
  }

  if (!isDesktop) {
    return (
      <Image
        src="/images/contact-mobile.webp"
        alt="Computer Model"
        width={800}
        height={600}
        quality={80}
        sizes="(max-width: 768px) 100vw, 50vw"
        loading="lazy"
        style={{ width: "100%", height: "auto" }}
      />
    );
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 7], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} color="#fff4e6" />
        <directionalLight position={[5, 5, 3]} intensity={2.5} color="#ffd9b3" />
        <directionalLight
          position={[5, 9, 1]}
          castShadow
          intensity={2.5}
          color="#ffd9b3"
        />
        <OrbitControls
          enableZoom={false}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2}
        />
        <group scale={[1, 1, 1]}>
          <mesh
            receiveShadow
            position={[0, -1.5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial color="#a46b2d" />
          </mesh>
        </group>
        <group scale={0.03} position={[0, -1.49, -2]} castShadow>
          <Computer />
        </group>
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ContactExperience;