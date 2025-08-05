import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ResumiTitle = ({
  target = "Resumi",
  speed = 100,
  finalColor = "#556B2F",
  placeholderColor = "",
  className = "",
}) => {
  const [text, setText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const chars = "!@#$%^&*()_+{}[]<>?|abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      let display = "";
      for (let i = 0; i < target.length; i++) {
        if (i < iterations) {
          display += target[i];
        } else {
          display += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setText(display);

      if (iterations >= target.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
      iterations++;
    }, speed);

    return () => clearInterval(interval); // Clean up on unmount
  }, [target, speed]);

  return (
    <span
      className={className}
      style={{ color: isComplete ? finalColor : placeholderColor }}
    >
      {text}
    </span>
  );
};

export default ResumiTitle;

