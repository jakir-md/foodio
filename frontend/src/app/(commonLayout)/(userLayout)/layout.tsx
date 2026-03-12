import HeroSection from "@/components/shared/HeroSection";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeroSection />
      {children}
    </>
  );
};

export default CommonLayout;
