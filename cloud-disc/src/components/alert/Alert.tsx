"use client";
import { useAlertStore } from "@/store/alertStore";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Alert() {
  const { alert, clearAlert } = useAlertStore();

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => clearAlert(), 3000);
    return () => clearTimeout(timer);
  }, [alert, clearAlert]);

  return (
    <div className="absolute w-full flex top-14 justify-center">
      <AnimatePresence>
        {alert && (
          <MotionConfig>
            <motion.div
              key="alert"
              initial={{ y: -20, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-2 bg-[#3cf5f567] font-semibold rounded-md text-gray-700"
            >
              {alert}
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  );
}
