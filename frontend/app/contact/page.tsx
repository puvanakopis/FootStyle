"use client";

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Our Headquarters",
      details: ["No. 45, Galle Road, Colombo 03, Sri Lanka"],
    },
    {
      icon: <FaPhone />,
      title: "Contact Numbers",
      details: [
        "Customer Support: +94 75 123 4567",
        "Sales Inquiries: +94 77 123 4567",
        "WhatsApp: +94 77 123 4567"
      ]
    },
    {
      icon: <FaEnvelope />,
      title: "Email Addresses",
      details: [
        "Support: support@footstyle.com",
        "Partnerships: partners@footstyle.com",
        "Press: press@footstyle.com"
      ]
    },
    {
      icon: <FaClock />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: 12:00 PM - 4:00 PM"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Contact Content */}
      <div className="px-4 md:px-10 py-6">
        {/* Hero Section */}
        <section className="flex justify-center py-12 md:py-20">
          <div className="w-full max-w-[1280px]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              {/* Text Content */}
              <div className="lg:w-1/2">
                <div className="flex flex-col gap-6">
                  <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2b4b]">
                    Get In Touch
                  </span>

                  <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main-light md:text-5xl lg:text-6xl">
                    We&#39;re Here to <br />
                    <span className="text-[#ee2b4b]">Help You.</span>
                  </h1>

                  <p className="text-lg leading-relaxed text-text-sec-light">
                    Have questions about our products, need assistance with an order,
                    or want to collaborate? Our dedicated team is ready to assist you
                    with personalized support and timely responses.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-2xl text-[#ee2b4b]">
                      <MdOutlineSupportAgent />
                    </div>
                    <div>
                      <h3 className="font-bold text-text-main-light">24/7 Customer Support</h3>
                      <p className="text-sm text-text-sec-light">Average response time: under 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="lg:w-1/2">
                <div className="relative aspect-square overflow-hidden rounded-2xl group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop")',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="text-xl font-bold">Our Support Team</p>
                    <p className="text-sm opacity-90">Ready to assist you 24/7</p>
                  </div>
                  <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#ee2b4b]">2h</div>
                      <div className="text-xs text-gray-600">Avg. Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="flex justify-center bg-gray-50 py-16">
          <div className="w-full max-w-[960px] px-4">
            <div className="rounded-3xl bg-[#ee2b4b]/5 p-8 shadow-sm md:p-12">
              <div className="text-center">
                <span className="rounded-full bg-[#ee2b4b]/10 px-4 py-1 text-sm font-bold text-[#ee2b4b]">
                  Send Message
                </span>
                <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-main-light md:text-4xl">
                  Let&#39;s Start a Conversation
                </h2>
                <p className="mx-auto mt-2 max-w-[600px] text-base text-text-sec-light">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <form className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main-light">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Puvanakopis"
                      className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-text-main-light">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mehanathan"
                      className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main-light">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="puvanakopis@gmail.com"
                    className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main-light">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+75 12 34 567"
                    className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main-light">
                    Subject *
                  </label>
                  <select
                    className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="collaboration">Business Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-main-light">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="h-4 w-4 rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]"
                  />
                  <label htmlFor="newsletter" className="ml-2 text-sm text-text-sec-light">
                    Subscribe to our newsletter for updates and exclusive offers
                  </label>
                </div>

                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#ee2b4b] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#ee2b4b]/20 transition-transform hover:scale-[1.02]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Contact Information Grid */}
        <section className="flex justify-center py-12">
          <div className="w-full max-w-[1280px] px-4">
            {/* Section Header */}
            <div className="text-center">
              <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2b4b]">
                Contact Us
              </span>
              <h2 className="text-3xl font-black text-text-main-light mt-4">
                Get in Touch
              </h2>
              <p className="text-text-sec-light mt-2 max-w-2xl mx-auto">
                Have questions or need assistance? Reach out to our team through any of the following contact methods.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#f3e7e9] bg-white p-6 transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#ee2b4b]/10 text-xl text-[#ee2b4b]">
                    {info.icon}
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-text-main-light">
                    {info.title}
                  </h3>
                  <ul className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-text-sec-light">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Social Media Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-text-main-light">Follow Us</h3>
              <p className="text-text-sec-light mt-2 max-w-2xl mx-auto mb-6">
                Stay updated with our latest collections, offers, and news
              </p>
              <div className="flex justify-center gap-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-all hover:bg-[#ee2b4b] hover:text-white hover:scale-110"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default Contact;