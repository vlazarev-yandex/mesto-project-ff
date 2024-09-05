import { PATCH, config } from "./baseApiMethods";

export const updateProfileInfo = (profileTitle, profileDescription) => {
  const profileDataURL = config.baseUrl + `/users/me`;
  const profileUpdatedInfo = {
    name: profileTitle,
    about: profileDescription,
  };

  return PATCH(profileUpdatedInfo, profileDataURL);
};

export const updateProfilePhoto = (linkToPhoto) => {
  const profileAvatarURL = config.baseUrl + `/users/me/avatar`;
  const updatedProfilePhoto = {
    avatar: linkToPhoto,
  };

  return PATCH(updatedProfilePhoto, profileAvatarURL);
};
