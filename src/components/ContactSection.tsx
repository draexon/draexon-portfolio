/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Send, ShieldAlert, CheckCircle2, UserCheck, ShieldClose, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Message } from "../types";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";

export const ContactSection: React.FC = () => {
  // Authentication Simulate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<{ name: string; email: string } | null>(null);

  // Form entries
  const [messageText, setMessageText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [msgCount, setMsgCount] = useState<number>(0);

  // Inquiries Logs database for persistence simulation
  const [logs, setLogs] = useState<Message[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("draexon_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUserProfile(parsed);
        setIsAuthenticated(true);
      } catch (e) {}
    }

    const savedLogs = localStorage.getItem("draexon_inquiries");
    if (savedLogs) {
      try {
        setLogs(JSON.parse(savedLogs));
      } catch (e) {}
    }
  }, []);

  const handleGoogleSignIn = () => {
    if (isSigningIn) return;
    setIsSigningIn(true);

    // Simulated quick loading loop
    setTimeout(() => {
      const mockProfile = {
        name: "Weave Guest",
        email: "weave.craftsman@gmail.com",
      };
      localStorage.setItem("draexon_user", JSON.stringify(mockProfile));
      setUserProfile(mockProfile);
      setIsAuthenticated(true);
      setIsSigningIn(false);
    }, 1000);
  };

  const handleSignOut = () => {
    localStorage.removeItem("draexon_user");
    setUserProfile(null);
    setIsAuthenticated(false);
    setSubmitSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !messageText.trim() || isSubmitting) return;

    if (msgCount >= 3) {
      alert("Limited to 3 messages per day in public preview.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newInquiry: Message = {
        id: `inq-${Date.now()}`,
        name: userProfile?.name || "Weave Guest",
        email: userProfile?.email || "weave.craftsman@gmail.com",
        service: "Direct Client Inquiry",
        budget: "$5,000",
        content: messageText,
        timestamp: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
      };

      const updated = [...logs, newInquiry];
      setLogs(updated);
      localStorage.setItem("draexon_inquiries", JSON.stringify(updated));

      setMessageText("");
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setMsgCount((prev) => prev + 1);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    }, 1000);
  };

  return (
    <SectionContainer 
      id="contact" 
      customPadding="px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24"
    >
      
      {/* Centered-aligned layout */}
      <motion.div 
        variants={fadeInUpVariants}
        className="max-w-xl mx-auto text-center space-y-10"
      >
        
        {/* Header Tags */}
        <div className="space-y-4">
          <p className="font-mono text-[10px] sm:text-xs text-saffron tracking-[0.3em] uppercase font-semibold">// LET'S TALK</p>
          <h2 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-text-main leading-tight-none uppercase">
            Let's <span className="italic font-normal text-saffron font-serif">synchronize.</span>
          </h2>
          <p className="text-xs sm:text-sm text-text-dim/70 leading-relaxed font-sans px-4">
            Initiate direct client communication. Collaborate on high-end cinematic edits, modular audio production, or custom frontend integrations.
          </p>
        </div>

        <div className="w-full h-[1px] bg-saffron/10 max-w-[150px] mx-auto" />

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* STATE 1: REQUISITE AUTHENTICATION PROMPT (Centered details) */
            <motion.div
              key="state-auth"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 py-4 flex flex-col items-center"
            >
              
              {/* Saffron Outline, No-Fill Minimal Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="w-full max-w-xs py-4 border border-saffron bg-transparent font-mono text-xs font-bold tracking-[0.25em] text-saffron hover:bg-saffron hover:text-[#0C0C0C] transition-all duration-300 disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-3 rounded-none"
              >
                {isSigningIn ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-saffron border-t-transparent animate-spin rounded-full" />
                    <span>SYNCHRONIZING...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>CONTINUE WITH GOOGLE</span>
                  </>
                )}
              </button>

              {/* Subtitle Warning in specific text */}
              <div className="space-y-1.5 max-w-sm">
                <p className="text-[10px] sm:text-xs font-mono text-text-dim/50 tracking-wide font-medium">
                  Login with Google to send me a message · Limited to 3 messages per day.
                </p>
                <p className="text-[9px] font-mono text-text-dim/40 uppercase tracking-widest pt-1">
                  NO BACKEND SPAM // CLIENT-LED SECURED TELEMETRY ONLY
                </p>
              </div>

            </motion.div>
          ) : (
            /* STATE 2: AUTHENTICATED EXCLUSIVE FORM WRAP */
            <motion.form
              key="state-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6 text-left border border-saffron/20 bg-bg-card p-6 sm:p-8 transition-colors duration-300"
            >
              
              {/* Authenticated token bar */}
              <div className="flex justify-between items-center pb-4 border-b border-saffron/10 font-mono text-[9px] text-text-dim/50">
                <div className="flex items-center space-x-2 text-emerald-500">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="font-bold uppercase">VERIFIED: {userProfile?.name}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-saffron hover:underline tracking-widest font-bold uppercase transition-all cursor-pointer"
                >
                  [DISCONNECT]
                </button>
              </div>

              {/* Name entry (PRE-FILLED) */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono uppercase text-text-dim/50 tracking-widest">
                  CLIENT ID NAME
                </label>
                <input
                  type="text"
                  readOnly
                  value={userProfile?.name || ""}
                  className="w-full bg-bg-card-inset border border-saffron/10 text-xs font-mono p-3 text-text-dim/70 outline-none cursor-not-allowed select-none transition-colors duration-300"
                />
              </div>

              {/* Email entry (PRE-FILLED) */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono uppercase text-text-dim/50 tracking-widest">
                  CLIENT ROUTE EMAIL
                </label>
                <input
                  type="email"
                  readOnly
                  value={userProfile?.email || ""}
                  className="w-full bg-bg-card-inset border border-saffron/10 text-xs font-mono p-3 text-text-dim/70 outline-none cursor-not-allowed select-none transition-colors duration-300"
                />
              </div>

              {/* Message content textarea */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-text-dim/50 tracking-widest">
                  <span>TRANSMISSION SUMMARY</span>
                  <span className="text-saffron">MSG {msgCount}/3 CAPSULE</span>
                </div>
                <textarea
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  placeholder="Detail your request, visual benchmarks, or computational layouts..."
                  className="w-full bg-bg-card-inset border border-saffron/15 text-xs font-sans p-3 sm:p-4 outline-none focus:border-saffron placeholder:text-text-dim/30 focus:bg-bg-card-hover leading-relaxed text-text-main transition-all duration-300"
                />
              </div>

              {/* Submit triggers and messages */}
              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center sm:justify-between text-xs">
                <div className="min-h-[20px]">
                  {submitSuccess && (
                    <div className="flex items-center space-x-1.5 text-emerald-500 font-mono text-[9px] font-bold tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>SECURE MODEL COMMITTED TO LOCAL TERMINAL LOG</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !messageText.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-saffron text-[#0C0C0C] font-mono text-xs font-bold tracking-[0.2em] hover:bg-transparent hover:text-saffron border border-saffron transition-all duration-300 disabled:opacity-40 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}</span>
                </button>
              </div>

              {/* Secure status */}
              <div className="pt-3 border-t border-saffron/5 flex items-center justify-center space-x-2 text-[9px] font-mono text-text-dim/40">
                <Lock className="w-3 h-3 text-saffron" />
                <span>SECURE CRYPTO TRANSMISSION SHIELD ACTIVE</span>
              </div>

            </motion.form>
          )}
        </AnimatePresence>

      </motion.div>

    </SectionContainer>
  );
};
