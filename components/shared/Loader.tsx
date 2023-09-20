import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center text-primary">
      <Loader2 className="h-10 w-10 animate-spin" />
    </div>
  );
};

export default Loader;
