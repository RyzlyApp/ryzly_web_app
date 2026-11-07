"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck, FiArrowRight } from "react-icons/fi";
import { Track } from "./types";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTrack: Track | null;
}

export default function EnrollModal({
  isOpen,
  onClose,
  selectedTrack,
}: EnrollModalProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    track: "product-design",
  });

  useEffect(() => {
    if (selectedTrack) {
      setFormData((prev) => ({ ...prev, track: selectedTrack.id }));
    }
  }, [selectedTrack]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white text-gray-900 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl z-10 border border-gray-100 overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <FiX />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 font-bold">
                  <FiCheck />
                </div>
                <h3 className="text-2xl font-bold text-[#1D1348]">
                  You&apos;re on the list!
                </h3>
                <p className="mt-2 text-sm text-gray-600 max-w-xs">
                  We&apos;ve reserved your cohort spot. Check your email for
                  onboarding details and sprint schedules.
                </p>
              </div>
            ) : (
              <div>
                <span className="px-3 py-1 bg-[#EEF0FF] text-[#5160E7] text-xs font-bold rounded-full uppercase tracking-wider">
                  {selectedTrack
                    ? `${selectedTrack.title} • Cohort 4`
                    : "Cohort 4 Enrollment"}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-[#1D1348]">
                  Start Your Experience
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Join 25 aspiring professionals practicing real tech jobs.
                </p>

                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/20 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="sarah@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/20 outline-none text-sm text-gray-900 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                      Select Career Track
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          track: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#5160E7] focus:ring-2 focus:ring-[#5160E7]/20 outline-none text-sm text-gray-900 transition-all bg-white"
                    >
                      <option value="product-design">Product Design (UI/UX)</option>
                      <option value="product-management">Product Management</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="data-analytics">Data Analytics</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[#5160E7] hover:bg-[#4352D9] text-white font-semibold text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Secure Spot (₦20,000)</span>
                      <FiArrowRight />
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-400">
                    30-day money-back guarantee • No credit card required to apply
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

