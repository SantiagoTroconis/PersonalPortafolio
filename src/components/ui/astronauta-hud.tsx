import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Battery, User, MapPin, Globe } from "lucide-react";
import Noise from "./noise";

export const AstronautHUD = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
                <Noise
                    patternSize={300}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={3}
                    patternAlpha={6}
                />
            </div>
            <div className="absolute inset-0 z-50 w-full h-full pointer-events-none overflow-hidden select-none font-mono text-cyan-400/90" style={{ perspective: '1000px' }}>

                <div className="absolute inset-0 rounded-[100px] border-[60px] border-black/90 blur-md z-20 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />
                <div className="absolute inset-0 z-10 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
                <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.4) 100%)' }} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_3px,3px_100%] opacity-20" />

                <div className="absolute top-12 left-16 right-16 flex justify-between items-start z-30" style={{ transformStyle: 'preserve-3d' }}>

                    <motion.div
                        initial={{ opacity: 0, x: -50, rotateY: 90 }}
                        animate={{ opacity: 1, x: 0, rotateY: 15 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 50 }}
                        className="flex flex-col gap-4 max-w-xs origin-left"
                        style={{ transform: 'rotateY(15deg) translateZ(-20px)' }}
                    >
                        <div className="border-l-2 border-cyan-500/50 pl-4 bg-gradient-to-r from-cyan-900/20 to-transparent py-2 backdrop-blur-[2px]">
                            <div className="flex items-center gap-2 mb-1">
                                <User className="w-4 h-4" />
                                <span className="text-xs tracking-[0.2em] font-bold text-white drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">PILOT PROFILE</span>
                            </div>
                            <h2 className="text-lg font-bold text-cyan-300 leading-none drop-shadow-[0_0_8px_rgba(0,255,255,0.5)]">SANTIAGO TROCONIS</h2>
                            <p className="text-xs text-cyan-400/70 mt-1">FULL STACK DEVELOPER</p>
                        </div>

                        <div className="space-y-1 text-[10px] tracking-wider opacity-80">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                                <span>STATUS: OPEN TO WORK</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>LOC: REMOTE / WORLDWIDE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-3 h-3" />
                                <span>LANG: ESP / ENG</span>
                            </div>
                        </div>

                        <div className="mt-12 border-t border-cyan-500/30 pt-12 opacity-60">
                            <div className="text-[9px] font-mono leading-tight text-cyan-300/80">
                                <p>SYS.BIO: NORMAL</p>
                                <p>SUIT.P: 14.7 PSI</p>
                                <p>O2.LVL: 98%</p>
                                <p className="animate-pulse">RAD.WARN: NEGATIVE</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-64 h-8 overflow-hidden opacity-50 pointer-events-none">
                        <div className="w-full h-full border-b border-cyan-500/30 flex justify-between items-end px-2 text-[10px] text-cyan-400">
                            <span>NW</span>
                            <span className="h-2 w-[1px] bg-cyan-500/50"></span>
                            <span>N</span>
                            <span className="h-2 w-[1px] bg-cyan-500/50"></span>
                            <span>NE</span>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -90 }}
                        animate={{ opacity: 1, x: 0, rotateY: -15 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 50 }}
                        className="text-right origin-right"
                        style={{ transform: 'rotateY(-15deg) translateZ(-20px)' }}
                    >
                        <div className="text-xs tracking-[0.2em] mb-1 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">ENV: DEEP SPACE</div>
                        <div className="flex justify-end gap-4 text-xs font-bold opacity-80">
                            <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> ONLINE</span>
                            <span className="flex items-center gap-1"><Battery className="w-3 h-3" /> 94%</span>
                            <span>{time}</span>
                        </div>

                        <div className="mt-8 flex justify-end opacity-70">
                            <div className="relative w-36 h-36 border border-cyan-500/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className="absolute inset-2 border border-cyan-500/30 rounded-full border-dashed" />
                                <div className="absolute w-full h-[1px] bg-cyan-500/20" />
                                <div className="absolute h-full w-[1px] bg-cyan-500/20" />
                                <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30">
                    <div className="w-12 h-12 border border-cyan-400/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                    </div>
                    <div className="absolute top-1/2 left-full w-4 h-[1px] bg-cyan-400/30" />
                    <div className="absolute top-1/2 right-full w-4 h-[1px] bg-cyan-400/30" />
                    <div className="absolute left-1/2 top-full w-[1px] h-4 bg-cyan-400/30" />
                    <div className="absolute left-1/2 bottom-full w-[1px] h-4 bg-cyan-400/30" />
                </div>

                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 rounded-br-lg pointer-events-none" />

                <div className="absolute bottom-12 left-0 w-full text-center z-30">
                    <p className="text-[10px] tracking-[0.3em] opacity-60 animate-pulse">
                        DRAG TO EXPLORE SECTOR • CLICK TO SCAN TARGET
                    </p>
                </div>

            </div>
        </>
    );
};