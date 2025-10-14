import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";

const FadeBlocks = ({
  children,
  className,
  isOnce = false,
  direction = "left",
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: isOnce,
    margin: "-50px 0px",
    amount: 0.4,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: direction === "left" ? -100 : 100 }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : direction === "left" ? -100 : 100,
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default FadeBlocks;
