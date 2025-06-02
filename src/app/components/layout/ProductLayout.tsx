import { Outlet } from "react-router-dom";
import { Navbar } from "@/app/components/common";
import { Container } from "@/app/components/layout";
// import { ProductNavigation } from "@/app/components";

const ProductsLayout = () => {
  return (
    <Container>
      <Navbar />
      {/* You can implement dyanmic breadcumbs here */}
      {/* <ProductNavigation /> */}
      <Outlet />
    </Container>
  );
};

export default ProductsLayout;
