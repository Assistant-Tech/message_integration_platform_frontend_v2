import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@/app/components/common";
import { Container } from "@/app/components/layout";
// import { ProductNavigation } from "@/app/components";

const ProductsLayout = () => {
  return (
    <section>
      <Container>
        <Navbar />
        {/* breadcrumb */}
        {/* You can implement dyanmic breadcumbs here */}
        {/* <ProductNavigation /> */}
        <Outlet />
      </Container>
      <Footer />
    </section>
  );
};

export default ProductsLayout;
