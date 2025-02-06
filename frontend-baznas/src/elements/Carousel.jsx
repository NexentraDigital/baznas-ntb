import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";




export default function Carousel({children}) {


  const [slidesToShow, setSlidesToShow] = useState(1);
  const [arrows, setarrows] = useState(false)
 

  // Deteksi ukuran layar dan ubah slidesToShow
  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3); 
        setarrows(true)
      }else if(window.innerWidth >= 768 && window.innerWidth <= 1023){
        setSlidesToShow(2);
        setarrows(true)
      } else {
        setSlidesToShow(1);
        setarrows(false) 
      }
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    arrows:arrows,
    customPaging: i => (
      <div className={`w-2 h-2 mx-1 mt-4 rounded-full bg-gray-300/70 transition-all duration-300 ease-in-out`} />
    ),
     dotsClass: "slick-dots custom-dots",
   
  };

  return (
    <div className="relative w-full max-w-full  md:max-w-2xl lg:max-w-5xl mx-auto">
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  );
}
