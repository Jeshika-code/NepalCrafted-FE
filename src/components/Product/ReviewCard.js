import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../../src/images/profile.jpg";
const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    size: window.innerWidth < 600 ? 20 : 25,
    color: "rgba(20,20,20,0.1)",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <div className="flex-none shadow-md  hover:shadow-2xl rounded-md w-60 lg:w-80 flex  flex-col items-center p-2 m-2">
        <img className="w-20" src={profilePng} alt="User" />
        <p className="font-medium">{review.name}</p>
        <ReactStars {...options} />
        <span className="italic text-sm">{review.comment}</span>
      </div>
    </>
  );
};
export default ReviewCard;
