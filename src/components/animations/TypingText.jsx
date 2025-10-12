import * as React from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion, useInView } from "framer-motion";

const TypingText = ({ text}) => {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px 0px",
		amount: 0.4, });

	return (
		<>
		<span ref={ref}>
			<AnimatePresence>
				{text.split("").map((char, i) => {
					return (
						<motion.span
							
							key={i}
							initial={{ opacity: 0, x: -18 }}
							animate={isInView ? { opacity: 1, x: 0 } : {}}
							exit="hidden"
							transition={{ duration: 0.2, delay: i * 0.01 }}
						>
							{char}
						</motion.span>
					);
				})}
			</AnimatePresence>
			</span>
		</>
	);
};

export default TypingText;