import React, { useState } from "react";
import { MoreVertical, X } from "lucide-react";
import { motion } from "framer-motion";

type Provider = {
  id: string;
  name: string;
  description: string;
  logo: string;
};

const providers: Provider[] = [
  {
    id: "nepal-can-move",
    name: "Nepal Can Move",
    description:
      "Maecenas dignissim justo eget nulla rutrum molestie.d nibh id sem dignissim finibus ac sit",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852429/ship_ni9brc.png",
  },
  {
    id: "pathao",
    name: "Pathao",
    description:
      "Maecenas dignissim justo eget nulla rutrum molestie.d nibh id sem dignissim finibus ac sit",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852883/pathao_yehz6e.webp",
  },
  {
    id: "aramex",
    name: "Aramex",
    description:
      "Maecenas dignissim justo eget nulla rutrum molestie.d nibh id sem dignissim finibus ac sit",
    logo: "https://res.cloudinary.com/dtoqwn0gx/image/upload/v1755852428/ship2_k0yc8x.png",
  },
];

const AccountInfoModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-90 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-grey">Account Info</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-grey-medium"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">Username</span>
            <span className="text-sm font-medium text-grey">
              Seamans Furniture
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-grey-medium">CID</span>
            <span className="text-sm font-medium text-grey">1234567890</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShippingSettings = () => {
  const [selected, setSelected] = useState<string | null>("nepal-can-move");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleMenuClick = (e: React.MouseEvent, providerId: string) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === providerId ? null : providerId);
  };

  const handleViewInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
    setMenuOpen(null);
  };

  const handleUnlink = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Logic for unlinking account
    setMenuOpen(null);
  };

  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <motion.article className="flex flex-col text-start mb-6">
        <h1 className="h4-bold-24 text-grey mb-2">Settings</h1>
        <h2 className="body-semi-bold-16 text-primary">Shipping</h2>
      </motion.article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`relative flex items-center gap-4 rounded-xl border-2 p-4 pr-3 cursor-pointer transition
            ${selected === provider.id ? "border-primary" : "border-grey-light"}`}
            onClick={() => setSelected(provider.id)}
          >
            {/* Radio Indicator */}
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center border-2
              ${selected === provider.id ? "border-primary" : "border-grey-light"}`}
            >
              {selected === provider.id && (
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              )}
            </div>

            {/* Logo */}
            <img
              src={provider.logo}
              alt={provider.name}
              className="w-12 h-12 rounded-lg object-contain"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="h5-bold-16 text-grey">{provider.name}</h3>
              <p className="body-regular-16 text-grey-medium">
                {provider.description}
              </p>
            </div>

            {/* More Menu */}
            <div className="ml-auto relative">
              <button
                onClick={(e) => handleMenuClick(e, provider.id)}
                className="p-1 rounded text-grey-medium hover:bg-base-white"
              >
                <MoreVertical size={18} />
              </button>

              {menuOpen === provider.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-grey-light rounded-md z-10 overflow-hidden">
                  <button
                    onClick={handleViewInfo}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 body-regular-16 text-grey-medium hover:bg-base-white"
                  >
                    View Account Info
                  </button>
                  <button
                    onClick={handleUnlink}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 body-regular-16 text-danger hover:bg-base-white"
                  >
                    Unlink Account
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {showModal && <AccountInfoModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ShippingSettings;
