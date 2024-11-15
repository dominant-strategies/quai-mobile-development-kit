// export action creators
import * as loginActions from './loginActions';
import * as navigationActions from './navigationActions';
import * as themeActions from './themeActions';
import * as userProfileActions from './userProfileActions';
import * as walletActions from './walletActions';
import * as txActions from './txActions';

export const ActionCreators = Object.assign(
  {},
  loginActions,
  navigationActions,
  themeActions,
  userProfileActions,
  walletActions,
  txActions,
);