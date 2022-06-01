import React from "react";
import { Button } from "react-bootstrap";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Review = ({ rating, review }) => {
  return (
    <>
      <p style={{ display: "inline", marginRight: "30px" }}>
        {rating >= 1 ? <BsStarFill /> : rating >= 0.5 ? <BsStarHalf /> : <BsStar />}
        {rating >= 2 ? <BsStarFill /> : rating >= 1.5 ? <BsStarHalf /> : <BsStar />}
        {rating >= 3 ? <BsStarFill /> : rating >= 2.5 ? <BsStarHalf /> : <BsStar />}
        {rating >= 4 ? <BsStarFill /> : rating >= 3.5 ? <BsStarHalf /> : <BsStar />}
        {rating >= 5 ? <BsStarFill /> : rating >= 4.5 ? <BsStarHalf /> : <BsStar />}
      </p>

      {review > 0 ? <Button variant="success">{review}</Button> : <Button variant="danger">0</Button>}
    </>
  );
};

export default Review;