import SectionContainer from "@components/sections/SectionContainer";
import Target from "@components/assets/svg/Target";
import Vision from "@components/assets/svg/Vision";
import Lens from "@components/assets/svg/Lens";
import HeartHand from "@components/assets/svg/HeartHand";
import Receipt from "@components/assets/svg/Receipt";
import Image from "next/image";
import ImageCarouselSection from "@components/sections/ImageCarouselSection";
import PartnersSection from "@components/sections/PartnersSection";
// Import Swiper styles
import "swiper/css";
const Aboutpage = () => {
  return (
    <div className="safearea-top">
      <SectionContainer>
        <div className="flex flex-col space-y-4">
          <h2 className="text_variant_h2">
            The Kingdom Investment Platform. <br /> Perfectly positioned to lend
            a helping hand.
          </h2>
          <p className="text_variant_caption">
            Lorem ipsum dolor sit amet consectetur. Sed ut venenatis id lectus.
            Pretium quam sit eu senectus ullamcorper dui nullam. Fermentum massa
            semper facilisis elementum amet aenean. Facilisis scelerisque nulla
            non volutpat mi dolor. Facilisis massa nunc cursus porta porta arcu
            in. Nec consectetur nunc etiam nulla leo sit magna. Ultrices
            tristique est nunc.
          </p>
        </div>
      </SectionContainer>

      <div className="my-20 w-full">
        <ImageCarouselSection />
      </div>
      <SectionContainer>
        <section
          aria-label="Vision and Mission"
          className="grid grid-cols-2 gap-8"
        >
          <div className="w-full rounded-[10px] bg-white px-8 py-8">
            <Target />
            <h3 className="text_small_header mt-10">Our Mission</h3>
            <p className="text_regular_body_p mt-2">
              Lorem ipsum dolor sit amet consectetur. Hendrerit diam tempus ac
              sit tellus. Pellentesque odio lorem ut metus viverra sem. Rhoncus
              vulputate sapien ut egestas porttitor egestas urna tempus libero.
              Est suspendisse in dictum tellus faucibus. A diamnulla cras non
              erat elementum. Tincidunt convallis eu ac aliquameu.
            </p>
          </div>

          <div className="w-full rounded-[10px] bg-white px-8 py-8">
            <Vision />
            <h3 className="text_small_header mt-10">Our Vision</h3>
            <p className="text_regular_body_p mt-2">
              Lorem ipsum dolor sit amet consectetur. Hendrerit diam tempus ac
              sit tellus. Pellentesque odio lorem ut metus viverra sem. Rhoncus
              vulputate sapien ut egestas porttitor egestas urna tempus libero.
              Est suspendisse in dictum tellus faucibus. A diamnulla cras non
              erat elementum. Tincidunt convallis eu ac aliquameu.
            </p>
          </div>
        </section>

        <section className="mt-20 flex w-full items-center justify-between">
          <div className="flex w-[40%] flex-col space-y-8">
            <h2 className="text_variant_h2">
              Make kingdom investments in just a few minutes.
            </h2>

            <div className="flex flex-col space-y-8">
              <div className="flex space-x-4">
                <Lens />
                <div className="flex flex-col space-y-2">
                  <h3 className="text_small_header">
                    Explore projects and ministries
                  </h3>
                  <p className="text_small_body_p">
                    Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                    arcu imperdiet pellentesque. Urna eros interdum est
                    sollicitid dignissim ipsum arcu imperdiet pellentesque.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <HeartHand />
                <div className="flex flex-col space-y-2">
                  <h3 className="text_small_header">Make a donation</h3>
                  <p className="text_small_body_p">
                    Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                    arcu imperdiet pellentesque. Urna eros interdum est
                    sollicitid dignissim ipsum arcu imperdiet pellentesque.
                  </p>
                </div>
              </div>
              <div className="flex space-x-4">
                <Receipt />
                <div className="flex flex-col space-y-2">
                  <h3 className="text_small_header">Get audit reports</h3>
                  <p className="text_small_body_p">
                    Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                    arcu imperdiet pellentesque. Urna eros interdum est
                    sollicitid dignissim ipsum arcu imperdiet pellentesque.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative h-[90vh] w-[55%]">
            <Image
              src="/assets/images/coin_tree_jar.png"
              alt="Image of a jar with a tree and coins inside"
              fill
              className="object-contain"
            />
          </div>
        </section>
      </SectionContainer>

      <PartnersSection />
    </div>
  );
};

export default Aboutpage;
