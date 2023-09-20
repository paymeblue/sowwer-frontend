import Image from "next/image";

const PartnerCard = () => {
  return (
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

      <p className="text_small_body_p text-center ">
        Lorem ipsum dolor sit amet consectetur. Ante gravida pellentesque
        vulputate risus pellentesque dui natoque tellus. In tellus ultricies
        consectetur cursus in. Odio nisi imperdiet in faucibus sit morbi
        consequat quam id. Eget aliquam dignissim auctor placerat arcu. Tellus
        arcu consectetur quis risus.
      </p>
    </div>
  );
};

export default PartnerCard;
