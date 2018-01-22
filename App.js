/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import {StyleProvider} from 'native-base';
import Router from './src/router';
export default class App extends Component<{}> {
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Router></Router>
            </StyleProvider>
        );
    }
}

