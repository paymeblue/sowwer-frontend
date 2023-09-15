import { Button } from "@components/ui/button";

const Hero = () => {
  return (
    <section className="flex min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-center font-title text-[4rem] leading-[4.6rem] text-black">
          Alone we can do so little; <br /> together we can do so much.
        </h1>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-center text-[14px] text-body-1">
            "In all things I have shown you that by working hard in this way we
            must help the weak and remember the words <br /> of the Lord Jesus,
            how He himself said it is more blessed to give than to receive."
          </p>
          <span className="text-center text-[13px] text-body-1">
            — Acts 20:35 (ESV)
          </span>
        </div>
        <Button>Make a Donation</Button>
      </div>
    </section>
  );
};

export default Hero;
