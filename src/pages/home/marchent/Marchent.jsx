import location from "../../../../assets//location-merchant.png";
import AOS from "aos";
import { useEffect } from "react";
const Marchent = () => {
 useEffect(() => {
    AOS.init({
      duration: 3000,
      once: false,
    });
  }, []);

  return (
    <div data-aos="zoom-in-left" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D]  py-20 text-white ">
      <div className="hero-content flex-col lg:flex-row-reverse w-11/12 mx-auto  ">
        <img src={location} className="max-w-lg rounded-lg " />
        <div>
          <h1 className="text-5xl font-bold">
            Merchant and Customer Satisfaction is Our First Priority!
          </h1>
          <p className="py-6">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>
          <button className="btn rounded-full  btn-primary text-black">
            Become a Merchant
          </button>
          <button className=" btn bg-[#03373D] text-white rounded-full  border border-primary ml-8">
            Earn with Profast Courier
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marchent;
