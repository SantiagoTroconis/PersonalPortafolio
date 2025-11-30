import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    link,
    github,
    tags,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    link?: string;
    github?: string;
    tags?: string[];
}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 relative overflow-hidden glass-card",
                className
            )}
        >
            {/* Spotlight Effect Layer */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/bento:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
                <div className="flex-1 transition duration-200 group-hover/bento:translate-x-2">
                    {header}
                </div>
                <div className="group-hover/bento:translate-x-2 transition duration-200 mt-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {icon}
                            <div className="font-bold font-sans text-neutral-200 mb-1 mt-1">
                                {title}
                            </div>
                        </div>

                        {/* Links Action Area */}
                        <div className="flex gap-2 opacity-0 group-hover/bento:opacity-100 transition-opacity">
                            {github && (
                                <a href={github} target="_blank" rel="noreferrer" className="p-1.5 bg-neutral-800 rounded-full hover:bg-neutral-700 transition-colors">
                                    <Github size={14} className="text-white" />
                                </a>
                            )}
                            {link && (
                                <a href={link} target="_blank" rel="noreferrer" className="p-1.5 bg-white rounded-full hover:bg-neutral-200 transition-colors">
                                    <ArrowUpRight size={14} className="text-black" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="font-sans font-normal text-neutral-400 text-xs dark:text-neutral-300 line-clamp-2">
                        {description}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                        {tags?.map((tag, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-neutral-400 border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};