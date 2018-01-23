import { StackNavigator } from 'react-navigation';
import config from './stackNavigatorConfig';
import map from './routeMap';
const RootNavigator = StackNavigator(map,config);

export default RootNavigator;