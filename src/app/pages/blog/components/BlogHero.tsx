import React, { useState } from "react";
import { Search } from "lucide-react";
import { blogPosts, blogCategories } from "@/app/utils/blog/blog";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const BlogHero: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-auto px-4 sm:px-6 lg:px-px">
      {/* Categories & Search */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeCategory === category
                  ? "bg-primary text-white"
                  : "bg-base-white text-grey hover:bg-grey-light"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-medium w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-grey-light rounded-lg"
          />
        </div>
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <h1 className="h3-bold-32 text-base-black my-10">Feature Blogs</h1>
      </motion.div>
      {/* Featured Post and Regular Posts */}
      {featuredPost && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Featured Post */}
          <div
            className="lg:col-span-2 cursor-pointer pt-2"
            onClick={() => navigate(`/resources/blogs/${featuredPost.id}`)}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-96 object-cover"
                />
                <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full h5-regular-16">
                  {featuredPost.category}
                </span>
                <span className="absolute top-4 right-4 text-white h5-regular-16">
                  {featuredPost.date}
                </span>
              </div>
              <div className="p-6">
                <h3 className="h4-bold-24 text-base-black mb-3 line-clamp-2">
                  {featuredPost.title}
                </h3>
                <p className="text-grey-medium h5-regular-16 mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center">
                  <img
                    src={featuredPost.author.avatar}
                    className="w-10 h-10 rounded-full mr-3"
                    alt={featuredPost.author.name}
                  />
                  <div>
                    <p className="font-medium">{featuredPost.author.name}</p>
                    <p className="text-sm text-grey">
                      {featuredPost.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Posts */}
          <div className="space-y-4 h-full">
            {regularPosts.slice(0, 3).map((post, idx) => (
              <motion.div
                key={post.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * idx }}
                className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer p-4"
                onClick={() => navigate(`/resources/blogs/${post.id}`)}
              >
                <div className="flex items-center ">
                  <div className="w-24 h-36">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full rounded-2xl p-2 object-fill"
                    />
                  </div>
                  <div className="flex-1 pb-4 h-32">
                    <div className="flex items-center justify-between mb-2">
                      <span className=" text-primary label-bold-14">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                    <h4 className="body-bold-16 text-base-black mb-2 line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      <div>
                        <p className="body-bold-16 text-base-black">
                          {post.author.name}
                        </p>
                        <p className="h5-regular-16 text-grey-medium">
                          {post.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BlogHero;
