"use client";
import React from "react";

const TestimonialCard = ({ name, img, desc, cust, rating }) => {
  function Rating({ stars }) {
    const fullStars = Math.floor(stars);
    const halfStar = stars % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-500">
            &#9733;
          </span> // Full star
        ))}
        {halfStar && <span className="text-yellow-500">&#9734;</span>}

        {[...Array(emptyStars)].map((_, i) => (
          <span key={i}>&#9734;</span> // Empty star
        ))}
      </div>
    );
  }
  return (
    <div className="bg-light-blue-500 p-6 rounded-lg text-center">
      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
        <img
          src={img}
          alt="Jessica Devis"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-sm text-white">{cust}</p>
      <p className="mt-4 text-white">"{desc}"</p>
      <div className="mt-4 flex justify-center">
        <Rating stars={rating} />
      </div>
    </div>
  );
};

export default TestimonialCard;
