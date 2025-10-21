// components/ui/AnimatedText.jsx
import { motion } from "framer-motion";
import React from "react";

/**
 * A component to animate text with a letter-by-letter slide and blur effect.
 * Renders as a motion.span to prevent invalid HTML nesting.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - The text content to animate.
 * @param {string} [props.className] - Optional Tailwind CSS classes to apply to the text element.
 * @param {number} [props.delay] - The delay (in seconds) before the animation starts.
 * @param {number} [props.speed=0.05] - Controls the speed of letter staggering. Lower values mean faster animation.
 */
const AnimatedText = ({ children, className = "", delay = 0, speed = 0.05 }) => {
  // If children is a React element, we take its string content.
  const textContent = typeof children === 'string' 
    ? children 
    : React.isValidElement(children) && children.props.children
      ? children.props.children
      : "";

  // Split the string into an array of characters, including spaces
  const letters = Array.from(textContent);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Main delay for the component
        delayChildren: delay, 
        // Use the 'speed' prop to set the stagger duration
        staggerChildren: speed, 
      },
    },
  };

  const letterVariants = {
    hidden: { x: -20, opacity: 0, filter: "blur(5px)" }, 
    visible: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Handle nested elements (like the 'Growth' span in the hero)
  if (typeof children !== 'string' && React.isValidElement(children)) {
    return (
      <motion.span 
        className={className} 
        initial="hidden" 
        animate="visible" 
        variants={containerVariants}
        style={{ display: 'inline' }}
      >
        <motion.span variants={letterVariants} className="inline-block">
          {children}
        </motion.span>
      </motion.span>
    );
  }

  // Handle plain text strings letter-by-letter
  return (
    <motion.span 
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ display: "inline" }} 
    >
      {letters.map((letter, index) => (
        <motion.span 
          variants={letterVariants} 
          key={index} 
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter} 
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedText;