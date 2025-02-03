import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardCeritaAksi from "../components/CardCeritaAksi";




export default function Carousel({children}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows:false,
    customPaging: i => (
      <div className={`w-2 h-2 mx-1 mt-4 rounded-full bg-gray-300/70 transition-all duration-300 ease-in-out`} />
    ),
     dotsClass: "slick-dots custom-dots",
   
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
}
