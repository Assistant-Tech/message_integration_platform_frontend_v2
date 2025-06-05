const renderFloatingBubbles = () =>
    SOCIAL_LINKS_CONFIG.map((social, index) => {
      const { src, color, size, name, href } = social;

      const left = getBubblePosition(index, SOCIAL_LINKS_CONFIG.length);
      const basePosY = 120;
      const amplitude = 80;
      const posY =
        basePosY + Math.sin(index * 0.8 + timestamp / 5000) * amplitude;
      const delay = index * 0.25;

      return (
        <motion.a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute"
          style={{
            left: `${left}%`,
            top: `${posY}px`,
            transform: "translateX(-50%)",
          }}
          aria-label={`Connect on ${name}`}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          whileHover={{ scale: 1.25, zIndex: 20, y: -8 }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full bg-white shadow-xl p-3"
            animate={{ translateY: [0, -10, 0] }}
            transition={{
              duration: 3 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            title={name}
          >
            <img
              src={src}
              alt={`${name} icon`}
              width={size}
              height={size}
              style={{ color }}
            />
          </motion.div>
        </motion.a>
      );
    });