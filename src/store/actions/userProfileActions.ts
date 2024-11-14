import * as types from './types';

export function setUserOnboarded(userOnboarded: boolean) {
    return {
      type: types.SET_USER_ONBOARDED,
      userOnboarded,
    };
  }

export function setUserHomeRegion(userHomeRegion: string) {
    return {
      type: types.SET_USER_HOME_REGION,
      userHomeRegion,
    };
  }

export function setUserName(userName: string) {
    return {
      type: types.SET_USER_NAME,
      userName,
    };
  }

export function setUserHomeZone(homeZone: string) {
  return {
    type: types.SET_USER_HOME_ZONE,
    homeZone,
  };
}

export function setAgreedTerms(agreedTerms: boolean) {
  return {
    type: types.SET_USER_AGREED_TERMS,
    agreedTerms,
  };
}

export function setUserAvatar(userAvatar: string) {
    return {
      type: types.SET_USER_AVATAR,
      userAvatar,
    };
  }

export function resetReduxState(){
  return {
    type: types.RESET_REDUX_STATE,
  }
}