import Navbar from "@/components/shared/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default UserLayout;
