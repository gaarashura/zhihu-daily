import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, View} from 'native-base';
import {withNavigation} from 'react-navigation';

@withNavigation
export default class HeaderExample extends Component {
    constructor(props) {
        super(props);
    }

    back = () => {
        this.props.navigation.goBack();
    }

    render() {
        const {left, right, title} = this.props;
        return (
            <View style={{height: 56,zIndex:100}}>
                <Container>
                    <Header>
                        <Left>
                            {left || (
                                <Button transparent onPress={this.back}>
                                    <Icon name='arrow-back'/>
                                </Button>)
                            }
                        </Left>
                        {title == null ? null : (
                            <Body>
                            <Title>{title || 'Header'}</Title>
                            </Body>
                        )}

                        <Right>
                            {right || (
                                <View transparent>
                                </View>)}
                        </Right>
                    </Header>
                </Container>
            </View>
        );
    }
}