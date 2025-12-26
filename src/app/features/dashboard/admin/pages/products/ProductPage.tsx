import { Heading } from "@/app/features/dashboard/admin/component/ui/";

const ProductPage = () => {
  return (
    <div>
      {/* Heading */}
      <article className="px-6 py-4">
        <Heading title="ProductPage" align="left" className="text-base-black" />
        <Heading
          title="All products"
          align="left"
          className="text-grey-medium"
        />
      </article>

      {/* Search product bar */}
      {/* Tags / filter bar */}
      {/* table tanstack  */}
    </div>
  );
};

export default ProductPage;
