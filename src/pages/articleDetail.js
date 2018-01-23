import React, {Component} from 'react';
import {
    View, StyleSheet, WebView,
    ScrollView,
    Platform,
    Animated
} from "react-native";
import {
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title,
    CardItem,
    Card,
    List,
    ListItem,
    Thumbnail,
    Content,
    Text
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import Header from '../components/header';
import ImageBlock from '../components/imageBlock';
import util from '../common/util';
import commonStyle from '../common/style';

const injectedJavaScript = `
setTimeout(function(){
  window.onscroll=function(){
  var e=window.event;
  window.postMessage(window.scrollY) ;
}
})
`

export default class detail extends Component {
    state = {
        content: {},
        translateY:new Animated.Value(0)
    }

    constructor(props) {
        super(props);
        this.getContent();
    }
    componentDidMount() {
        this.startAnimation();
    }
    getContent = async () => {
        const {params} = this.props.navigation.state;
        const data = await util.ajax({
            url: `news/${params.id}`
        });
        this.setState({
            content: data
        });
    }
    goComments=()=>{
        const {navigation} = this.props;
        const {params} = this.props.navigation.state;
        navigation.navigate('comments', {id:params.id});
    }
    startAnimation(val=0) {
        Animated.timing( // 以一个初始速度开始并且逐渐减慢停止。  S=vt-（at^2）/2   v=v - at
            this.state.translateY,
            {
                toValue: val,
                duration:200
            }
        ).start();
    }
    render() {
        const {content} = this.state;
        const scalesPageToFit = Platform.OS != 'ios';
        const styleSheet = [];
        content.css && content.css.forEach(item => {
            styleSheet.push(`<link rel="stylesheet" href=${item}>`);
        })

        const htmlContent = `
            <!DOCTYPE html><html>
                <head>
                    ${styleSheet.join('')}
                    <style>
                        .headline .img-place-holder {
                          height: 240px;
                        }
                    </style>
                </head>
                <body>
                ${content.body}
                </body>
            </html>`;
        const Right = (
            <Grid>
                <Col>
                    <View>
                        <Button transparent>
                            <Icon name='md-share'/>
                        </Button>
                    </View>
                </Col>
                <Col>
                    <View>
                        <Button transparent>
                            <Icon name='md-star'/>
                        </Button>
                    </View>
                </Col>
                <Col>
                    <View>
                        <Button transparent  onPress={this.goComments}>
                            <Icon name='md-chatboxes'/>
                        </Button>
                    </View>
                </Col>
                <Col>
                    <View>
                        <Button transparent>
                            <Icon name='md-thumbs-up'/>
                        </Button>
                    </View>
                </Col>
            </Grid>
        )
        return (
            <View style={commonStyle.wrap}>
                <Header right={Right}>
                </Header>
                <Animated.View  style={[styles.detail_image_block,{
                    translateY:this.state.translateY
                }]}>
                        <ImageBlock image={content.image} desc={content.title}>
                            <Text style={[styles.source]}>{content.image_source}</Text>
                        </ImageBlock>
                </Animated.View>
                <WebView
                    injectedJavaScript={injectedJavaScript}
                    onMessage={(e) => {
                        const val=e.nativeEvent.data;
                        if(val>240)return  this.startAnimation(-240);
                        this.startAnimation(-val)
                    }}
                    source={{
                        html: htmlContent, baseUrl: ''
                    }}
                    automaticallyAdjustContentInsets={true}
                    style={{
                        flex: 1,
                        alignSelf: 'stretch'
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
        source: {
            position: 'absolute',
            bottom: 5,
            fontSize: 14,
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: 'bold',
            color: '#333',
            width: '100%',
            textAlign: 'right'
        },
        detail_image_block: {
            position: 'absolute',
            top:56,
            height: 240,
            width: '100%',
            zIndex: 10
        }
    }
)