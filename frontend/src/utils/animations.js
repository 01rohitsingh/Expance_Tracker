// src/utils/animations.js

export const cardAnimation = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },

  whileHover: { y: -3, scale: 1.01 },
  whileTap: { scale: 0.97 },

  transition: {
    type: "tween",
    duration: 0.18,
    ease: "easeOut"
  }
};

export const iconAnimation = {
  whileHover: { scale: 1.08 },
  whileTap: { scale: 0.92 },

  transition: {
    type: "tween",
    duration: 0.15
  }
};

export const buttonAnimation = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.92 },

  transition: {
    type: "tween",
    duration: 0.12
  }
};