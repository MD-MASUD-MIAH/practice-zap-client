import Marquee from "react-fast-marquee";

const logos = [
  "../../../../assets/brands/amazon.png",
  "../../../../assets/brands/start-people 1.png",

  "../../../../assets/brands/casio.png",
  "../../../../assets/brands/amazon_vector.png",
  "../../../../assets/brands/moonstar.png",
  "../../../../assets/brands/randstad.png",

  "../../../../assets/brands/start.png",
];

export default function ClientLogos() {
  return (
    <section className="py-16 bg-base-200">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          Trusted by Leading Companies
        </h2>
      </div>

      {/* Continuous Marquee */}
      <Marquee
        gradient={false} // no fading edges (so no gap)
        speed={50} // adjust speed
        pauseOnHover // optional: stops on hover
        loop={0} // 0 = infinite loop
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-12 flex items-center">
            <img src={logo} alt={`Client logo ${index}`} className="h-6 w-40" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}
