export interface IUserProfileState {
    userOnboarded: boolean;
    userAgreedTerms: boolean;
    userHomeRegion: string | undefined;
    userHomeZone: string | undefined;
    userName: string | undefined;
    userAvatar: string | undefined;
  }