import React from "react";

import profilePng from "../../../src/images/profile.jpg";
import { Rating } from "@material-ui/lab";
const ReviewCard = ({ review }) => {
  const options = {
  
      value: review.rating,
      readOnly: true,
      precision: 0.5,
      size:"small"
  
  };

  return (
    <>
      <div className="flex-none shadow-md  hover:shadow-2xl rounded-md w-60 lg:w-80 flex  flex-col items-center p-2 m-2">
        <img className="w-20" src={profilePng} alt="User" />
        <p className="font-medium">{review.name}</p>
        <Rating {...options} />
        <span className="italic text-sm">{review.comment}</span>
      </div>
    </>
  );
};
export default ReviewCard;
