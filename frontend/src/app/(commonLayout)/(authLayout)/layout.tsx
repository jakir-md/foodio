import AuthNavbar from "@/components/modules/auth/AuthNavbar";
import Footer from "@/components/shared/Footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthNavbar />
      {children}
      <Footer />
    </>
  );
};

export default AuthLayout;
