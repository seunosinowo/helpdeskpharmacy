"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-card space-y-5">
      <div>
        <h3 className="font-heading font-bold text-xl mb-1">Drop us a Line</h3>
        <p className="text-muted-foreground text-sm">Fill out the form and we'll get back to you shortly.</p>
      </div>
      {[
        { name: "name", label: "Your Name", type: "text", placeholder: "David John" },
        { name: "email", label: "Your Email", type: "email", placeholder: "davidjohn@example.com" },
        { name: "subject", label: "Subject", type: "text", placeholder: "How can we help?" },
      ].map((field) => (
        <div key={field.name}>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
          <input
            type={field.type}
            required
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>
      ))}
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
        <textarea
          required
          rows={5}
          placeholder="Tell us more about your inquiry..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
        />
      </div>
      <ClientMotionDiv
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Send Message
        </button>
      </ClientMotionDiv>
    </form>
  );
}
