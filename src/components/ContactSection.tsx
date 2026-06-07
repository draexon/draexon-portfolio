/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, CheckCircle2, AlertCircle, Lock, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  GoogleAuthProvider,
  User,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { SectionContainer, fadeInUpVariants } from "./SectionContainer";

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

export const ContactSection: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  useEffect(() => {
    getRedirectResult(auth).catch((error) => {
      setAuthError(error instanceof Error ? error.message : "Google sign in failed.");
    });

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setName(nextUser?.displayName || "");
      setEmail(nextUser?.email || "");
    });
  }, []);

  const handleGoogleSignIn = async () => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    setAuthError("");

    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : "Google sign in failed.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setMessageText("");
    setSubmitSuccess(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !messageText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError("");

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: name,
          from_email: email,
          message: messageText,
        },
        emailJsConfig.publicKey
      );

      setName("");
      setEmail("");
      setMessageText("");
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 4000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Message transmission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer 
      id="contact" 
      customPadding="px-5 sm:px-8 md:px-16 lg:px-24 py-16 md:py-24"
    >
      <motion.div 
        variants={fadeInUpVariants}
        className="max-w-xl mx-auto text-center space-y-10"
      >
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
          {!user ? (
            <motion.div
              key="google-auth"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-5 border border-saffron/20 bg-bg-card p-6 sm:p-8"
            >
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSigningIn}
                className="w-full px-6 py-4 border border-saffron bg-transparent text-saffron font-mono text-xs font-bold tracking-[0.2em] hover:bg-saffron hover:text-[var(--bg)] transition-[background-color,color,opacity] duration-300 disabled:opacity-40 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>{isSigningIn ? "SIGNING IN..." : "SIGN IN WITH GOOGLE"}</span>
              </button>

              {authError && (
                <div className="flex items-center justify-center space-x-1.5 text-red-400 font-mono text-[9px] font-bold tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{authError}</span>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.form
              key="contact-form"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6 text-left border border-saffron/20 bg-bg-card p-6 sm:p-8 transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b border-saffron/10 font-mono text-[9px] text-text-dim/50">
                <div className="flex items-center space-x-3 text-emerald-500">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "Google profile"}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full border border-saffron/30"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold uppercase">SIGNED IN AS</span>
                    <span className="text-text-main text-[11px] normal-case tracking-normal">
                      {user.displayName || "Google User"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-saffron hover:text-text-main tracking-widest font-bold uppercase transition-colors cursor-pointer flex items-center space-x-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-mono uppercase text-text-dim/50 tracking-widest">
                  CLIENT ID NAME
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-bg-card-inset border border-saffron/10 text-xs font-mono p-3 text-text-main outline-none focus:border-saffron placeholder:text-text-dim/30 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] font-mono uppercase text-text-dim/50 tracking-widest">
                  CLIENT ROUTE EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-bg-card-inset border border-saffron/10 text-xs font-mono p-3 text-text-main outline-none focus:border-saffron placeholder:text-text-dim/30 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono text-text-dim/50 tracking-widest">
                  <span>TRANSMISSION SUMMARY</span>
                  <span className="text-saffron">EMAIL ROUTE</span>
                </div>
                <textarea
                  required
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                  placeholder="Detail your request, visual benchmarks, or computational layouts..."
                  className="w-full bg-bg-card-inset border border-saffron/15 text-xs font-sans p-3 sm:p-4 outline-none focus:border-saffron placeholder:text-text-dim/30 focus:bg-bg-card-hover leading-relaxed text-text-main transition-[background-color,border-color] duration-300"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center sm:justify-between text-xs">
                <div className="min-h-[20px]">
                  {submitSuccess && (
                    <div className="flex items-center space-x-1.5 text-emerald-500 font-mono text-[9px] font-bold tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>MESSAGE SENT THROUGH EMAILJS</span>
                    </div>
                  )}
                  {submitError && (
                    <div className="flex items-center space-x-1.5 text-red-400 font-mono text-[9px] font-bold tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{submitError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim() || !email.trim() || !messageText.trim()}
                  className="w-full sm:w-auto px-6 py-3 bg-saffron text-[var(--bg)] font-mono text-xs font-bold tracking-[0.2em] hover:bg-transparent hover:text-saffron border border-saffron transition-[background-color,color,opacity] duration-300 disabled:opacity-40 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}</span>
                </button>
              </div>

              <div className="pt-3 border-t border-saffron/5 flex items-center justify-center space-x-2 text-[9px] font-mono text-text-dim/40">
                <Lock className="w-3 h-3 text-saffron" />
                <span>EMAILJS CONFIG LOADED FROM VITE ENVIRONMENT</span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionContainer>
  );
};
