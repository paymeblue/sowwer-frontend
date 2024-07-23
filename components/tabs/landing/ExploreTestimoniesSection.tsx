"use client";

import Loader from "@components/shared/Loader";
import usePagination from "@hooks/general/usePagination";
import { DEFAULT_VIEWPORT, defaultVariant } from "lib/variants";
import { useGetTestimoniesQuery } from "services/testimonies";
import { motion } from "framer-motion";
import Pagination from "@components/shared/Pagination";
import TestimonyCard from "@components/cards/TestimonyCard";

const ExploreTestimoniesSection = () => {
  const { pagination, handleNext, handlePrevious } = usePagination();
  const { data, isLoading, isFetching } = useGetTestimoniesQuery({
    page: pagination.current,
    limit: pagination.pageSize,
  });
  return (
    <div className="mt-8 flex w-full flex-col items-center justify-center">
      {isLoading || isFetching ? (
        <Loader className="h-[50vh]" />
      ) : (
        <motion.div
          variants={defaultVariant({ delay: 0.3 })}
          initial="hidden"
          whileInView="visible"
          viewport={DEFAULT_VIEWPORT}
          className="mt-10 grid w-full grid-cols-1 gap-6 lg:grid-cols-3"
        >
          {data?.data.map((testimony) => {
            const {
              id,
              amount_raised,
              cover_photo,
              ministry_name,
              number_of_people_impacted,
              project_name,
              story,
              title,
            } = testimony;

            return (
              <TestimonyCard
                key={id}
                id={id}
                amountRaised={amount_raised}
                cover_photo={cover_photo}
                title={title}
                category="widows"
                description={story}
                featuredStat={{
                  metric: "widows impacted",
                  value: number_of_people_impacted,
                }}
                project={{
                  title: project_name,
                }}
                ministry={{
                  name: ministry_name,
                  id: "123",
                }}
              />
            );
          })}
        </motion.div>
      )}
      <Pagination
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        hasNext={data?.paginationInfo.hasNext || false}
        hasPrevious={data?.paginationInfo.hasPrevious || false}
      />
    </div>
  );
};

export default ExploreTestimoniesSection;
