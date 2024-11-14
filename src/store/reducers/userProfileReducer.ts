import createReducer from '../createReducer';
import * as types from '../actions/types';

import { IUserProfileState } from '../models/reducers/userProfile';
import {
    ISetUserOnboardedState,
    ISetUserAgreedTermsState,
    ISetUserHomeRegionState,
    ISetUserHomeZoneState,
    ISetUserNameState, 
    ISetUserAvatarState } 
    from '../models/actions/userProfile';

    export const initialUserProfileState: IUserProfileState = {
        userOnboarded: false,
        userAgreedTerms: false,
        userHomeRegion: undefined,
        userHomeZone: undefined,
        userName: undefined,
        userAvatar: undefined,
      };

      export const userProfileReducer = createReducer(initialUserProfileState, {
        [types.SET_USER_ONBOARDED](state: IUserProfileState, action: ISetUserOnboardedState) {
            return {
              ...state,
              userOnboarded: action.userOnboarded,
            };
          },
        [types.SET_USER_AGREED_TERMS](state: IUserProfileState, action: ISetUserAgreedTermsState) {
            return {
              ...state,
              userAgreedTerms: action.userAgreedTerms,
            };
          },
        [types.SET_USER_HOME_REGION](state: IUserProfileState, action: ISetUserHomeRegionState) {
            return {
              ...state,
              userHomeRegion: action.userHomeRegion,
            };
          },
        [types.SET_USER_HOME_ZONE](state: IUserProfileState, action: ISetUserHomeZoneState) {
          return {
            ...state,
            userHomeZone: action.userHomeZone,
          };
        },
        [types.SET_USER_NAME](
            state: IUserProfileState,
            action: ISetUserNameState,
          ) {
            return {
              ...state,
              userName: action.userName,
            };
          },
          [types.SET_USER_AVATAR](
            state: IUserProfileState,
            action: ISetUserAvatarState,
          ) {
            return {
              ...state,
              userAvatar: action.userAvatar,
            };
          }, 
      });
