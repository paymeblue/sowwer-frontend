import { Fragment } from "react";
// import CoverPhoto from "./cover-photo";
import MainDetails from "./main-details";
import ProjectDesc from "./project-desc";

const Overview = () => {
  return (
    <Fragment>
      <MainDetails />
      {/* <CoverPhoto /> */}
      <ProjectDesc />
    </Fragment>
  );
};

export default Overview;
