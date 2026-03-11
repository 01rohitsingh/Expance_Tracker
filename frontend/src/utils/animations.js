// src/utils/animations.js

export const cardAnimation = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: {
    type: "spring",
    stiffness: 120,
    damping: 18
  }
};

export const iconAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: {
    type: "spring",
    stiffness: 180,
    damping: 14
  }
};

export const buttonAnimation = {
  whileHover: { scale: 1.04 },
  whileTap: { scale: 0.96 },
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 15
  }
};