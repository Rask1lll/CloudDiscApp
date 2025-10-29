"use client";
import { useAlertStore } from "@/store/alertStore";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Alert() {
  const { alert, clearAlert } = useAlertStore();

  function colorStyle() {
    switch (alert.color) {
      case "blue":
        return "bg-blue-300";
      case "red":
        return "bg-red-300";
      case "green":
        return "backdrop-blur-sm  bg-[#2cf73340] ring-green-300 ring-3";
      case "purple":
        return "bg-purple-300";
    }
  }

  useEffect(() => {
    if (!alert) return;
    const timer = setTimeout(() => clearAlert(), 3700);
    return () => clearTimeout(timer);
  }, [alert, clearAlert]);

  return (
    <div className="absolute w-full z-50 flex top-14 justify-center">
      <AnimatePresence>
        {alert.alert && (
          <MotionConfig>
            <motion.div
              initial={{ y: -100, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`p-2  ${colorStyle()} sm:p-2 md:p-5 lg:p-5 md:text-lg font-semibold rounded-md text-gray-700`}
            >
              {alert.alert}
            </motion.div>
          </MotionConfig>
        )}
      </AnimatePresence>
    </div>
  );
}
