import { faStar as sfaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./component.css";

function RateBarProfile({ rating, setRating }) {
  const fontsize = 15;
  let ratingStars = [];

  if (rating === 1 || rating > 1) {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={faStar}
        fontSize={fontsize}
        key={1}
        onClick={() => setRating(1)}
      />,
    ];
  } else {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={sfaStar}
        fontSize={fontsize}
        key={1}
        onClick={() => setRating(1)}
      />,
    ];
  }
  if (rating === 2 || rating > 2) {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={faStar}
        fontSize={fontsize}
        key={2}
        onClick={() => setRating(2)}
      />,
    ];
  } else {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={sfaStar}
        fontSize={fontsize}
        key={2}
        onClick={() => setRating(2)}
      />,
    ];
  }
  if (rating === 3 || rating > 3) {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={faStar}
        fontSize={fontsize}
        key={3}
        onClick={() => setRating(3)}
      />,
    ];
  } else {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={sfaStar}
        fontSize={fontsize}
        key={3}
        onClick={() => setRating(3)}
      />,
    ];
  }
  if (rating === 4 || rating > 4) {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={faStar}
        fontSize={fontsize}
        key={4}
        onClick={() => setRating(4)}
      />,
    ];
  } else {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={sfaStar}
        fontSize={fontsize}
        key={4}
        onClick={() => setRating(4)}
      />,
    ];
  }
  if (rating === 5 || rating > 5) {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={faStar}
        fontSize={fontsize}
        key={5}
        onClick={() => setRating(5)}
      />,
    ];
  } else {
    ratingStars = [
      ...ratingStars,
      <FontAwesomeIcon
        icon={sfaStar}
        fontSize={fontsize}
        key={5}
        onClick={() => setRating(5)}
      />,
    ];
  }
  // console.log(rating);

  // console.log(ratingStars);
  return (
    <div className="flex justify-center items-center">
      <div className={"flex rate-yellow "}>
        {ratingStars.map((rate) => rate)}
      </div>
      <p className={"p-0 m-0  feedback-count-text-profile"}>5/{rating?.toFixed(1)}</p>
    </div>
  );
}

export default RateBarProfile;
