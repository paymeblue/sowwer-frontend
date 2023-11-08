import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { useToast } from "@components/ui/use-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { ArrowLeft } from "react-iconly";

interface Props {
  setActiveStep: Dispatch<SetStateAction<number>>;
  submitForm: () => void;
  isLoading: boolean;
}

const MinistryTermsAndConditions = ({
  submitForm,
  setActiveStep,
  isLoading,
}: Props) => {
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!checked) {
      toast({
        variant: "destructive",
        title: "Accept terms and conditions",
        description:
          "You need to accept our terms and conditions inorder to create a ministry account",
      });
    } else {
      submitForm();
    }
  };

  return (
    <section className="mt-10 p-8">
      <h2 className="text_small_header">Soower’s Terms and Conditions</h2>
      <div className="mt-8 flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h3>ELIGIBILTY</h3>
          <p className="text_small_body_p">
            Only registered Christian ministries, churches, and nonprofit
            Christian organizations are eligible to create projects and receive
            donations on Soower.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3>PROJECT CREATION</h3>
          <p className="text_small_body_p">
            Ministries are responsible for providing accurate and transparent
            information about their projects, including the purpose, funding
            goals, and how donations will be utilized.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3>VERIFICATION</h3>
          <p className="text_small_body_p">
            Soower reserves the right to verify the legitimacy and compliance of
            the ministry with our eligibility criteria.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3>RESPONSIBILITY & TRANSPARENCY</h3>
          <p className="text_small_body_p">
            Ministries are solely responsible for managing their projects,
            ensuring that they comply with applicable laws and regulations.
            Ministries are encouraged to provide regular updates on project
            progress to donors and the Platform to maintain transparency.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3>TERMINATION</h3>
          <p className="text_small_body_p">
            Soower reserves the right to suspend or terminate the participation
            of any ministry on the Platform for any violation of these terms and
            conditions or for any other reason at our discretion.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3>PRIVACY</h3>
          <p className="text_small_body_p">
            We respect your privacy. Information collected is used only in
            accordance with our Privacy Policy.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3>CHANGES TO TERMS</h3>
          <p className="text_small_body_p">
            Soower may update these terms and conditions as necessary. Any
            changes will be communicated to ministries and donors.
          </p>
        </div>
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
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default MinistryTermsAndConditions;
