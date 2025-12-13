import React from "react";
import {
  FaBullseye,
  FaLightbulb,
  FaHandshake,
  FaBuilding,
  FaLaptopCode,
  FaAward,
} from "react-icons/fa";

const Card = ({ icon, title, description, color = "blue" }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
    <div className={`text-${color}-500 mb-4`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AboutPage = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        {/* Company Overview */}
        <h2 className="text-3xl font-bold mb-6">About Odell Tech IT</h2>
        <p className="text-gray-700 mb-4 max-w-3xl mx-auto">
          Odell Tech IT is a pioneering software development company founded in 2015. We specialize in delivering cutting-edge IT solutions for businesses of all sizes, from startups to enterprises. Our goal is to help organizations optimize processes, enhance collaboration, and drive innovation.
        </p>
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          With a dedicated team of experts and a focus on quality, Odell Tech IT has empowered over 500 businesses globally. We prioritize customer satisfaction and aim to exceed expectations in every project we deliver.
        </p>

        {/* Mission, Vision & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card
            icon={<FaBullseye size={40} className="mx-auto" />}
            title="Our Mission"
            description="Deliver innovative IT solutions that enhance productivity, efficiency, and growth for businesses worldwide."
            color="blue"
          />
          <Card
            icon={<FaLightbulb size={40} className="mx-auto" />}
            title="Our Vision"
            description="To be a global leader in technology solutions, empowering organizations with modern tools for seamless operations."
            color="green"
          />
          <Card
            icon={<FaHandshake size={40} className="mx-auto" />}
            title="Our Values"
            description="Integrity, Innovation, Excellence, and Customer Satisfaction guide every aspect of our work."
            color="purple"
          />
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <Card
            icon={<FaBuilding size={36} className="mt-1" />}
            title="Established"
            description="Founded in 2015 with a passion for technology and innovation."
            color="blue"
          />
          <Card
            icon={<FaLaptopCode size={36} className="mt-1" />}
            title="Services"
            description="Software Development, Web & Mobile Applications, Office Management Systems, Custom Solutions."
            color="green"
          />
          <Card
            icon={<FaAward size={36} className="mt-1" />}
            title="Achievements"
            description="500+ businesses empowered, recognized with multiple tech awards and industry accolades."
            color="purple"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
