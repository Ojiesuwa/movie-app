import React from "react";
import "./StarReview-style.css";

function StarReview({ review }) {
  let array = [0, 1, 2, 3, 4];
  let indexedReview = review - 1;
  return (
    <div className="star-review">
      {array.map((index) => {
        return (
          <i
            className={`${
              index <= indexedReview ? "fa-solid" : "fa-regular"
            } fa-star`}
          ></i>
        );
      })}
    </div>
  );
}

export default StarReview;
