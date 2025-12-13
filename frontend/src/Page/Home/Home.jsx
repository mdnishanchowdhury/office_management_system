import React from "react";
import {
  FaUsers,
  FaUserPlus,
  FaFileAlt,
  FaCalendarCheck,
  FaBullseye,
  FaLightbulb,
  FaHandshake,
  FaBuilding,
  FaLaptopCode,
  FaAward,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Reusable Card Component
const Card = ({ icon, title, description, color = "blue" }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
    <div className={`text-${color}-500 mb-4`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/cXpVFQR1/Screenshot-2025-12-04-154253.png)",
        }}
      >
        <div className="absolute inset-100 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-6 max-w-xl">
          <h1 className="text-5xl font-bold mb-5">Welcome to Office Management System</h1>
          <p className="mb-6 text-lg md:text-xl">
            Manage your employees, leaves, and office operations efficiently and effortlessly.
          </p>
          <Link to="/login"><button className="btn btn-primary">Get Started</button></Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              icon={<FaUsers size={36} className="mx-auto" />}
              title="Employee Management"
              description="Keep track of all employees efficiently in one place."
              color="blue"
            />
            <Card
              icon={<FaUserPlus size={36} className="mx-auto" />}
              title="New Hires"
              description="Easily onboard new employees and manage their details."
              color="green"
            />
            <Card
              icon={<FaFileAlt size={36} className="mx-auto" />}
              title="Resignations"
              description="Track employee resignations and handle the exit process."
              color="yellow"
            />
            <Card
              icon={<FaCalendarCheck size={36} className="mx-auto" />}
              title="Leave Management"
              description="Approve, reject, and monitor leaves for all employees."
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">About Our System</h2>
          <p className="text-gray-700">
            The Office Management System helps HR and managers efficiently handle employee records, track leaves, manage resignations, and keep the office running smoothly. Designed to save time, reduce errors, and improve workplace productivity.
          </p>
        </div>
      </section>

      {/* Banner Section */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://i.ibb.co/cXpVFQR1/Screenshot-2025-12-04-154253.png')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Odell Tech</h2>
          <p className="text-lg md:text-xl">
            Leading the way in innovative software solutions, empowering businesses to streamline operations and boost productivity.
          </p>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="container mx-auto px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card
              icon={<FaBullseye size={40} className="mx-auto" />}
              title="Our Mission"
              description="Provide innovative, reliable software solutions that enhance productivity and streamline workflows for businesses worldwide."
              color="blue"
            />
            <Card
              icon={<FaLightbulb size={40} className="mx-auto" />}
              title="Our Vision"
              description="Become a global leader in technology solutions, empowering organizations with modern tools for seamless office management."
              color="green"
            />
            <Card
              icon={<FaHandshake size={40} className="mx-auto" />}
              title="Our Values"
              description="Innovation, Integrity, Customer Satisfaction, and Excellence guide everything we do at Odell Tech."
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
              description="Software development, Office Management Systems, Custom Applications."
              color="green"
            />
            <Card
              icon={<FaAward size={36} className="mt-1" />}
              title="Achievements"
              description="500+ businesses empowered, recognized by multiple tech awards."
              color="purple"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
