import "@/assets/styles/globals.css";

export const metadata = {
  title: "My Next Project",
  description: "My Next Project",
  keywords: "my-next-project",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>;
      </body>
    </html>
  );
};

export default MainLayout;
