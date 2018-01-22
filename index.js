import { AppRegistry,View,Text } from 'react-native';
import Reactotron, {
    trackGlobalErrors,
    openInEditor,
    overlay,
    asyncStorage,
    networking
} from 'reactotron-react-native'
import App from './App';
Reactotron
    .configure({
        name: 'React Native Demo'
    })
    .use(trackGlobalErrors())
    .use(openInEditor())
    .use(overlay())
    .use(asyncStorage())
    .use(networking())
    .connect()
console.disableYellowBox = true;
AppRegistry.registerComponent('zhihu_daily', () => App);

