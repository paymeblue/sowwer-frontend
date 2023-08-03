import React, { Fragment } from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const data = [
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "1",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "2",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "3",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "4",
  },
  {
    header: "What type of ministries can I donate to on Soower?",
    body: "Lorem ipsum dolor sit amet consectetur. Faucibus risus risus arcu imperdiet pellentesque. Urna eros interdum est sollicitudin dignissim. Convallis iaculis blandit ultrices posuere. Lorem ipsum dolor sit amet consectetur. ",
    id: "5",
  },
];

const Accordion: React.FC = () => (
  <Fragment>
    <section className="px-2 pt-14">
      <Title
        level={3}
        className="mb-6 font-title text-[30px] leading-[34.32px] laptop:text-[50px] laptop:leading-[57px]"
      >
        Frequently asked questions
      </Title>
      <Collapse
        bordered={false}
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        accordion
      >
        {data.map((pane) => (
          <Panel
            header={
              <Title
                level={4}
                className="font-title text-[21px] leading-[24.02px] laptop:text-2xl laptop:leading-[27px]"
              >
                {pane.header}
              </Title>
            }
            key={pane.id}
            className="body-text-1 font-body text-[13px] leading-[23px] laptop:text-sm laptop:leading-[26px]"
          >
            {pane.body}
          </Panel>
        ))}
      </Collapse>
    </section>
  </Fragment>
);

export default Accordion;
