import { DEFAULT_PROFILE_IMAGE_URL } from "@/app/constants/image-cloudinary";

export const getAvatarUrl = (avatar?: string | null) => {
  if (typeof avatar === "string" && avatar.trim().length > 0) {
    return avatar;
  }

  return DEFAULT_PROFILE_IMAGE_URL;
};
