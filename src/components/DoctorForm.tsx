"use client";

import { useState } from "react";
import { ClientMotionDiv } from "@/components/ClientMotionDiv";

export default function DoctorForm() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "",
    topic: "", 
    details: "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you! A doctor will be in touch shortly.");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-2xl bg-card border border-border shadow-card space-y-5">
      <div>
        <h3 className="font-heading font-bold text-xl mb-1">Consultation Request</h3>
        <p className="text-muted-foreground text-sm">Discuss with us about your form or medical concerns.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Your Name</label>
          <input
            type="text"
            required
            placeholder="David John"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Phone Number</label>
          <input
            type="tel"
            placeholder="+234 8145675412"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label>
        <input
          type="email"
          required
          placeholder="davidjohn@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Topic</label>
        <select
          value={formData.topic}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition appearance-none"
        >
          <option value="" disabled>Select a topic</option>
          <option value="general">General Consultation</option>
          <option value="prescription">Prescription Refill</option>
          <option value="symptoms">Symptom Discussion</option>
          <option value="form">Form Assistance</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Details</label>
        <textarea
          required
          rows={5}
          placeholder="Please describe what you would like to discuss..."
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
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
          Request Consultation
        </button>
      </ClientMotionDiv>
    </form>
  );
}
