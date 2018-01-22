/**
 * 主页
 */
import React, {Component} from 'react';
import {View, Text, Dimensions, Image, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Left, Body, Right, Button, Icon, Title, CardItem, Card, List, ListItem, Thumbnail, Content} from 'native-base';

import Header from '../components/header';
import ImageBlock from '../components/imageBlock';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import util from '../common/util';
import commonStyle from '../common/style';

const {width, height} = Dimensions.get('window');
export default class Home extends Component {
    state = {
        size: {width, height: 240},
        topStories: [],
        stories: []
    }

    constructor(props) {
        super(props);
        this.getData();
    }

    async getData() {
        const data = await util.ajax({
            url: 'news/latest'
        });
        const {stories, top_stories: topStories} = data;
        this.setState({
            stories,
            topStories
        })
    }

    goDetail = (id) => {
        const {navigation} = this.props;
        navigation.navigate('articleDetail',{id})
    }

    render() {
        const {navigation} = this.props;
        const {topStories, stories} = this.state;
        return (
            <View style={{flex: 1,}}>
                <Header left={(
                    <Button transparent onPress={() => {
                        navigation.navigate('DrawerOpen')
                    }}>
                        <Icon name='menu'/>
                    </Button>
                )}
                        right={(
                            <Grid>
                                <Col/>
                                <Col>
                                    <View style={{justifyContent: 'center'}}>
                                        <Button transparent>
                                            <Icon name='md-notifications'/>
                                        </Button>
                                    </View>
                                </Col>
                                <Col>
                                    <View style={{justifyContent: 'center'}}>
                                        <Button transparent>
                                            <Icon name='md-more'/>
                                        </Button>
                                    </View>
                                </Col>
                            </Grid>
                        )}
                        title='首页'

                />
                <Content style={[styles.list]}>

                    <View style={styles.wrapper}>
                        {!topStories.length ? null : (
                            <Swiper paginationStyle={{bottom: 5}}>
                                {topStories.map(item => {
                                    return (
                                        <TouchableNativeFeedback key={item.id} onPress={()=>{
                                            console.log(321);
                                            this.goDetail(item.id);
                                        }}>
                                            <View>
                                                <ImageBlock  desc={item.title} image={item.image} />
                                            </View>
                                        </TouchableNativeFeedback>

                                    )
                                })}
                            </Swiper>
                        )}
                    </View>
                    <List style={[commonStyle.reset, styles.list]}>
                        {stories.map(item => {
                            return (
                                <TouchableNativeFeedback key={item.id} onPress={()=>{
                                    console.log(321);
                                    this.goDetail(item.id);
                                }}>
                                    <ListItem style={[styles.article]}>
                                        <Body style={[styles.acticle_title_wrap]}>
                                        <Text numberOfLines={3} style={[styles.acticle_title]} note>{item.title}</Text>
                                        </Body>
                                        <Thumbnail square size={80} source={{uri: item.images[0]}}/>
                                    </ListItem>
                                </TouchableNativeFeedback>
                            )
                        })}
                    </List>
                </Content>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        wrapper: {
            height: 240
        },
        image_desc: {
            position: 'absolute',
            bottom: 20,
            fontSize: 20,
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: 'bold',
            color: '#fff',
            width: '100%'
        },
        list: {
            flex: 1
        },
        article: {
            marginRight: 15,
            marginTop: 10,
            paddingLeft: 15
        },
        acticle_title_wrap: {
            paddingRight: 15
        },
        acticle_title: {
            fontSize: 16,
            fontWeight: '600'
        }
    }
)