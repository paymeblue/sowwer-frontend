"use client";
import DonationCard from "@components/cards/DonationCard";
import SectionContainer from "@components/sections/SectionContainer";
import { Button } from "@components/ui/button";
import { Progress } from "@components/ui/progress";
import Tag from "@components/ui/tag";
import { Link } from "lucide-react";
import { Heart2 } from "react-iconly";

const ProjectPage = () => {
  return (
    <SectionContainer>
      <div className="safearea-top mb-20 w-full">
        {/* Top Section */}
        <section className="grid grid-cols-2 gap-10">
          {/* Image goes here */}
          <div className="relative aspect-[1/0.7] w-full rounded-md bg-gray-200" />

          <div className="flex h-full w-full flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <Tag color={"#9B51E0"} backgroundColor={"#9747FF24"}>
                {"widows".toUpperCase()}
              </Tag>
              <h2 className="text_variant_h2">The Widows Project</h2>
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <p className="text_medium_body_p">
                  Organized by{" "}
                  <span className="cursor-pointer font-[400] uppercase text-accent transition-all duration-300 hover:underline">
                    Family Worship Center
                  </span>
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-sub-title text-[.8rem] font-bold">
                    ₦135,000{" "}
                    <span className="font-body text-[.7rem] font-[400]">
                      raised
                    </span>
                  </h5>
                  <h5 className="font-title text-[1rem] font-bold">₦500,000</h5>
                </div>
                <Progress value={60} />
                <p className="text_regular_body_b">
                  75 <span className="font-[400] uppercase">donors</span>
                </p>
              </div>
              <div className="mb-10 mt-6 flex space-x-2">
                <Button className="space-x-2">
                  <Heart2 set="bold" size={19} />
                  <span>Donate</span>
                </Button>
                <Button variant="link" className="space-x-2 text-accent">
                  <Link size={19} />
                  <span>Share this project</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Section */}
        <section className="mt-10 grid grid-cols-2 gap-10">
          <div className="flex flex-col space-y-3">
            <h3 className="text_variant_h2 text-[2rem]">Story</h3>
            <div className="felx flex-col space-y-10">
              <p className="text_regular_body_p">
                Lorem ipsum dolor sit amet consectetur. Sed sit consequat quis
                habitant massa. Commodo turpis tempor ipsum libero ut semper
                dapibus dolor. Viverra cras consequat tincidunt nibh ut vitae
                maecenas quis. Blandit molestie est semper nunc id curabitur a
                amet. At aliquet facilisi vestibulum congue aliquam elementum.
                Vulputate venenatis vehicula sem fusce at cursus aliquet eget.
                Proin enim quis aliquet nulla. Risus nam in donec iaculis
                suspendisse nunc arcu. Mattis vitae massa tincidunt feugiat nisi
                ante nulla blandit. Sed nulla neque turpis tellus lorem vitae
                venenatis. Nunc nisi nibh massa elementum. In risus semper
                dapibus tristique massa eu tempor.
              </p>
              <p className="text_regular_body_p">
                Volutpat tincidunt amet pellentesque varius. Nam aliquam duis
                urna id. Accumsan quis sapien habitant dui egestas facilisis
                purus. Quis quis egestas aliquet sollicitudin. Tellus cras urna
                habitant imperdiet id ut arcu commodo elementum. Cras ultricies
                ultrices eget dignissim pellentesque tortor. Faucibus velit
                luctus odio nibh nulla. Bibendum sagittis massa praesent tortor
                lobortis porttitor tellus. Volutpat integer ipsum dolor mattis
                viverra dui tempus. Tortor habitasse facilisis sapien ornare a
                semper orci. Non mauris eget lacus mauris eu nunc in vestibulum.
                Nunc egestas tristique volutpat viverra nibh..
              </p>
              <p className="text_regular_body_p">
                Mattis vitae massa tincidunt feugiat nisi ante nulla blandit.
                Sed nulla neque turpis tellus lorem vitae venenatis. Nunc nisi
                nibh massa elementum. In risus semper dapibus tristique massa eu
                tempor.
              </p>
            </div>
          </div>

          <div className=" flex w-full justify-center">
            <div className="h-fit w-[70%] rounded-[15px] bg-white p-[2rem]">
              <h3 className="text_variant_h2 text-[2rem]">Donations</h3>
              <div className="mt-6 w-full space-y-10">
                <DonationCard />
                <DonationCard />
                <DonationCard />
              </div>
              <Button
                variant="outline"
                className="mt-10 w-full border-accent text-accent"
              >
                View more donations
              </Button>
            </div>
          </div>
        </section>
      </div>
    </SectionContainer>
  );
};

export default ProjectPage;
