import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  desc: string;
}

const SettingsTabContentWrapper = ({ children, title, desc }: Props) => {
  return (
    <section className="flex min-h-[50vh] w-full items-start justify-between rounded-[10px] bg-white p-6">
      <div className="flex flex-col">
        <h4 className="text_medium_body_p font-[600]">{title}</h4>
        <p className="text_regular_body_p ">{desc}</p>
      </div>

      <div className="w-[40%]">{children}</div>
    </section>
  );
};

export default SettingsTabContentWrapper;
