import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "My Next Project",
  description: "My Next Project",
  keywords: "my-next-project",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <div>{children}</div>;
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
