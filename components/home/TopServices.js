import React from "react";
import Slider from "react-slick";
import ServiceShow from "../ServiceShow";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-2 bg-gray-700 text-white rounded-full p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      <MdChevronRight className="w-6 h-6" />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 left-2 bg-gray-700 text-white rounded-full p-2 cursor-pointer z-10"
      onClick={onClick}
    >
      <MdChevronLeft className="w-6 h-6" />
    </div>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TopServices = ({ topServices }) => {
  return (
    <div
      style={{
        backgroundImage: "url(/image/shape-3-2.png)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full flex flex-col justify-center items-center py-4 px-4">
        <h1 className="font-julius lg:text-5xl md:text-4xl sm:text-3xl text-3xl text-center text-gray-700">
          FOR ALL YOUR NEEDS WE PROVIDES
        </h1>
        <h2 className="font-cookie w-full md:w-auto flex justify-center md:justify-start lg:text-6xl md:text-6xl sm:text-5xl text-5xl text-center text-blue-500 ">
          Best Services
        </h2>
      </div>
      <div className="container mx-auto py-8">
        {topServices.length <= 3 ? (
          topServices.map((service) => (
            <div key={service._id} className="px-2">
              <ServiceShow service={service} />
            </div>
          ))
        ) : (
          <Slider {...settings}>
            {topServices.map((service) => (
              <div key={service._id} className="px-2">
                <ServiceShow service={service} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default TopServices;
