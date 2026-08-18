'use client'
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent, SelectHTMLAttributes } from "react";
import Image from "next/image";
import TitleHeader from "../components/TitleHeader";
import dynamic from "next/dynamic";
import { useTranslation } from "@/hooks/useTranslation";

const ContactExperience = dynamic(
  () => import("../components/models/contact/ContactExperience"),
  { ssr: false }
);

const Contact = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    setIsDesktop(lastWidth >= 1280); // xl breakpoint
    const check = () => {
      const newWidth = window.innerWidth;
      if (newWidth === lastWidth) return;
      lastWidth = newWidth;
      setIsDesktop(newWidth >= 1280);
    };
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");

  // Lock body scroll when popup is open
  useEffect(() => {
    if (showSuccess) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSuccess]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (honeypot) {
      setForm({ name: "", subject: "", message: "" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Failed to send');

      setForm({ name: "", subject: "", message: "" });
      setShowSuccess(true);
    } catch (error) {
      console.error("Contact Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Success Popup */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(var(--color-edge-fade), 0.8)' }}
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="bg-th-surface border border-th-border rounded-2xl p-8 mx-4 max-w-md text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-th-text mb-2">{t.contact.successTitle}</h3>
            <p className="text-th-muted mb-6">{t.contact.successMessage}</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-3 font-semibold rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-bg)' }}
            >
              {t.contact.close}
            </button>
          </div>
        </div>
      )}

      <section id="contact" className="flex-center section-padding">
        <div className="w-full h-full 3xl:px-28 2xl:px-20 xl:px-12">
          <TitleHeader
            title={t.contact.title}
            sub={t.contact.subtitle}
          />
          <div className="grid-12-cols mt-16">
            <div className="xl:col-span-5">
              <div id="contact-form" className="flex-center card-border rounded-xl p-10">
                <form
                  onSubmit={handleSubmit}
                  className="w-full flex flex-col gap-7"
                >
                  {/* Honeypot field - hidden from users, catches bots */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="name">{t.contact.name}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject">{t.contact.subject}</label>
                    <select
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      suppressHydrationWarning
                      className="w-full px-4 py-4 text-base bg-th-input rounded-md text-th-muted"
                    >
                      <option value="" suppressHydrationWarning>{t.contact.subjectPlaceholder}</option>
                      {t.contact.scenarios.map((scenario: string) => (
                        <option key={scenario} value={scenario}>{scenario}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message">{t.contact.message}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                  <button type="submit">
                    <div className="cta-button group">
                      <div className="bg-circle" />
                      <p className="text">
                        {loading ? t.contact.sending : t.contact.send}
                      </p>
                      <div className="arrow-wrapper">
                        <Image src="/images/arrow-down.svg" alt="arrow" width={24} height={24} />
                      </div>
                    </div>
                  </button>
                </form>
              </div>
            </div>
            {/* 3D model — only loaded on desktop (prevents Three.js bundle on mobile/tablet) */}
            {isDesktop && (
              <div className="xl:col-span-7 min-h-96">
                <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
                  <ContactExperience />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
