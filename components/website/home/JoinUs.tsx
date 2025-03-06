import { Button } from "@components/ui/button";
import Image from "next/image";
import img from "public/images/img-9.png";
import { Heart2 } from "react-iconly";
const JoinUs = () => {
  return (
    <div className="relative">
      <Image
        src={img}
        alt="love girl"
        placeholder="blur"
        width={1512}
        height={674}
        className="w-full  object-contain"
      />
      <div className="absolute right-40 top-40 flex w-full max-w-[500px] flex-col gap-6 rounded-2xl bg-white p-8 shadow-double">
        <h5 className="text-xs font-medium leading-6 text-primary">
          GET INVOLVED
        </h5>
        <p className="text-[40px] font-medium leading-[42px] text-black">
          Join Us to Be the Light in Someone&apos;s Story
        </p>
        <Button className="w-max gap-2 border-input font-montreal text-black">
          <span>
            <Heart2 set="bold" size={19} />
          </span>
          <span>Donate now</span>
        </Button>
      </div>
    </div>
  );
};

export default JoinUs;
