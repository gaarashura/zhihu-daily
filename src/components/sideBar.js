import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {Container, Header, Content, List, ListItem, Text, Left, Icon, Body} from 'native-base';
import util from '../common/util';
import {withNavigation} from 'react-navigation';

@withNavigation
export default class SideBar extends Component {
    state = {
        routes: [{
            name: '首页',
            isHome: true,
            id: -99
        }]
    }

    constructor(props) {
        super(props);
        this.getRoutes();
    }

    async getRoutes() {
        const res = await util.ajax({
            url: 'themes'
        });
        this.setState((prevState, props) => ({
            routes: prevState.routes.concat(res.others)
        }));
    }

    navigateList = (id) => {
        this.props.navigation.navigate('Home', {id})
    }

    render() {
        return (
            <Container>
                <Header/>
                <Content>
                    <List>

                        {this.state.routes.map(route => {
                            return (
                                <TouchableNativeFeedback key={route.id} onPress={() => {
                                    this.navigateList(route.id);
                                }}>
                                    <ListItem>
                                        {route.isHome ? (<Left>
                                            <Icon name="home"/>
                                            <Body>
                                            <Text> {route.name}</Text>
                                            </Body>
                                        </Left>) : (
                                            <Text> {route.name}</Text>
                                        )}
                                    </ListItem>
                                </TouchableNativeFeedback>
                            )
                        })}
                    </List>
                </Content>
            </Container>
        )
    }
}
