import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    className?: string;
    animateOnHover?: boolean;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const DecryptedText = ({ text, className, animateOnHover = false }: DecryptedTextProps) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const iterations = useRef(0);

    const startAnimation = () => {
        iterations.current = 0;
        clearInterval(intervalRef.current!);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((char, index) => {
                        if (index < iterations.current) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iterations.current >= text.length) {
                clearInterval(intervalRef.current!);
            }

            iterations.current += 1 / 4;
        }, 30);
    };

    useEffect(() => {
        // Animación inicial al montar
        startAnimation();
        return () => clearInterval(intervalRef.current!);
    }, []);

    const handleMouseEnter = () => {
        if (animateOnHover) {
            setIsHovering(true);
            startAnimation();
        }
    };

    return (
        <motion.span
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </motion.span>
    );
};