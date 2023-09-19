interface Viewport {
  once?: boolean;
  margin?: string;
  amount?: "some" | "all" | number;
}

export const ANIMATE_ONCE =
  process.env.NODE_ENV === "development" ? false : true;
export const DEFAULT_VIEWPORT: Viewport = {
  once: ANIMATE_ONCE,
  amount: "some",
};

interface IDefaultVariant {
  duration?: number;
  delay?: number;
}

export const defaultVariant = ({
  delay = 0.2,
  duration = 0.3,
}: IDefaultVariant) => ({
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay,
      duration,
    },
  },
});

export const cardItemVariant = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export const cardContainerVariant = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};
