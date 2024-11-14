import * as Keychain from 'react-native-keychain';

const {
  ACCESS_CONTROL,
  ACCESSIBLE,
  AUTHENTICATION_TYPE,
  SECURITY_LEVEL,
  STORAGE_TYPE,
} = Keychain;

type KeychainItem = { key: string; value: string };

const defaultOptions = (key: string) => ({
  // ios only
  accessible: ACCESSIBLE.WHEN_UNLOCKED,
  // ios only
  authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
  // android only
  securityLevel: SECURITY_LEVEL.SECURE_HARDWARE,
  service: key,
  // android only
  storage: STORAGE_TYPE.AES,
});

export const keychainKeys = {
    username: 'username',
    profilePicture: 'profilePicture',
    entropy: 'entropy',
    wallet: 'wallet',
    contacts: 'contacts',
  };

export const storeKey = async (
  { key, value }: KeychainItem,
  passcodeProtected?: boolean,
) => {
  const options = passcodeProtected
    ? {
        ...defaultOptions(key),
        accessControl: ACCESS_CONTROL.DEVICE_PASSCODE,
      }
    : defaultOptions(key);

  try {
    await Keychain.setGenericPassword('Quai', value, options);
  } catch (error: any) {
    console.log(error);

    if (error.message.includes('Insufficient security level')) {
      try {
        await Keychain.setGenericPassword('Quai', value, {
          ...options,
          securityLevel: SECURITY_LEVEL.SECURE_SOFTWARE,
        });
      } catch (err: any) {
        console.log(err);
      }
    }
  }
};

export const retrieveStoredKey = async (key: string) => {
  const credentials = await Keychain.getGenericPassword({
    authenticationPrompt: {
      title: `Authenticate to retrieve your ${key}`,
      subtitle: 'Please use your device credentials',
      description: `This is needed to decrypt your ${key}`,
      cancel: 'Cancel',
    },
    authenticationType: AUTHENTICATION_TYPE.DEVICE_PASSCODE_OR_BIOMETRICS,
    securityLevel: SECURITY_LEVEL.SECURE_HARDWARE,
    service: key,
    storage: STORAGE_TYPE.AES,
  });
  if (!credentials) {
    return credentials;
  }
  return credentials.password;
};

export const resetStoredKey = async (key: string) => {
  try {
    await Keychain.resetGenericPassword({ service: key });
  } catch (e) {
    console.error(e);
  } finally {
    console.log('reset keychain with key ', key);
  }
};

