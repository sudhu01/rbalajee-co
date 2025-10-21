'use client'
import { useEffect } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function StarAnimationText(props) {
    useEffect(() => {
        const rand = (min, max) =>
            Math.floor(Math.random() * (max - min + 1)) + min;

        const stars = Array.from(document.querySelectorAll(".magic-star"));
        if (!stars.length) return;

        // Store all animations for cleanup
        const animations = [];

        stars.forEach((star, i) => {
            // Base styles
            star.style.position = "absolute";
            star.style.willChange = "transform, left, top";
            star.style.transformOrigin = "50% 50%";
            star.style.pointerEvents = "none";
            star.style.zIndex = "2";
            star.style.width = "20px";  // Add fixed width
            star.style.height = "20px";  // Add fixed height

            const svg = star.querySelector("svg");
            if (svg) {
                svg.style.width = "100%";
                svg.style.height = "100%";
                svg.style.fill = "gold";  // Add color

                const rotationAnimation = svg.animate(
                    [
                        { transform: "rotate(0deg)" },
                        { transform: "rotate(360deg)" }
                    ],
                    {
                        duration: 1500,
                        iterations: Infinity,
                        easing: "linear"
                    }
                );
                animations.push(rotationAnimation);
            }

            const animateOnce = () => {
                const left = rand(0, 100);
                const top = rand(-20, 50);

                star.style.left = `${left}%`;
                star.style.top = `${top}%`;

                const moveAnimation = star.animate(
                    [
                        { 
                            transform: "translate(-50%, -50%) scale(0)",
                            opacity: 0 
                        },
                        {
                            transform: "translate(-50%, -50%) scale(1)",
                            opacity: 1,
                            offset: 0.4
                        },
                        { 
                            transform: "translate(-50%, -50%) scale(0)",
                            opacity: 0 
                        }
                    ],
                    {
                        duration: 1000,
                        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                        fill: "forwards"
                    }
                );
                animations.push(moveAnimation);
            };

            // Stagger initial animations
            const initialDelay = i * 300;
            const timeout = setTimeout(() => {
                animateOnce();
                const interval = setInterval(animateOnce, 2000);
                return () => clearInterval(interval);
            }, initialDelay);

            return () => clearTimeout(timeout);
        });

        // Cleanup
        return () => {
            animations.forEach(animation => {
                if (animation && animation.cancel) {
                    animation.cancel();
                }
            });
        };
    }, []);

    return (
        <h2 className={`relative top-24 z-10 text-3xl font-bold text-slate-900 ${montserrat.className}`}>
            {props.preText}
            <span className="magic inline-block relative px-2">
                <span className="magic-star">
                    <svg viewBox="0 0 512 512">
                        <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                </span>
                <span className="magic-star">
                    <svg viewBox="0 0 512 512">
                        <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                </span>
                <span className="magic-star">
                    <svg viewBox="0 0 512 512">
                        <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                    </svg>
                </span>
                <span className="magic-text">{props.magicText}</span>
            </span>
            {props.postText}
        </h2>
    );
}