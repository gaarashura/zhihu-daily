/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {StyleProvider} from 'native-base';
import { StackNavigator } from 'react-navigation';
import config from './src/router/stackNavigatorConfig';
import map from './src/router/routeMap';
const RootNavigator = StackNavigator(map,config);

export default class App extends Component<{}> {
    componentDidMount(){
        console.log(this.rootRouter)
    }
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <RootNavigator ref={ref=>this.rootRouter=ref}></RootNavigator>
            </StyleProvider>
        );
    }
}

