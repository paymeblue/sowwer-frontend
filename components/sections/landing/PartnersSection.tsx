"use client";
import { motion } from "framer-motion";

import SectionContainer from "../SectionContainer";
import PartnerCard from "@components/cards/PartnerCard";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";

const PartnersSection = () => {
  // const sliderRef = useRef<SwiperRef | null>(null);

  // const handlePrev = useCallback(() => {
  //   if (!sliderRef.current) return;
  //   sliderRef.current.swiper.slidePrev();
  // }, []);

  // const handleNext = useCallback(() => {
  //   if (!sliderRef.current) return;
  //   sliderRef.current.swiper.slideNext();
  // }, []);
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
          <p className="text_small_body_p w-full text-center lg:w-[60%]">
            Meet some of our passionate and dedicated partners who share our
            commitment to making a positive impact in the world.
          </p>
        </div>

        <motion.div
          variants={defaultVariant({ delay: 0.6 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="mt-20 flex w-full flex-col items-center justify-center max-lg:space-y-8 lg:flex-row lg:space-x-8"
        >
          <PartnerCard
            name="Jonathan Agwunobi"
            position="CO-FOUNDER"
            className="w-full lg:w-[30%]"
            imgUrl="/assets/images/johnathan.jpg"
          />
          <PartnerCard
            name="Tobenna Nwokike"
            position="CO-FOUNDER"
            className="w-full lg:w-[30%]"
            imgUrl="/assets/images/tobenna.png"
          />
        </motion.div>
        {/* <motion.div
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
                delay: 1500,
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
              speed={1000}
              effect="fade"
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
        </motion.div> */}
      </SectionContainer>
    </motion.section>
  );
};

export default PartnersSection;
