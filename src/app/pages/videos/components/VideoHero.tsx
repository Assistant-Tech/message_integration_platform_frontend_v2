import React, { useState } from "react";
import { Search, Play } from "lucide-react";
import { videos, videoCategories } from "@/app/utils/videos/videos";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GetStarted } from "@/app/pages/landing/";
import { NewsLetter } from "@/app/components/common";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const VideoHero: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      activeCategory === "All" || video.category === activeCategory;
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredVideo = filteredVideos.find((video) => video.featured);
  const regularVideos = filteredVideos.filter((video) => !video.featured);

  return (
    <div className="min-h-auto px-2 sm:px-6 lg:px-px">
      {/* Categories & Search */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {videoCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
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

      {/* Featured Video and Regular Videos */}
      {featuredVideo && (
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Featured Video */}
          <div
            className="lg:col-span-2 cursor-pointer pt-2"
            onClick={() => navigate(`/resources/videos/${featuredVideo.id}`)}
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="relative">
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-96 object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group hover:bg-opacity-50 transition-all">
                  <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:bg-opacity-100 transition-all">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                </div>
                <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  {featuredVideo.category}
                </span>
                <span className="absolute top-4 right-4 text-white text-sm">
                  {featuredVideo.date}
                </span>
                <span className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                  {featuredVideo.duration}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {featuredVideo.title}
                </h3>
                <p className="text-grey mb-4 line-clamp-3">
                  {featuredVideo.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={featuredVideo.author.avatar}
                      className="w-10 h-10 rounded-full mr-3"
                      alt={featuredVideo.author.name}
                    />
                    <div>
                      <p className="font-medium">{featuredVideo.author.name}</p>
                      <p className="text-sm text-grey">
                        {featuredVideo.author.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-grey">
                    {featuredVideo.views} views
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Videos */}
          <div className="space-y-8">
            {regularVideos.slice(0, 4).map((video, idx) => (
              <motion.div
                key={video.id}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 * idx }}
                className="bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
                onClick={() => navigate(`/resources/videos/${video.id}`)}
              >
                <div className="flex">
                  <div className="w-24 h-20 relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Small Play Button */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="bg-white bg-opacity-90 rounded-full p-1">
                        <Play className="w-3 h-3 text-primary ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white px-1 rounded text-xs">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-primary text-white px-2 py-1 rounded text-xs font-medium">
                        {video.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {video.date}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm mb-2 line-clamp-2">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={video.author.avatar}
                          alt={video.author.name}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-xs font-medium">
                            {video.author.name}
                          </p>
                          <p className="text-xs text-grey">
                            {video.author.role}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-grey">
                        {video.views} views
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

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

export default VideoHero;
