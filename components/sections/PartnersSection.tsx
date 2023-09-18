"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import LeftCirlceArrow from "@components/assets/svg/leftCirlceArrow";
import SectionContainer from "./SectionContainer";
import RightCircleArrow from "@components/assets/svg/rightCircleArrow";
import Image from "next/image";

const PartnersSection = () => {
  return (
    <section aria-label="Partners" className="w-full bg-white py-20">
      <SectionContainer>
        <div className="mx-auto flex flex-col items-center space-y-4">
          <h2 className="text_variant_h2 text-center">Some of our partners</h2>
          <p className="text_small_body_p w-[60%] text-center">
            Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu
            imperdiet pellentesque. Urna eros interdum est sollicitid dignissim
            ipsum arcu imperdiet pellentesque.
          </p>
        </div>

        <div className="mt-20 flex w-full items-center justify-between space-x-4">
          <LeftCirlceArrow />
          <div className=" w-[85%]">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              slidesPerGroup={1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Pagination]}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                1000: {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }}
              navigation={true}
            >
              <div>
                <SwiperSlide>
                  <div className="flex w-full flex-col items-center space-y-6">
                    <div className="relative aspect-square w-full overflow-hidden rounded-[7px]">
                      <Image
                        src="/assets/images/partner.png"
                        alt="Partner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <h4 className="text_medium_header">John Doe</h4>
                      <span className="text_small_body_p text-center uppercase">
                        CEO, NAME OF COMPANY
                      </span>
                    </div>

                    <p className="text_small_body_p text-center">
                      Lorem ipsum dolor sit amet consectetur. Ante gravida
                      pellentesque vulputate risus pellentesque dui natoque
                      tellus. In tellus ultricies consectetur cursus in. Odio
                      nisi imperdiet in faucibus sit morbi consequat quam id.
                      Eget aliquam dignissim auctor placerat arcu. Tellus arcu
                      consectetur quis risus.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex w-full flex-col items-center space-y-6">
                    <div className="relative aspect-square w-full overflow-hidden rounded-[7px]">
                      <Image
                        src="/assets/images/partner.png"
                        alt="Partner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <h4 className="text_medium_header">John Doe</h4>
                      <span className="text_small_body_p text-center uppercase">
                        CEO, NAME OF COMPANY
                      </span>
                    </div>

                    <p className="text_small_body_p text-center">
                      Lorem ipsum dolor sit amet consectetur. Ante gravida
                      pellentesque vulputate risus pellentesque dui natoque
                      tellus. In tellus ultricies consectetur cursus in. Odio
                      nisi imperdiet in faucibus sit morbi consequat quam id.
                      Eget aliquam dignissim auctor placerat arcu. Tellus arcu
                      consectetur quis risus.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex w-full flex-col items-center space-y-6">
                    <div className="relative aspect-square w-full overflow-hidden rounded-[7px]">
                      <Image
                        src="/assets/images/partner.png"
                        alt="Partner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <h4 className="text_medium_header">John Doe</h4>
                      <span className="text_small_body_p text-center uppercase">
                        CEO, NAME OF COMPANY
                      </span>
                    </div>

                    <p className="text_small_body_p text-center">
                      Lorem ipsum dolor sit amet consectetur. Ante gravida
                      pellentesque vulputate risus pellentesque dui natoque
                      tellus. In tellus ultricies consectetur cursus in. Odio
                      nisi imperdiet in faucibus sit morbi consequat quam id.
                      Eget aliquam dignissim auctor placerat arcu. Tellus arcu
                      consectetur quis risus.
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="flex w-full flex-col items-center space-y-6">
                    <div className="relative aspect-square w-full overflow-hidden rounded-[7px]">
                      <Image
                        src="/assets/images/partner.png"
                        alt="Partner"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <h4 className="text_medium_header">John Doe</h4>
                      <span className="text_small_body_p text-center uppercase">
                        CEO, NAME OF COMPANY
                      </span>
                    </div>

                    <p className="text_small_body_p text-center">
                      Lorem ipsum dolor sit amet consectetur. Ante gravida
                      pellentesque vulputate risus pellentesque dui natoque
                      tellus. In tellus ultricies consectetur cursus in. Odio
                      nisi imperdiet in faucibus sit morbi consequat quam id.
                      Eget aliquam dignissim auctor placerat arcu. Tellus arcu
                      consectetur quis risus.
                    </p>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
          <RightCircleArrow />
        </div>
      </SectionContainer>
    </section>
  );
};

export default PartnersSection;
