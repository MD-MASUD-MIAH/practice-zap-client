import "react-responsive-carousel/lib/styles/carousel.min.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import banner1 from "../../../../assets/banner/banner1.png";
import banner2 from "../../../../assets/banner/banner2.png";
import banner3 from "../../../../assets/banner/banner3.png";
const Banner = () => {
  const settings = {
    infinite: true, // 🔑 endless loop
    autoplay: true, // auto slide
    autoplaySpeed: 2000, // প্রতি ২ সেকেন্ডে পরিবর্তন
    // super smooth effect
    arrows: false,
    dots: false,
  };
  return (
    <div className="w-11/12 mx-auto">
      <Slider {...settings}>
        <div>
          <img className="w-full" src={banner1} alt="Image 1" />
        </div>
        <div>
          <img className="w-full" src={banner2} alt="Image 2" />
        </div>
        <div>
          <img className="w-full" src={banner3} alt="Image 3" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
