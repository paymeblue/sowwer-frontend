"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// import Swiper core and required modules
import Image, { StaticImageData } from "next/image";
import image1 from "public/assets/images/children_learning.png";
import image2 from "public/assets/images/happy_woman.png";
import image3 from "public/assets/images/happy_woman_and_child.png";
import image4 from "public/assets/images/orphan.png";
import image5 from "public/assets/images/united_hands_plain.png";
import image6 from "public/assets/images/woman_busy.png";

const SwiperImage = ({ image }: { image: StaticImageData }) => (
  <div className="">
    <Image
      src={image}
      width={1000}
      height={1000}
      quality={50}
      alt="Lunaroid images"
      placeholder="blur"
    />
  </div>
);

const ImageCarouselSection = () => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={5}
      slidesPerGroup={1}
      loop={true}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      }}
      navigation={false}
      speed={1000}
      effect="fade"
      className=""
    >
      <div>
        <SwiperSlide>
          <SwiperImage image={image1} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImage image={image2} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImage image={image3} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImage image={image4} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImage image={image5} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperImage image={image6} />
        </SwiperSlide>
      </div>
    </Swiper>
  );
};

export default ImageCarouselSection;
