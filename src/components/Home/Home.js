import React from "react";
import { Carousel } from "flowbite-react";

const gallery = [
  {
    src: "/images/home.jpg",
    name: "Wooden Artifacts ",
    description: "Explore cultural crafts and arts",
  },
  {
    src: "/images/home2.jpg",
    name: "Wooden Artifacts ",
    description: "Explore cultural crafts and arts",
  },
  {
    src: "/images/home.jpg",
    name: "Wooden Artifacts ",
    description: "Explore cultural crafts and arts",
  },
];
const Home = () => {
  return (
    <>
      <div className="bg-light-grey ">
        <div className=" px-4 lg:px-14 max-w-screen-2xl mx-auto max-h-screen h-screen">
          <Carousel className="w-full mx-auto">
            {gallery.map((item) => (
              <div className=" my-2 md:my-8 lg:my-18  md:py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12 mb-10 ">
                <div className="     lg:w-3/12 sm:h-full sm:w-3/12 xl:w-3/12 2xl:w-3/12 md:w-3/12 w-32 h-40 lg:mb-20">
                  <img
                    className=" h-full w-full object-cover"
                    src={item.src}
                    alt=""
                  />
                </div>
                <div className="md:w-3/4 sm:w-full sm:pb-20">
                  <h1 className="text-2xl font-semibold md:mb-4 mb:3 md:w-3/4 leading-snug lg:text-5xl">
                    NepalCrafted{" "}
                    <span className="text-text-orange">{item.name}</span>
                  </h1>
                  <p className="text-base  mb-8">{item.description}</p>
                  <button className="px-7 py-2 bg-button-orange text-white rounded-md hover:bg-orange-700 focus:outline-none">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Home;
