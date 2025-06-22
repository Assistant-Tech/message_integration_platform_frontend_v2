import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "@/app/components/common";
import { Container } from "@/app/components/layout";
import { Theme } from "@radix-ui/themes";
// import { ProductNavigation } from "@/app/components";

const ProductsLayout = () => {
  return (
    <section>
      <Container>
        <Theme>
          <Navbar />
          {/* breadcrumb */}
          {/* You can implement dyanmic breadcumbs here */}
          {/* <ProductNavigation /> */}
          <Outlet />
        </Theme>
      </Container>
      <Footer />
    </section>
  );
};

export default ProductsLayout;
