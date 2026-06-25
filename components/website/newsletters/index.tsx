"use client";
import { Button } from "@components/ui/button";
import { DownloadIcon } from "@components/assets/icons";

const NewsLetterPage = () => {
  const newsletters = [
    {
      title: "Volume 1, Issue 1",
      date: "June 2025",
      link: "/assets/newsletters/volume-1-issue-1.pdf",
    },
    {
      title: "Volume 1, Issue 2",
      date: "September 2025",
      link: "/assets/newsletters/volume-1-issue-2.pdf",
    },
    {
      title: "Volume 1, Issue 3",
      date: "December 2025",
      link: "/assets/newsletters/Soower Newsletter Vol 1 Issue 3 Dec 2025.pdf",
    },
    {
      title: "Volume 2, Issue 1",
      date: "March 2026",
      link: "/assets/newsletters/SOOWER Newsletter Vol 2 Issue 1 (March 2026).pdf",
    },
  ];

  const handleDownload = (link: string, filename: string) => {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  return (
    <section className="relative mx-auto flex max-w-[1200px] flex-col items-center justify-center px-4 py-12 max-lg:mt-12 sm:px-8 sm:py-20 md:px-12 md:py-28 lg:px-20 lg:py-40">
      <div className="absolute left-0 top-[300px] h-[108px] w-[80%] rotate-[7.66deg] bg-[#B854FF] opacity-60 blur-[450px] md:left-14 md:top-[400.58px] md:w-[522.26px] md:opacity-100" />
      <div className="mx-auto w-full max-w-[1058px] space-y-0 sm:space-y-5">
        <p className="text-center text-sm font-medium text-[#75808A] max-lg:mb-4">
          SOOWER NEWSLETTERS
        </p>
        <h1 className="text-center font-aeonik text-2xl font-medium leading-tight tracking-[-0.12px] text-black sm:text-3xl md:text-4xl md:leading-[48px] lg:text-[42px]">
          Stories That Matter, Impact You Can Feel.
        </h1>
        <p className="text-center font-montreal text-base leading-normal text-body-2 sm:text-lg sm:leading-[26px]">
          Explore our collection of newsletters — stories, updates, and impact
          reports delivered straight from the heart of our mission. Download
          past editions, discover the work we’re doing, and see how your support
          continues to make a difference.
        </p>
      </div>
      <div className="z-[50] mt-16 w-full rounded-2xl bg-white p-8 shadow-[0px_4px_20px_0px_#0000000F]">
        {newsletters?.map((nw) => {
          return (
            <div
              key={nw.title}
              className="flex w-full flex-col border-b border-[#DADADA] py-6 max-lg:gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex flex-col">
                <h3 className="font-medium text-black">{nw.title}</h3>
                <p className="text-[#555555]">{nw.date}</p>
              </div>

              <Button
                className="space-x-2"
                onClick={() =>
                  handleDownload(
                    nw.link,
                    `${nw.title.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`
                  )
                }
              >
                <DownloadIcon stroke="#000" />
                <span className="text-[#000]">Download</span>
              </Button>
            </div>
          );
        })}
      </div>
      <div className="absolute right-0 top-[450px] h-[180.11px] w-[80%] rotate-[26.72deg] bg-[#34E1FF] opacity-60 blur-[606.7px] md:left-[1154px] md:top-[580.57px] md:w-[310.39px] md:opacity-100" />
    </section>
  );
};

export default NewsLetterPage;
