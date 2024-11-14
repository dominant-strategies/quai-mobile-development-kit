# 🚀 Quai Mobile Development Kit - React Native

[![React Native](https://img.shields.io/badge/React%20Native-v0.73.6-green.svg)](https://facebook.github.io/react-native/)


The Quai Mobile Development Kit (MDK) is a feature driven architecture starter project with a Quai and QI wallet and payment rails to enable rapid POC and MVP development of your mobile application.
This project is configured with redux, redux saga
and redux persist. Uses latest version of react-navigation.


## Scalability Factor

This Type based Architecture scales smoothly for different sized apps using feature based architecture.

## Features
- [Typescript](https://www.typescriptlang.org/) support.
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Navigation](https://reactnavigation.org/) with [Authentication flow](https://reactnavigation.org/docs/auth-flow) baked in & theming support.
- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler)
- [Redux](http://redux.js.org/) with [hooks](https://react-redux.js.org/api/hooks) support
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist/)
- [Jest](https://facebook.github.io/jest/)
- [Eslint](http://eslint.org/) ([Airbnb config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb))

## Prerequisites

- [Node](https://nodejs.org) v18+ (it is recommended to install it via [NVM](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/)
- A development machine set up for React Native by following [these instructions](https://facebook.github.io/react-native/docs/getting-started.html)

## Getting Started

1. Clone this repo, `git clone https://https://github.com/dominant-strategies/quai-mobile-development-kit.git <your project name>`
2. Go to project's root directory, `cd <your project name>`
3. Remove `.git` folder, `rm -rf .git`
4. Use [React Native Rename](https://github.com/junedomingo/react-native-rename) to update project name `$ npx react-native-rename <newName>`
5. Run `yarn` to install dependencies and `cd ios`  then `pod install` 

6. For IOS, build the app in XCode, Start the packager with `yarn start` 
7. Connect a mobile device to your development machine
8. Run the application:

- On Android:
  - Run `react-native run-android` or Use Android Studio (Recommended)
- On iOS:
  - Open `ios/YourReactProject.xcworkspace` in Xcode
  - Hit `Run` after selecting the desired device

9. Happy Coding with Quai Mobile Development Kit!

## Contributing

PRs are welcome!
