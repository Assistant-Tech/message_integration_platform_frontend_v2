import { NewsLetter } from "@/app/components/common";
import { BlogHero } from "@/app/pages/blog/components";
import { GetStarted } from "@/app/pages/landing/";

const BlogPage = () => {
  return (
    <div className="pt-20 lg:pt-32">
      <div className="pb-10">
        <h1 className="h2-bold-40 text-base-black mb-8 px-4 sm:px-6 lg:px-px">
          Blogs
        </h1>
        <BlogHero />
      </div>

      {/* GET STARTED */}
      <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
        <GetStarted />
      </div>

      {/* NewsLetter */}
      <div className="pt-20">
        <NewsLetter />
      </div>
    </div>
  );
};

export default BlogPage;
