import { motion } from "framer-motion"
export const CheckLogo = () => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 256 256"
    >
        <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                ease: "easeInOut",
            }}
            fill="#ACF15C"
            strokeWidth={4}
            strokeDasharray="0 1"
            d="M43.077 63.077l-.14-.002a5.004 5.004 0 01-3.588-1.666L23.195 43.332a5 5 0 017.456-6.664l12.63 14.133 38.184-38.184a5 5 0 017.07 7.071L46.612 61.612a4.994 4.994 0 01-3.535 1.465z"
            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        ></motion.path>
        <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            fill="#ACF15C"
            d="M45 90C20.187 90 0 69.813 0 45S20.187 0 45 0a5 5 0 110 10c-19.299 0-35 15.701-35 35s15.701 35 35 35 35-15.701 35-35a5 5 0 1110 0c0 24.813-20.187 45-45 45z"
            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
        ></motion.path>
    </motion.svg>
)



