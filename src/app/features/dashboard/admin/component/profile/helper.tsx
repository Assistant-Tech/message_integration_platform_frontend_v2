const PasswordStrengthBar = ({ password }: { password: string }) => {
  if (!password) return null;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

   const labels = ["", "Weak", "Fair", "Good", "Strong"];
   const barColors = [
    "",
    "bg-danger",
    "bg-[oklch(75%_0.15_85)]",
    "bg-information",
    "bg-success",
  ];
   const textColors = [
    "",
    "text-danger",
    "text-[oklch(55%_0.15_85)]",
    "text-information",
    "text-success",
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? barColors[score] : "bg-grey-light"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${textColors[score]}`}>
        {labels[score]}
      </p>
    </div>
  );
};

export default PasswordStrengthBar;
