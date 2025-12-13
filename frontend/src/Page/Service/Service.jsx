import { FaLaptopCode, FaMobileAlt, FaServer, FaCogs } from "react-icons/fa";

const services = [
  {
    icon: <FaLaptopCode size={36} />,
    title: "Web Development",
    description: "Custom web applications to enhance your online presence and business workflow.",
    color: "blue",
  },
  {
    icon: <FaMobileAlt size={36} />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile apps to reach your customers on any device.",
    color: "green",
  },
  {
    icon: <FaServer size={36} />,
    title: "Backend & API Development",
    description: "Robust backend systems and APIs for secure and scalable business solutions.",
    color: "purple",
  },
  {
    icon: <FaCogs size={36} />,
    title: "Custom Solutions",
    description: "Tailor-made IT solutions including Office Management Systems and automation tools.",
    color: "yellow",
  },
];

const Service = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className={`text-${service.color}-500 mb-4`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
