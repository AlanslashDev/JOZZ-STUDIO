import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CORE_SERVICES } from '../../data/content';

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

export const ContactForm: React.FC<{ initialService?: string }> = ({ initialService = '' }) => {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: initialService || CORE_SERVICES[0]?.title || 'Logo Design',
    budget: '£1,000 - £3,000',
    timeline: 'Within 2-4 Weeks',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Strict email regex matching valid standard TLDs
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Optional international phone format regex (+, digits, spaces, hyphens, min 7 digits)
  const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?)?\d{3,5}[-.\s]?\d{3,5}$/;

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Your name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address (e.g. name@domain.com)';
        return undefined;
      case 'phone':
        if (value.trim() && !phoneRegex.test(value.trim())) {
          return 'Please enter a valid phone or WhatsApp number';
        }
        return undefined;
      case 'service':
        if (!value) return 'Please select a project type';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Please provide your project details';
        if (value.trim().length < 10) return 'Please provide at least 10 characters explaining your requirements';
        return undefined;
      default:
        return undefined;
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);
    const serviceErr = validateField('service', formData.service);
    const msgErr = validateField('message', formData.message);

    if (nameErr) newErrors.name = nameErr;
    if (emailErr) newErrors.email = emailErr;
    if (phoneErr) newErrors.phone = phoneErr;
    if (serviceErr) newErrors.service = serviceErr;
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulated network submit (wire to Formspree/EmailJS endpoint in production)
    // TODO(client): Swap the simulation with your Formspree endpoint (e.g., fetch('https://formspree.io/f/YOUR_ID', ...))
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 900);
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 sm:p-12 rounded-3xl bg-background-elevated border border-brand-amber/30 text-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h3 className="font-editorial text-3xl font-semibold text-foreground">
            Inquiry Received
          </h3>
          <p className="text-foreground-muted text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. Our studio will review your project requirements and respond within 24–48 hours with initial thoughts and availability.
          </p>
        </div>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: CORE_SERVICES[0]?.title || 'Logo Design',
                budget: '£1,000 - £3,000',
                timeline: 'Within 2-4 Weeks',
                message: '',
              });
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-background border border-background-border text-foreground-muted hover:text-brand-amber hover:border-brand-amber/50 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            Your Name <span className="text-brand-coral">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Eleanor Vance"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3.5 rounded-xl bg-background border ${
              errors.name ? 'border-brand-coral' : 'border-background-border focus:border-brand-amber'
            } text-foreground text-sm placeholder:text-foreground-subtle focus:outline-none transition-colors`}
          />
          {errors.name && (
            <p className="text-[11px] text-brand-coral flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            Email Address <span className="text-brand-coral">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. eleanor@studio.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3.5 rounded-xl bg-background border ${
              errors.email ? 'border-brand-coral' : 'border-background-border focus:border-brand-amber'
            } text-foreground text-sm placeholder:text-foreground-subtle focus:outline-none transition-colors`}
          />
          {errors.email && (
            <p className="text-[11px] text-brand-coral flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone and Service Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            Phone / WhatsApp <span className="text-foreground-subtle text-[10px]">(Optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+44 7000 000000"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3.5 rounded-xl bg-background border ${
              errors.phone ? 'border-brand-coral' : 'border-background-border focus:border-brand-amber'
            } text-foreground text-sm placeholder:text-foreground-subtle focus:outline-none transition-colors`}
          />
          {errors.phone && (
            <p className="text-[11px] text-brand-coral flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="service" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            Project Type <span className="text-brand-coral">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-background-border focus:border-brand-amber text-foreground text-sm focus:outline-none transition-colors cursor-pointer"
          >
            {CORE_SERVICES.map((srv) => (
              <option key={srv.id} value={srv.title} className="bg-background-elevated text-foreground">
                {srv.number} — {srv.title}
              </option>
            ))}
            <option value="Complete Design Retainer" className="bg-background-elevated text-foreground">
              Ongoing Creative Retainer
            </option>
            <option value="Custom Project" className="bg-background-elevated text-foreground">
              Other / Custom Project
            </option>
          </select>
        </div>
      </div>

      {/* Budget and Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            Estimated Budget
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-background-border focus:border-brand-amber text-foreground text-sm focus:outline-none transition-colors cursor-pointer"
          >
            <option value="Under £1,000" className="bg-background-elevated text-foreground">Under £1,000</option>
            <option value="£1,000 - £3,000" className="bg-background-elevated text-foreground">£1,000 – £3,000</option>
            <option value="£3,000 - £6,000" className="bg-background-elevated text-foreground">£3,000 – £6,000</option>
            <option value="£6,000+" className="bg-background-elevated text-foreground">£6,000+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="timeline" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            Target Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-background-border focus:border-brand-amber text-foreground text-sm focus:outline-none transition-colors cursor-pointer"
          >
            <option value="Urgent (Within 1-2 Weeks)" className="bg-background-elevated text-foreground">Urgent (Within 1–2 Weeks)</option>
            <option value="Within 2-4 Weeks" className="bg-background-elevated text-foreground">Within 2–4 Weeks</option>
            <option value="Next 1-2 Months" className="bg-background-elevated text-foreground">Next 1–2 Months</option>
            <option value="Flexible / Planning" className="bg-background-elevated text-foreground">Flexible / In Planning</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
          Project Details & Objectives <span className="text-brand-coral">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your brand, what deliverables you need, and any specific aesthetic inspirations..."
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full px-4 py-3.5 rounded-xl bg-background border ${
            errors.message ? 'border-brand-coral' : 'border-background-border focus:border-brand-amber'
          } text-foreground text-sm placeholder:text-foreground-subtle focus:outline-none transition-colors resize-none`}
        ></textarea>
        {errors.message && (
          <p className="text-[11px] text-brand-coral flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest bg-brand-amber text-background hover:bg-brand-amberHover transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-brand-amber/20 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin"></span>
            <span>Transmitting Details...</span>
          </div>
        ) : (
          <>
            <span>Send Project Inquiry</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-[11px] font-mono text-foreground-subtle text-center">
        Direct response within 24–48 hours. No middle management.
      </p>
    </form>
  );
};
