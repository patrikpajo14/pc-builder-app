import React, { useEffect } from "react";
import Image from "next/image";
import IconButton from "@/components/IconButton";
import { AnimatePresence, motion } from "framer-motion";

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export default function CustomDrawer({ isOpened, title, children, onClose }) {
  useEffect(() => {
    isOpened
      ? document.body.classList.add("no-scroll")
      : document.body.classList.remove("no-scroll");
  }, [isOpened]);

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          className="relative z-10"
          aria-labelledby="slide-over-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            variants={itemVariants}
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: "100%",
              transition: { duration: 0.4 },
            }}
            exit={{
              width: 0,
              transition: { delay: 0.2, duration: 0.3 },
            }}
            className="pointer-events-none fixed inset-y-0 right-0 flex max-w-[700px]"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              className="pointer-events-auto relative w-screen"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-gray-700 py-6 shadow-xl max-h-[calc(100vh - 80px)] overflow-y-auto">
                <div className="px-4 sm:px-6 flex justify-between items-center">
                  <h2
                    className="text-xl font-semibold leading-6 text-white"
                    id="slide-over-title"
                  >
                    {title}
                  </h2>
                  <IconButton onClick={onClose}>
                    <Image
                      src={"/icons/ico_close.svg"}
                      alt={"close"}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </div>
                <motion.div
                  variants={itemVariants}
                  className="relative mt-6 flex-1 px-4 sm:px-6"
                >
                  {children}
                </motion.div>
              </div>
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
