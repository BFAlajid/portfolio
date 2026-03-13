export const opacity = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 0.75,
    transition: { duration: 0.2, delay: 0 }
  }
};

export const slideUp = {
  initial: {
    top: 0
  },
  exit: {
    top: '-100dvh',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.05 }
  }
};