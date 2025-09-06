import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ServicesSection from "../../service/ServicesSection";
import Banner from "../Banner/Banner";
import Benefits from "../benifits/Benefits";
import ClientLogos from "../clientLogo/ClientLogos";
import Marchent from "../marchent/Marchent";

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  return (
    <div>
      <Banner></Banner>
      <ServicesSection></ServicesSection>
      <ClientLogos></ClientLogos>
      <Benefits></Benefits> 
      <Marchent></Marchent>
    </div>
  );
};

export default Home;
