import { About, Contact, Hero } from "@/app/features/landing/";

const Landing = () => {
  return (
    <div className="min-h-screen px-32">
      <Hero />
      <Contact />
      <About />
    </div>
  );
};

export default Landing;
