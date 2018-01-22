import {DrawerNavigator, StackNavigator} from 'react-navigation';
import map from "./routeMap";
import config from "./config";
const Drawer = DrawerNavigator(map,config);

export default Drawer;