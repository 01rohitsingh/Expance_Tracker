// src/utils/animations.js

export const cardAnimation = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },

  whileHover: { y: -3, scale: 1.01 }, // PC hover
  whileTap: { scale: 0.97 }, // Mobile tap

  transition: {
    type: "tween",
    duration: 0.18,
    ease: "easeOut"
  }
};

export const iconAnimation = {
  whileHover: { scale: 1.08 }, // PC hover
  whileTap: { scale: 0.92 }, // Mobile tap

  transition: {
    type: "tween",
    duration: 0.15
  }
};

export const buttonAnimation = {
  whileHover: { scale: 1.05 }, // PC hover
  whileTap: { scale: 0.92 }, // Mobile tap

  transition: {
    type: "tween",
    duration: 0.12
  }
};