import { AppRegistry } from 'react-native';
import appJson from './app.json';
import App from './App';

import { setBaseUrl } from "./httpUtil";

const appName = appJson.expo.name;

setBaseUrl();

AppRegistry.registerComponent(appName, () => App);
