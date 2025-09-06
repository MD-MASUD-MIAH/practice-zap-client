import AOS from "aos";
import { useEffect } from "react";

const BenefitCard = ({ title, description, image }) => {
  useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
    });
  }, []);
  return (
    <div
      data-aos="flip-up"
      className="card w-full  bg-base-100 shadow-md  hover:shadow-lg transition-all"
    >
      <div className="card-body flex flex-col sm:flex-row items-start gap-4">
        <img src={image} alt={title} className="" />
        <div className="divider divider-horizontal hidden sm:flex my-0" />
        <div>
          <h3 className="card-title text-base-content  mb-2 text-2xl font-bold">
            {title}
          </h3>
          <p className=" text-xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
