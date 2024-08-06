"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { useGetSingleRegistryQuery } from "services/admin";
import { AdminOrphanageHistory } from "services/admin/typings";
import { saveAs } from "file-saver";
import { formatString } from "@lib/functions";

interface Props {
  id: string;
}

const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-4 w-full rounded-[0.625rem] bg-white p-6">
      {children}
    </div>
  );
};

const OrphanageComp = ({ id }: Props) => {
  const { data, isLoading } = useGetSingleRegistryQuery({
    registry_id: id,
    type: "orphanages",
  });
  const orphanage = data?.data as AdminOrphanageHistory;

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!orphanage) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No orphanage found"
        desc="We could not find a widow with that id"
      />
    );
  }

  // eslint-disable-next-line no-unused-vars
  const { id: _, name, cac_document, ...rest } = orphanage;

  const handleClick = () => {
    saveAs(cac_document, `${name}_cac_document`);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <Link href="/admin/registry" className="absolute left-0 top-0">
        <Button variant="link" className="space-x-2 text-[#242424]">
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
      </Link>
      <h2 className="mb-10 font-body text-[1.5rem] font-[600] capitalize">
        {name}
      </h2>
      <Wrapper>
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-4">
          {Object.keys(rest).map((detail, i) => {
            const value = rest[detail];
            return (
              <div className="space-y-1" key={String(i)}>
                <Label>{formatString(detail)}</Label>
                <Input disabled value={value} />
              </div>
            );
          })}
          <div className="space-y-1">
            <Label>CAC Document</Label>
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/icons/imageplaceholder.svg"
                alt="CAC Image"
                width={32}
                height={32}
              />
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Label className="w-fit max-w-[200px] truncate font-[500] lowercase ">
                    {name?.split(" ").join("_")}_cac
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Label
                    className="cursor-pointer leading-[1rem] text-accent hover:underline"
                    onClick={handleClick}
                  >
                    Download
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const Orphanage = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <OrphanageComp id={id} />
    </NoSSRWrapper>
  );
};

export default Orphanage;
