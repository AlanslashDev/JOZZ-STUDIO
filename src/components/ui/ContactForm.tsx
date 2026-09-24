import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { CORE_SERVICES, CONTACT_CONTENT } from '../../data/content';
import { ApiError, publicApi } from '../../lib/api';

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
  const copy = CONTACT_CONTENT.form;
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: initialService || CORE_SERVICES[0]?.title || 'Logo Design',
    budget: copy.budgets[1] || copy.budgets[0] || '',
    timeline: copy.timelines[1] || copy.timelines[0] || '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);
    try {
      await publicApi.submitEnquiry(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.');
      const apiError = error as ApiError;
      if (apiError.details) setErrors((previous) => ({ ...previous, ...apiError.details }));
    }
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
            {copy.successHeading}
          </h3>
          <p className="text-foreground-muted text-sm max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-foreground font-semibold">{formData.name}</span>. {copy.successMessage}
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
                budget: copy.budgets[1] || copy.budgets[0] || '',
                timeline: copy.timelines[1] || copy.timelines[0] || '',
                message: '',
              });
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-background border border-background-border text-foreground-muted hover:text-brand-amber hover:border-brand-amber/50 transition-colors"
          >
            {copy.resetText}
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
            {copy.nameLabel} <span className="text-brand-coral">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder={copy.namePlaceholder}
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
            {copy.emailLabel} <span className="text-brand-coral">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder={copy.emailPlaceholder}
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
            {copy.phoneLabel} <span className="text-foreground-subtle text-[10px]">({copy.optionalLabel})</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder={copy.phonePlaceholder}
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
            {copy.serviceLabel} <span className="text-brand-coral">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-background-border focus:border-brand-amber text-foreground text-sm focus:outline-none transition-colors cursor-pointer"
          >
            {CORE_SERVICES.filter((srv) => srv.visible !== false).map((srv) => (
              <option key={srv.id} value={srv.title} className="bg-background-elevated text-foreground">
                {srv.number} — {srv.title}
              </option>
            ))}
            {copy.extraServices.map((service) => <option key={service} value={service} className="bg-background-elevated text-foreground">{service}</option>)}
          </select>
        </div>
      </div>

      {/* Budget and Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            {copy.budgetLabel}
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-background-border focus:border-brand-amber text-foreground text-sm focus:outline-none transition-colors cursor-pointer"
          >
            {copy.budgets.map((budget) => <option key={budget} value={budget} className="bg-background-elevated text-foreground">{budget}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="timeline" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
            {copy.timelineLabel}
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full px-4 py-3.5 rounded-xl bg-background border border-background-border focus:border-brand-amber text-foreground text-sm focus:outline-none transition-colors cursor-pointer"
          >
            {copy.timelines.map((timeline) => <option key={timeline} value={timeline} className="bg-background-elevated text-foreground">{timeline}</option>)}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-xs uppercase font-mono tracking-widest text-foreground-muted">
          {copy.messageLabel} <span className="text-brand-coral">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={copy.messagePlaceholder}
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
            <span>{copy.submittingText}</span>
          </div>
        ) : (
          <>
            <span>{copy.submitText}</span>
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>

      <p className="text-[11px] font-mono text-foreground-subtle text-center">
        {copy.responseNote}
      </p>
      {submitError && (
        <p role="alert" className="text-xs text-brand-coral text-center">
          {submitError}
        </p>
      )}
    </form>
  );
};
