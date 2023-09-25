"use client";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

import LeftCirlceArrow from "@components/assets/svg/leftCirlceArrow";
import SectionContainer from "../SectionContainer";
import RightCircleArrow from "@components/assets/svg/rightCircleArrow";
import { useCallback, useRef } from "react";
import PartnerCard from "@components/cards/PartnerCard";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const PartnersSection = () => {
  const sliderRef = useRef<SwiperRef | null>(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <motion.section
      variants={defaultVariant({})}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      aria-label="Partners"
      className="w-full bg-white py-20"
    >
      <SectionContainer>
        <div className="mx-auto flex flex-col items-center space-y-4">
          <h2 className="text_variant_h2 text-center">Some of our partners</h2>
          <p className="text_small_body_p w-[60%] text-center">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitid dignissim
            ipsum arcu imperdiet pellentesque.
          </p>
        </div>

        <motion.div
          variants={defaultVariant({ delay: 0.6 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="mt-20 flex w-full items-center justify-between space-x-4"
        >
          <div onClick={handlePrev} className="cursor-pointer">
            <LeftCirlceArrow />
          </div>
          <div className="w-[85%]">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              ref={sliderRef}
              slidesPerGroup={1}
              loop={true}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1000: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              <div>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PartnerCard />
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
          <div onClick={handleNext} className="cursor-pointer">
            <RightCircleArrow />
          </div>
        </motion.div>
      </SectionContainer>
    </motion.section>
  );
};

export default PartnersSection;
