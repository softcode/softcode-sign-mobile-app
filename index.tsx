import { AppRegistry } from 'react-native';
import appJson from './app.json';
import App from './App';

import { setBaseUrl } from "./httpUtil";

const appName = appJson.expo.name;

console.log("Before calling setBaseUrl in index.tsx");
setBaseUrl();
console.log("After calling setBaseUrl in index.tsx");

AppRegistry.registerComponent(appName, () => App);
