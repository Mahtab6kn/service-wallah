"use client";
import { Carousel } from "@material-tailwind/react";
import TestimonialCard from "./TestimonialCard";

export default function Testimonial() {
  return (
    <section className="bg-white text-black py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-500">
          <strong>Our Clients</strong>
        </h2>
        <p className="mt-4 text-gray-600">
          <strong>
            That&apos;s the main thing people are controlled by! Thoughts -
            their perception of themselves!
          </strong>
        </p>
      </div>
      <Carousel
        className="rounded-xl"
        autoplay={true}
        transition={{ duration: 1 }}
        loop={true}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full">
          <div>
            <TestimonialCard
              name="Manish Kr."
              img="/image/hero1.webp"
              cust="Verified Customer"
              desc="The connections you make at Web Summit are unparalleled, we met users all over the world."
              rating="3"
            />
          </div>
          <div className="hidden md:block">
            <TestimonialCard
              name="Manish Kr."
              img="/image/hero1.webp"
              cust="Verified Customer"
              desc="The connections you make at Web Summit are unparalleled, we met users all over the world."
              rating="1"
            />
          </div>
          <div className="hidden lg:block">
            <TestimonialCard
              name="Manish Kr."
              img="/image/hero1.webp"
              cust="Verified Customer"
              desc="The connections you make at Web Summit are unparalleled, we met users all over the world."
              rating="2"
            />{" "}
          </div>
        </div>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-full">
          <div>
            <TestimonialCard
              name="Manish Kr."
              img="/image/hero1.webp"
              cust="Verified Customer"
              desc="The connections you make at Web Summit are unparalleled, we met users all over the world."
              rating="3"
            />
          </div>
          <div className="hidden md:block">
            <TestimonialCard
              name="Manish Kr."
              img="/image/hero1.webp"
              cust="Verified Customer"
              desc="The connections you make at Web Summit are unparalleled, we met users all over the world."
              rating="1"
            />
          </div>
          <div className="hidden lg:block">
            <TestimonialCard
              name="Manish Kr."
              img="/image/hero1.webp"
              cust="Verified Customer"
              desc="The connections you make at Web Summit are unparalleled, we met users all over the world."
              rating="2"
            />{" "}
          </div>
        </div>
      </Carousel>
    </section>
  );
}
