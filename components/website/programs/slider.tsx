import { QuoteIcon } from "@components/assets/icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

type Props = { data: { key: string; testimonial: string; author: string }[] };

const Slider = ({ data }: Props) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.key}>
            {/* @ts-expect-error */}
            {({ scrollNext, scrollPrev, canScrollNext, canScrollPrev }) => (
              <div className="mx-auto flex w-full max-w-[1250px] items-start gap-7 rounded-3xl bg-[#F7F8FA] p-12">
                <QuoteIcon />
                <div className="mt-12 w-full max-w-[57.75rem] space-y-6">
                  <p className="font-aeonik text-[32px] leading-[45px] text-black">
                    {item.testimonial}
                  </p>
                  <p className="font-montreal text-[20px] leading-6 text-body-1">
                    {item.author}
                  </p>
                  <div className="flex items-center gap-1 py-8">
                    <button
                      onClick={scrollPrev}
                      disabled={!canScrollPrev}
                      className={`transition-opacity ${
                        !canScrollPrev ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      <ArrowLeftCircle
                        color="black"
                        size={52}
                        strokeWidth={0.5}
                      />
                    </button>
                    <button
                      onClick={scrollNext}
                      disabled={!canScrollNext}
                      className={`transition-opacity ${
                        !canScrollNext ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      <ArrowRightCircle
                        color="black"
                        size={52}
                        strokeWidth={0.5}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Slider;
