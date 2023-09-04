import FrameIcon from "@components/assets/icons/Frame";
import { Typography } from "antd";
import { useRouter } from "next/navigation";
import { Dispatch } from "react";

const { Title, Paragraph } = Typography;

const SelectCategory = ({
  setCurrent,
  current,
}: {
  setCurrent: Dispatch<React.SetStateAction<number>>;
  current: number;
}) => {
  const router = useRouter();
  const nextHandler = (category: string) => {
    setCurrent(current + 1);
    router.push(`join-registry?category=${category}`);
  };

  return (
    <main className="max-w-[1440px] text-start tablet:px-2">
      <section className="mx-auto laptop:max-w-lg">
        <Title
          level={2}
          className="my-4 font-title text-[26px] leading-[29.75px] tablet:my-8 laptop:text-[35px] laptop:leading-[40px]"
        >
          What category do you fall under?
        </Title>
        <div
          className=" mt-4 flex h-auto w-full cursor-pointer items-center gap-4 rounded border p-2 hover:bg-slate-100"
          onClick={() => nextHandler("widow")}
        >
          <FrameIcon />
          <div className="flex-col items-center gap-2 text-start">
            <Title level={5} className="mb-0 font-body text-sm font-bold">
              Widow
            </Title>
            <Paragraph className="mb-0 font-body text-body-2">
              Lorem ipsum dolor sit amet consectetur.
            </Paragraph>
          </div>
        </div>
        <div
          className=" mt-4 flex h-auto w-full cursor-pointer items-center gap-4 rounded border p-2 hover:bg-slate-100"
          onClick={() => nextHandler("missionary")}
        >
          <FrameIcon />
          <div className="flex-col items-center gap-2 text-start">
            <Title level={5} className="mb-0 font-body text-sm font-bold">
              Missionary
            </Title>
            <Paragraph className="mb-0 font-body text-body-2">
              Lorem ipsum dolor sit amet consectetur.
            </Paragraph>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SelectCategory;
