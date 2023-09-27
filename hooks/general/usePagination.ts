import { useState } from "react";

const usePagination = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 6,
    total: 6,
  });

  const handlePrevious = () => {
    setPagination((prev) => ({
      ...prev,
      current: prev.current - 1,
    }));
  };

  const handleNext = () => {
    setPagination((prev) => ({
      ...prev,
      current: prev.current + 1,
    }));
  };

  return {
    pagination,
    setPagination,
    handlePrevious,
    handleNext,
  };
};

export default usePagination;
