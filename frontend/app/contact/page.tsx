"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaMapMarkerAlt as IconMap, FaPhone as IconPhone, FaEnvelope as IconMail, FaClock as IconClock } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const contactInfo = [
    {
      icon: <IconMap />,
      title: "Our Flagship Hub",
      details: ["No. 45, Galle Road, Colombo 03, Sri Lanka"],
    },
    {
      icon: <IconPhone />,
      title: "Direct Support Hotline",
      details: [
        "Customer Support: +94 75 123 4567",
        "Sales & Restocks: +94 77 123 4567",
        "WhatsApp Concierge: +94 77 123 4567"
      ]
    },
    {
      icon: <IconMail />,
      title: "Official Email Concierge",
      details: [
        "Support: support@footstyle.com",
        "Collaborations: partners@footstyle.com",
        "Press: press@footstyle.com"
      ]
    },
    {
      icon: <IconClock />,
      title: "HQ Operating Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: 12:00 PM - 4:00 PM"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafc] text-slate-900">
      <Header />

      {/* Contact Content */}
      <div className="px-4 md:px-10 py-6">
        {/* Hero Section */}
        <section className="flex justify-center py-4 md:py-8">
          <div className="w-full max-w-[1280px]">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="flex flex-col gap-6">
                  <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#ee2b4b] border border-[#ee2b4b]/20">
                    24/7 Collector Support
                  </span>

                  <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                    We&#39;re Here to <br />
                    <span className="text-[#ee2b4b]">Assist You.</span>
                  </h1>

                  <p className="text-base leading-relaxed text-slate-600 font-medium">
                    Have questions about an upcoming drop, sizing assistance, or need help with your order? Our concierge support team is ready to deliver fast solutions.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-2xl text-[#ee2b4b]">
                      <MdOutlineSupportAgent />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm">Priority Support Desk</h3>
                      <p className="text-xs text-slate-500 font-medium">Average response time: Under 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="lg:w-1/2">
                <div className="relative aspect-square overflow-hidden rounded-3xl group border border-slate-200/80">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop")',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-xl font-black">Collector Care Team</p>
                    <p className="text-xs text-slate-300 font-medium">Live Chat & Direct Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="flex justify-center py-12">
          <div className="w-full max-w-[960px] px-4">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-8 md:p-12">
              <div className="text-center mb-8">
                <span className="rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-xs font-extrabold text-[#ee2b4b] uppercase tracking-wider border border-[#ee2b4b]/20">
                  Send Inquiry
                </span>
                <h2 className="mt-4 text-3xl font-black text-slate-900">
                  Drop Us a Message
                </h2>
                <p className="mx-auto mt-2 max-w-[600px] text-xs text-slate-500 font-medium">
                  Fill out the form below and our sneaker team will reply within 24 hours.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      className="w-full rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ee2b4b]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Subject *
                  </label>
                  <select
                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ee2b4b]"
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order & Delivery Inquiry</option>
                    <option value="product">Authenticity & Sizing Question</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="collaboration">Streetwear Partnerships</option>
                    <option value="other">General Query</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how we can help you..."
                    className="w-full rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#ee2b4b] resize-none"
                  />
                </div>

                <div className="w-full flex justify-center pt-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-[#ee2b4b] px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md shadow-[#ee2b4b]/20 hover:bg-[#ff3b5c] transition-all"
                  >
                    Submit Inquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="flex justify-center py-12">
          <div className="w-full max-w-[1280px] px-4">
            <div className="text-center mb-8">
              <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#ee2b4b]">
                Connect With Us
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-3">
                Official Channels
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 transition-all"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ee2b4b]/10 text-xl text-[#ee2b4b]">
                    {info.icon}
                  </div>
                  <h3 className="mb-2 text-base font-extrabold text-slate-900">
                    {info.title}
                  </h3>
                  <ul className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <li key={idx} className="text-xs text-slate-500 font-medium">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;