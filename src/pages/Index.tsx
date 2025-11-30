import { useEffect, useState } from "react";
import { Suspense } from "react";
import { Scene } from "@/components/canvas/Scene"; // Fondo Estrellas
import { HeroScene } from "@/components/canvas/HeroScene"; // Nebulosa
import { AstronautHUD } from "@/components/ui/astronauta-hud"; // Tu nuevo casco
import { DecryptedText } from "@/components/ui/decrypted-text";
import { AnimatePresence, motion } from "framer-motion";

const Index = () => {

  const [showPilot, setShowPilot] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowPilot(true), 500);
    const t2 = setTimeout(() => setShowWelcome(true), 2000);
    const t3 = setTimeout(() => setShowWelcome(false), 7000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background cursor-grab active:cursor-grabbing">

      <Suspense fallback={null}>
        <Scene />
      </Suspense>

      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <AstronautHUD />

      <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center z-0 pointer-events-none opacity-80">

        <div className="flex flex-col items-center min-h-[20px]">
          {showPilot && (
            <DecryptedText
              text="PILOT DETECTED"
              className="text-cyan-400 text-xs tracking-[0.5em] mt-2 font-mono"
              animateOnHover
            />
          )}
        </div>

        <div className="flex flex-col items-center min-h-[20px]">
          <AnimatePresence>
            {showWelcome && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, filter: "blur(5px)", transition: { duration: 1 } }}
              >
                <DecryptedText
                  text="Welcome back"
                  className="text-white text-sm tracking-[0.3em] mt-2 font-mono font-bold "
                  animateOnHover
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

export default Index;