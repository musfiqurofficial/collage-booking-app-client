/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-8">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="p-4">
            <div className="bg-gray-50 shadow rounded-lg p-4">
              <div className="flex justify-between items-center">
                <p className="text-md text-center mb-4">{review.collegeName}</p>
                <p className="text-yellow-500 text-center">
                  {review.rating} ⭐
                </p>
              </div>
              <p className="text-gray-600 pl-3 text-sm">
                {review.review || "No review available."}
              </p>
              <div className="flex items-start mt-4 gap-2">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={
                    review.image ||
                    "https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  }
                  alt="Review"
                />
                <h3 className="text-sm mt-2 capitalize">
                  {review.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
