import VideoHero from "@/app/pages/videos/components/VideoHero";

const VideosPage = () => {
  return (
    <div className="pt-20 lg:pt-32">
      <div className="pb-10">
        <h1 className="h2-bold-40 text-base-black mb-8 px-2 sm:px-6 lg:px-px">
          Videos
        </h1>
        <VideoHero />
      </div>
    </div>
  );
};

export default VideosPage;
