import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for contacting Odell Tech IT! We will reach out soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="relative h-40 bg-gradient-to-r  flex items-center justify-center text-black">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">Contact Us</h1>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="6"
                required
                className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaMapMarkerAlt size={28} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p className="text-gray-600">123 Tech Street, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaPhone size={28} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-600">+880 1234 567 890</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaEnvelope size={28} className="text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-600">info@odelltechit.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
