
export default function ServiceCard({ service }) {
  const { icon: Icon, title, description } = service;

  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-center"
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:bg-[#CAEB66] hover:text-white  "
    >
      {/* Icon */}
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10  text-4xl mb-4">
        <Icon />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
