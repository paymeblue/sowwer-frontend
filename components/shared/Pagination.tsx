import { Button } from "@components/ui/button";
import { cn } from "@lib/cn";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HTMLAttributes } from "react";

interface Props {
  handlePrevious: () => void;
  hasPrevious: boolean;
  handleNext: () => void;
  hasNext: boolean;
  containerClassname?: HTMLAttributes<HTMLDivElement>["className"];
}

const Pagination = ({
  handleNext,
  handlePrevious,
  hasNext = false,
  hasPrevious = false,
  containerClassname,
}: Props) => {
  if (!hasNext && !hasPrevious) return null;
  return (
    <div className={cn("mt-10 flex items-center gap-x-10", containerClassname)}>
      <Button
        variant="link"
        disabled={!hasPrevious}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          handlePrevious();
        }}
        className="space-x-2 px-0 text-body-2"
      >
        <ArrowLeft size={20} /> <span>Previous</span>
      </Button>
      <Button
        variant="link"
        disabled={!hasNext}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          setTimeout(() => {
            handleNext();
          }, 1000);
        }}
        className="space-x-2 px-0 text-body-2"
      >
        <span>Next</span> <ArrowRight size={20} />
      </Button>
    </div>
  );
};

export default Pagination;
