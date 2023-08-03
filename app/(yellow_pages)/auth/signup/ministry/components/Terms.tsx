import { DonateIcon } from "@components/assets/icons";
import ResultComponent from "@shared/ResultComponent";
import { Checkbox, Form, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";

const items = [
  {
    id: "1",
    title: "section 1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. ",
  },
  {
    id: "2",
    title: "section 1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. ",
  },
  {
    id: "3",
    title: "section 1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. ",
  },
  {
    id: "4",
    title: "section 1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. ",
  },
  {
    id: "5",
    title: "section 1",
    content:
      "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. ",
  },
];

const Terms: FC<any> = ({ form }: { form: any }) => {
  const { Title, Paragraph } = Typography;
  const { Item } = Form;
  const nextScreen = useSearchParams();
  const [checkbox, setCheckbox] = useState(false);

  const changeHandler = (e: CheckboxChangeEvent) => {
    setCheckbox(e.target.checked);
  };
  return (
    <section className="mx-auto laptop:max-w-lg">
      {nextScreen.toString() === "step=terms" ? (
        <section className="text-start">
          <Title className="my-12 font-title text-[24px] text-body-1">
            Soower&apos;s Terms and Conditions
          </Title>
          {items.map((item) => (
            <Typography key={item.id} className="mt-4 ">
              <Title
                level={5}
                className="font-body text-sm uppercase text-body-1"
              >
                {item.title}
              </Title>
              <Paragraph className="font-body text-body-2">
                {item.content}
              </Paragraph>
            </Typography>
          ))}
          <Form
            form={form}
            name="tandc__register_form"
            layout="vertical"
            autoComplete="off"
          >
            <Item name="tandc" valuePropName="checked">
              <Checkbox
                className="font-body text-[13px] text-body-2 tablet:text-[15px]"
                value={checkbox}
                onChange={changeHandler}
              >
                I have read, and accept the Terms and Conditions
              </Checkbox>
            </Item>
          </Form>
        </section>
      ) : (
        nextScreen.toString() === "step=registration-complete" && (
          <ResultComponent
            title={
              <Title
                className="font-title text-[21.18px] leading-[24.23px] text-body-1 laptop:text-[35px] laptop:leading-[40px]"
                level={3}
              >
                We've received your application!
              </Title>
            }
            subTitle="Thank you for registering your ministry on Soower. Your
                application has been received and you'll be able to start
                creating projects and receiving donations once your details are
                verified. This should typically take 24-48 hours. In the
                meantime you can pro ceed to your dashboard to set up your
                remaining account details."
            icon={<DonateIcon />}
            btnLink="admin"
            btnText="Go to Dashboard"
            btnBg="accent"
            btnTextColor="white"
            showBtn
          />
        )
      )}
    </section>
  );
};

export default Terms;
