import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { useToast } from "@components/ui/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeft } from "react-iconly";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  submitForm: () => void;
}

const MinistryTermsAndConditions = ({ submitForm, setActiveStep }: Props) => {
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!checked) {
      console.log("here");
      toast({
        variant: "destructive",
        title: "Accept terms and conditions",
        description:
          "You need to accept our terms and conditions inorder to create a ministry account",
      });
    }
  };

  return (
    <section className="mt-10 p-8">
      <h2 className="text_small_header">Soower’s Terms and Conditions</h2>
      <div className="mt-8 flex flex-col space-y-8">
        {[1, 2, 3, 4, 5, 6, 7].map((_, i) => {
          return (
            <div className="flex flex-col space-y-2" key={"tac" + i}>
              <h3>SECTION 1</h3>
              <p className="text_small_body_p">
                Lorem ipsum dolor sit amet consectetur. Faucibus risus risus
                arcu imperdiet pellentesque. Urna eros interdum est sollicitudin
                dignissim. Convallis iaculis blandit ultrices posuere. Lorem
                ipsum dolor sit amet consectetur. Faucibus risus risus arcu
                imperdiet pellentesque.{" "}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Checkbox
          id="terms"
          className="border-[#BDBDBD]"
          checked={checked}
          onClick={() => setChecked((val) => !val)}
        />
        <label htmlFor="terms" className="text_small_body_r">
          I have read, and accept the Terms and Conditions
        </label>
      </div>
      <div className="mt-8 flex w-full items-center justify-between">
        <Button
          type="submit"
          variant="outline"
          className="space-x-2"
          onClick={() => setActiveStep((step) => step - 1)}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </Button>
        <Button
          variant="secondary"
          className="space-x-2"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default MinistryTermsAndConditions;
