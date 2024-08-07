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
import moment from "moment";
import Link from "next/link";
import { ReactNode } from "react";
import { useGetSingleCouncilQuery } from "services/admin";

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

const CouncilComp = ({ id }: Props) => {
  const { data, isLoading } = useGetSingleCouncilQuery({
    id,
  });
  const council = data?.data;

  if (isLoading) {
    return <Loader className="h-[50vh]" />;
  }

  if (!council) {
    return (
      <EmptyState
        image={<EmptySpeaker />}
        title="No council found"
        desc="We could not find a council with that id"
      />
    );
  }

  // eslint-disable-next-line no-unused-vars
  const { id: _, name, ...rest } = council;

  return (
    <div className="relative flex w-full flex-col items-center">
      <Link href="/admin/council" className="absolute left-0 top-0">
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
            let value = rest[detail];
            if (detail === "created_at") {
              value = moment(value).utc().format("Do MMMM YYYY; h:mm:ss a");
            }
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

const Council = ({ id }: Props) => {
  return (
    <NoSSRWrapper>
      <CouncilComp id={id} />
    </NoSSRWrapper>
  );
};

export default Council;
