"use client";
import EmptySpeaker from "@components/assets/svg/emptySpeaker";
import EmptyState from "@components/shared/EmptyState";
import Loader from "@components/shared/Loader";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { formatString } from "@lib/functions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { useGetSingleRegistryQuery } from "services/admin";
import { AdminMissionHistory } from "services/admin/typings";

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

const MissionaryComp = ({ id }: Props) => {
  const { data, isLoading } = useGetSingleRegistryQuery({
    registry_id: id,
    type: "missionaries",
  });
  const missionary = data?.data as AdminMissionHistory;

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!missionary) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No missionary found"
        desc="We could not find a widow with that id"
      />
    );
  }

  // eslint-disable-next-line no-unused-vars
  const { id: _, benefactor_name, ...rest } = missionary;

  return (
    <div className="relative flex w-full flex-col items-center">
      <Link href="/admin/registry" className="absolute left-0 top-0">
        <Button variant="link" className="space-x-2 text-[#242424]">
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
      </Link>
      <h2 className="mb-10 font-body text-[1.5rem] font-[600] capitalize">
        {benefactor_name}
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
        </div>
      </Wrapper>
    </div>
  );
};

const Missionary = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <MissionaryComp id={id} />
    </NoSSRWrapper>
  );
};

export default Missionary;
