import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ServicesSection from "../../service/ServicesSection";
import Banner from "../Banner/Banner";
import ClientLogos from "../clientLogo/ClientLogos";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation speed
      once: false, // animation হবে একবারই
    });
  }, []);

  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
      <ClientLogos></ClientLogos>
    </div>
  );
};

export default Home;
