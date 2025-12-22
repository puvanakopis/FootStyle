"use client";

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineSupportAgent, MdOutlineMessage } from "react-icons/md";

const ContactPage = () => {
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex justify-center px-4 py-12 md:px-10 md:py-20">
        <div className="w-full max-w-[1280px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            {/* Text Content */}
            <div className="lg:w-1/2">
              <div className="flex flex-col gap-6">
                <span className="w-fit rounded-full bg-[#ee2b4b]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ee2b4b]">
                  Get In Touch
                </span>
                
                <h1 className="text-4xl font-black leading-tight tracking-tight text-text-main-light md:text-5xl lg:text-6xl">
                  We're Here to <br />
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

            {/* Contact Form Preview Image */}
            <div className="lg:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#ee2b4b]/5 to-[#ee2b4b]/10">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
                    <div className="mb-6 flex items-center gap-2">
                      <MdOutlineMessage className="text-xl text-[#ee2b4b]" />
                      <h3 className="text-lg font-bold text-text-main-light">Send us a Message</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="h-3 rounded-full bg-gray-200"></div>
                      <div className="h-3 rounded-full bg-gray-200"></div>
                      <div className="h-20 rounded-lg bg-gray-200"></div>
                      <div className="h-10 rounded-lg bg-[#ee2b4b]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="flex justify-center bg-gray-50 px-4 py-16 md:px-10">
        <div className="w-full max-w-[960px] px-16 ">
          <div className="rounded-3xl bg-[#ee2b4b]/5 p-24 shadow-sm md:p-12">
            <div className="text-center">
              <span className="rounded-full bg-[#ee2b4b]/10 px-4 py-1 text-sm font-bold text-[#ee2b4b]">
                Send Message
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-text-main-light md:text-4xl">
                Let's Start a Conversation
              </h2>
              <p className="mx-auto mt-2 max-w-[600px] text-base text-text-sec-light">
                Fill out the form below and our team will get back to you within 24 hours.
              </p>
            </div>

           <form className="mt-8 space-y-16 ">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
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

              <div className="pt-8">
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
            
              <div className="pt-8">
                <label className="mb-2 block text-sm font-medium text-text-main-light">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+75 12 34 567"
                  className="w-full rounded-lg border-0 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ee2b4b]"
                />
              </div>
            
              <div className="pt-8">
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
            
              <div className="pt-8">
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
            
              <div className="flex items-center pt-6 pb-4">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="h-4 w-4 rounded border-gray-300 text-[#ee2b4b] focus:ring-[#ee2b4b]"
                /> &nbsp; &nbsp;
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
      <section className="flex justify-center px-4 py-12 md:px-10">
        <div className="w-full max-w-[1280px]">
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
        </div>
      </section>
    </div>
  );
};

export default ContactPage;