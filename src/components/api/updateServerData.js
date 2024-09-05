import { PATCH } from "./baseApiMethods";
import { profileAvatarURL } from "../..";

export const updateProfileInfo = (profileTitle, profileDescription) => {
  const profileUpdatedInfo = {
    name: profileTitle,
    about: profileDescription,
  };

  return PATCH(profileUpdatedInfo, profileDataURL); 
};

export const updateProfilePhoto = (linkToPhoto) => {
    const updatedProfilePhoto = {
        avatar: linkToPhoto
    }; 

    return PATCH(updatedProfilePhoto, profileAvatarURL); 
}