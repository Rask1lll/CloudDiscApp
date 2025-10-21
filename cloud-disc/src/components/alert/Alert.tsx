"use client";
import { useAlertStore } from "@/store/alertStore";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Alert({ color }: { color: string }) {
  const { alert, clearAlert } = useAlertStore();

  const colorStyle = `bg-${color}-200`;

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => clearAlert(), 3700);
    return () => clearTimeout(timer);
  }, [alert, clearAlert]);

  return (
    <div className="absolute w-full flex top-14 justify-center">
      <AnimatePresence>
        {alert && (
          <MotionConfig>
            <motion.div
              key="alert"
              initial={{ y: -100, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`p-2 ${color} font-semibold rounded-md text-gray-700`}
            >
              {alert}
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  );
}
