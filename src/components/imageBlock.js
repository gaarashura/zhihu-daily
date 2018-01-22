import React, {Component} from 'react';
import {Text, Dimensions, Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Container, Header, Left, Body, Right, Button, Icon, Title, View, Card, CardItem} from 'native-base';
import {withNavigation} from 'react-navigation';
import commonStyle from "../common/style";

const {width, height} = Dimensions.get('window');
@withNavigation
export default class ImageBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {props} = this;
        return (
                <View  style={{height:240}}>
                    <Card style={[{width: '100%',flex:1}, commonStyle.reset]}>
                        <CardItem cardBody style={{width: '100%', marginTop: 0, marginBottom: 0}}>
                            <Image source={{uri: props.image}}
                                   style={{height: 240, width: null, flex: 1}}/>
                            <Text numberOfLines={2} style={styles.image_desc}>
                                {props.desc}
                            </Text>
                            {this.props.children}
                        </CardItem>
                    </Card>
                </View>
        );
    }
}

const styles = StyleSheet.create({
        image_desc: {
            position: 'absolute',
            bottom: 20,
            fontSize: 20,
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: 'bold',
            color: '#fff',
            width: '100%'
        }
    }
)