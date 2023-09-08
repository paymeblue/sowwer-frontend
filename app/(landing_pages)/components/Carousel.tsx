import { Carousel } from "antd";
import Image from "next/image";
import childrenLearning from "public/assets/images/children_learning.png";
import happyWoman from "public/assets/images/happy_woman.png";
import happyWomanAndChild from "public/assets/images/happy_woman_and_child.png";
import orphan from "public/assets/images/orphan.png";
import unitedHands from "public/assets/images/united_hands_plain.png";
import womanBusy from "public/assets/images/woman_busy.png";
import React, { Fragment } from "react";

const cardImages = [
  womanBusy,
  orphan,
  happyWoman,
  childrenLearning,
  happyWomanAndChild,
  unitedHands,
];

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

const CarouselImages: React.FC = () => (
  <Fragment>
    <div className="mx-0 mb-0 mt-3 p-0 tablet:my-6">
      <Carousel {...settings}>
        {cardImages.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt="carousel images"
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  </Fragment>
);

export default CarouselImages;
