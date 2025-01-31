import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

/* eslint-disable react/prop-types */
function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
