import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import {
  getBlogPostById,
  getTableOfContents,
  getRelatedPosts,
} from "@/app/utils/blog/blog";
import { Badge } from "@/app/components/ui";
import Button from "@/app/components/ui/Button";

const BlogDetailPage: React.FC = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="px-4 sm:px-6 lg:px-px py-8">
        <p className="text-center text-grey-medium">
          Blog post ID not provided
        </p>
      </div>
    );
  }

  const blogPost = getBlogPostById(id);

  if (!blogPost) {
    return (
      <div className="px-4 sm:px-6 lg:px-px py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-grey mb-4">
            Blog post not found
          </h1>
          <p className="text-grey-medium mb-6">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const tableOfContents = getTableOfContents(blogPost);
  const relatedPosts = getRelatedPosts(blogPost.id, blogPost.category);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="pt-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpVariant}
        className="px-4 sm:px-6 lg:px-px py-12 pt-20"
      >
        {/* Header Section */}
        <motion.div className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge
              title={blogPost.category}
              className="bg-primary-light"
              textColor="primary"
              textStyle="font-bold"
            />
          </div>

          {/* Title */}
          <h1 className="h3-bold-32 text-base-black">{blogPost.title}</h1>

          {/* Author and Meta Info */}
          <div className="flex items-center gap-4 text-grey-medium pt-4">
            <div className="flex items-center gap-3">
              <img
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <span className="body-bold-16 text-grey block">
                  {blogPost.author.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="body-regular-16 text-grey-medium">
                {blogPost.readTime}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="body-regular-16 text-grey-medium">
                Updated on {blogPost.date}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <div className="mb-12">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-96 object-cover rounded-4xl shadow-lg"
          />
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Table of Contents - Sticky Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <h2 className="h4-bold-24 text-base-black mb-6">
                Table of Content
              </h2>
              <nav className="space-y-3">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block text-left text-grey-medium hover:text-primary transition-colors duration-200 h5-regular-16 w-full"
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Article Content */}
          <article className="lg:w-3/4">
            <div className="prose prose-lg max-w-none">
              {/* Dynamic Content Sections */}
              {blogPost.content.sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-8">
                  <h2 className="h4-bold-24 text-grey mb-4">{section.title}</h2>
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-grey-medium body-regular-16 mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </article>
        </div>

        {/* Related Posts Section */}
        <div className="flex flex-col lg:flex-row gap-12">
          {relatedPosts.length > 0 && (
            <section className="mt-12">
              <h3 className="h3-bold-32 text-base-black mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-full cursor-pointer">
                {" "}
                {/* Added items-stretch */}
                {relatedPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col" // Added flex flex-col
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                      {" "}
                      {/* Added flex flex-col flex-grow */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2 min-h-[2.5em]">
                        {" "}
                        {/* Added min-h for title */}
                        {post.title}
                      </h4>
                      <p className="text-xs text-grey-medium mb-3 line-clamp-3 flex-grow">
                        {" "}
                        {/* Increased line-clamp to 3, added flex-grow */}
                        {post.excerpt}{" "}
                        <span className="text-danger cursor-pointer underline">
                          Read More
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetailPage;
