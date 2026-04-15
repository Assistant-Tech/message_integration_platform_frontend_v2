import { Facebook, Instagram, Linkedin } from "lucide-react";

interface SocialLink {
  platform: "facebook" | "instagram" | "linkedin";
  url: string;
}

interface OurTeamCardProps {
  name: string;
  title: string;
  imageUrl: string;
  imageAlt?: string;
  socialLinks?: SocialLink[];
  overlayColor?: string;
  socialIconColor?: string;
  className?: string;
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
};

const defaultSocialLinks: SocialLink[] = [
  { platform: "facebook", url: "#" },
  { platform: "instagram", url: "#" },
  { platform: "linkedin", url: "#" },
];

function OurTeamCard({
  name,
  title,
  imageUrl,
  imageAlt,
  socialLinks = defaultSocialLinks,
  className = "",
}: OurTeamCardProps) {
  return (
    <div
      className={`w-sm sm:w-66 lg:w-md h-96 flex flex-col mx-auto rounded-lg overflow-hidden shadow-xs shadow-grey-light hover:shadow-lg transition-shadow duration-300 cursor-pointer ${className}`}
    >
      {/* Profile Image */}
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt={imageAlt || `${name} - ${title}`}
          className="w-full h-full object-cover"
        />

        {/* Name and Title Overlay with bg-secondary */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-center px-4 py-2 rounded-md">
          <h3 className="body-meidum-16">{name}</h3>
          <p className="body-bold-16 uppercase">{title}</p>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 py-6 px-4 mt-6">
        {socialLinks.map((social, index) => {
          const IconComponent = socialIcons[social.platform];
          return (
            <a
              key={index}
              href={social.url}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 transform"
              aria-label={`${social.platform} profile`}
              target={social.url !== "#" ? "_blank" : undefined}
              rel={social.url !== "#" ? "noopener noreferrer" : undefined}
            >
              <IconComponent size={20} color="white" />
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default OurTeamCard;
