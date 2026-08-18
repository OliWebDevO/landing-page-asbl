import Lottie from "lottie-react";
import preloaderAnimation from "./preloader.json";
export default function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Lottie
        animationData={preloaderAnimation}
        loop
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
}