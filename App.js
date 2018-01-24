/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import { StyleProvider } from 'native-base';
import { StackNavigator } from 'react-navigation';
import config from './src/router/stackNavigatorConfig';
import map from './src/router/routeMap';
import mobx from 'mobx';
import { Provider } from 'mobx-react';
import articleExtraStore from "./src/model/articleExtra";
import uiStore from "./src/model/globalUi";
import Loading from './src/components/loading';
mobx.useStrict(true);
const RootNavigator = StackNavigator(map, config);

export default class App extends Component<{}> {
    componentDidMount() {
        console.log(this.rootRouter)
    }
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Provider articleExtraStore={articleExtraStore} uiStore={uiStore}>
                    <View style={{flex:1}}>
                        <Loading></Loading>
                        <RootNavigator ref={ref => this.rootRouter = ref}>
                        </RootNavigator>
                    </View>
                </Provider>
            </StyleProvider>
        );
    }
}

