const SelectCategory = () => {
  return (
    <section className="p-8">
      <h3 className="text_variant_h3 text-center">
        What category do you fall under?
      </h3>

      <div className="mt-8 flex flex-col space-y-4">
        <div className="flex w-full cursor-pointer items-center space-x-2 rounded-[10px] border-[.8px] border-light-grey p-3 transition-all duration-200 hover:border-primary">
          <div className="aspect-square w-10 rounded-full bg-[#FFF8D9]" />
          <div className="flex flex-col space-y-0">
            <h4 className="text_large_body_r text-[1rem] font-[600]">Widow</h4>
            <p className="text_small_body_r">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
        <div className="flex w-full cursor-pointer items-center space-x-2 rounded-[10px] border-[.8px] border-light-grey p-3 transition-all duration-200 hover:border-primary">
          <div className="aspect-square w-10 rounded-full bg-[#FFF8D9]" />
          <div className="flex flex-col space-y-0">
            <h4 className="text_large_body_r text-[1rem] font-[600]">
              Missionary
            </h4>
            <p className="text_small_body_r">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectCategory;
