import CenterLayoutMidWrapper from "../../components/shared/Layouts/Center/CenterLayoutMidWrapper";
import NoSSRWrapper from "@components/shared/NoSSRWrapper";
import AdminSigninForm from "@components/forms/admin/AdminSigninForm";

const AdminSigninPage = () => {
  return (
    <CenterLayoutMidWrapper title="Admin Sign In">
      <NoSSRWrapper>
        <AdminSigninForm />
      </NoSSRWrapper>
    </CenterLayoutMidWrapper>
  );
};

export default AdminSigninPage;
