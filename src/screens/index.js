import {Navigation} from 'react-native-navigation';

import ListScreen from './ListScreen';

export function registerScreens() {
  Navigation.registerComponent('appsee.ListScreen', () => ListScreen);
}