/**
 * 主页
 */
import React, { Component } from 'react';
import { View, Text, Dimensions, Image, StyleSheet, TouchableNativeFeedback, RefreshControl } from 'react-native';
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
    Spinner
} from 'native-base';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import Header from '../components/header';
import ImageBlock from '../components/imageBlock';

import Swiper from 'react-native-swiper';
import util from '../common/util';
import commonStyle from '../common/style';
import Loading from "../components/loading";
const { width, height } = Dimensions.get('window');



export default class Home extends Component {
    state = {
        size: { width, height: 240 },
        topStories: [],
        stories: [],
        themeId: -99,
        lastDay: moment(),
        loadingMore: true,
        background: {},
        title: '首页',
        isRefreshing: false
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getLatest();
    }

    componentWillReceiveProps(nextProps) {
        const { id, title } = nextProps.navigation.state.params;
        console.log(title);
        this.setState({
            title,
            lastDay: moment(),
            loadingMore: true,
            topStories: [],
            stories: [],
        }, () => {
            this.getThemeDetail(id);
        });

    }

    async getLatest() {
        const data = await util.ajax({
            url: 'news/latest'
        });
        const { stories, top_stories: topStories } = data;
        this.setState((prevState, props) => ({
            title: '首页',
            stories: prevState.stories.concat(stories),
            topStories,
            loadingMore: false
        }));
    }

    loadBefore = async () => {//加载历史记录
        const lastDay = moment(this.state.lastDay).subtract(1, 'day');
        const dateStr = lastDay.format('YYYYMMDD');
        this.setState((prevState, props) => ({
            stories: prevState.stories.concat([{
                id: dateStr,
                dateStr: dateStr
            }]),
            lastDay,
            loadingMore: true
        }), async () => {
            const data = await util.ajax({
                url: `news/before/${dateStr}`
            });
            const { stories } = data;
            this.setState((prevState, props) => ({
                stories: prevState.stories.concat(stories),
                loadingMore: false
            }));
        });

    }

    async getThemeDetail(id) {
        if (!id) return;
        this.setState({
            themeId: id
        });
        if (id == -99) {//加载首页内容
            return this.getLatest();
        } else {//加载各分类内容
            const res = await util.ajax({
                url: `theme/${id}`
            })
            const { stories } = res;
            this.setState({
                stories,
                topStories: '',
                background: {
                    image: res.background,
                    desc: res.description
                },
                loadingMore: false
            });
        }
    }

    goDetail = (id) => {
        const { navigation } = this.props;
        navigation.navigate('articleDetail', { id })
    }
    onRefresh = async () => {
        const id = this.state.themeId;
        this.state.stories = [];
        this.state.topStories = [];
        if (id == -99) {//加载首页内容
            await this.getLatest();
            this.setState({
                isRefreshing: false
            });
        } else {//加载各分类内容
            const res = await util.ajax({
                url: `theme/${id}`
            })
            const { stories } = res;
            this.setState({
                stories,
                topStories: '',
                background: {
                    image: res.background,
                    desc: res.description
                },
                loadingMore: false,
                isRefreshing: false
            });
        }
    }

    render() {
        const { topStories, stories, loadingMore, lastDay, themeId, title } = this.state;
        const { navigation } = this.props;
        console.log(stories);
        return (
            <View style={{ flex: 1, }}>
                <Loading></Loading>
                <Header left={(
                    <Button transparent onPress={() => {
                        navigation.navigate('DrawerOpen')
                    }}>
                        <Icon name='menu' />
                    </Button>
                )}
                    right={(
                        <Grid>
                            <Col />
                            <Col>
                                <View style={{ justifyContent: 'center' }}>
                                    <Button transparent>
                                        <Icon name='md-notifications' />
                                    </Button>
                                </View>
                            </Col>
                            <Col>
                                <View style={{ justifyContent: 'center' }}>
                                    <Button transparent>
                                        <Icon name='md-more' />
                                    </Button>
                                </View>
                            </Col>
                        </Grid>
                    )}
                    title={title}

                />
                <Content style={[styles.list]} refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onRefresh}
                    />
                }>

                    <View style={styles.wrapper}>
                        {!topStories.length ? (
                            <ImageBlock desc={this.state.background.desc} image={this.state.background.image} />
                        ) : (
                                <Swiper paginationStyle={{ bottom: 5 }}>
                                    {topStories.map(item => {
                                        return (
                                            <TouchableNativeFeedback key={item.id} onPress={() => {
                                                console.log(321);
                                                this.goDetail(item.id);
                                            }}>
                                                <View>
                                                    <ImageBlock desc={item.title} image={item.image} />
                                                </View>
                                            </TouchableNativeFeedback>

                                        )
                                    })}
                                </Swiper>
                            )}
                    </View>
                    <List style={[commonStyle.reset, styles.list]}>
                        {stories.map(item => {
                            return item.dateStr ? (//显示日期
                                <View key={item.id}>
                                    <Text style={[styles.date_str]}>{moment(item.dateStr).format('MM月DD日')}</Text>
                                </View>
                            ) : (//显示内容
                                    <TouchableNativeFeedback key={item.id} onPress={() => {
                                        this.goDetail(item.id);
                                    }}>
                                        <ListItem style={[styles.article]}>
                                            <Body style={[styles.acticle_title_wrap]}>
                                                <Text numberOfLines={3} style={[styles.acticle_title]} note>{item.title}</Text>
                                            </Body>
                                            {item.images && (<Thumbnail square size={80} source={{ uri: item.images[0] }} />)}

                                        </ListItem>
                                    </TouchableNativeFeedback>
                                )
                        })}
                        {themeId == -99 && (
                            <ListItem itemDivider>
                                <Grid style={{ height: 50, alignItems: 'center' }}>
                                    <Col />
                                    <Col>
                                        <TouchableNativeFeedback onPress={this.loadBefore}>
                                            <Text
                                                style={[commonStyle.text_center]}>{loadingMore ? '加载中' : '点击加载更多'}</Text>
                                        </TouchableNativeFeedback>

                                    </Col>
                                    {loadingMore && (
                                        <Col>
                                            {<Spinner color='blue' />}
                                        </Col>
                                    )}
                                    <Col />
                                </Grid>
                            </ListItem>
                        )}
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
    date_str: {
        paddingLeft: 17,
        alignItems: 'center'
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