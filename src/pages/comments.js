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
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { observable, action } from "mobx";
import { inject, observer } from "mobx-react";
import Header from '../components/header';
import util from '../common/util';
import commonStyle from '../common/style';

@inject("articleExtraStore") @inject("uiStore") @observer
class Comments extends Component {
    state = {
        comments: 0,
        longComments: [],
        shortComments: [],
        contentStyle: {

        }
    }
    constructor(props) {
        super(props);
    }
    //生命周期
    componentDidUpdate(prevProps, prevState){
        if(prevState.shortComments!=this.state.shortComments){
            this.props.uiStore.setStatus('loading', false);
                console.log('componentDidUpdate');
                console.log(this.scrollView._root);
                this.scrollView._root.scrollToEnd(0, this.state.contentStyle.height);
        }
    }
    componentDidMount() {
        this.getComments();
    }
    //生命周期
    getComments = async (type = 'long') => {
        if(this.state[`${type}Comments`].length==0){
            if (type == 'short') {
                this.props.uiStore.setStatus('loading', true);
            };
            const { params } = this.props.navigation.state;
            const data = await util.ajax({
                url: `story/${params.id}/${type}-comments`
            });
            this.setState({
                [`${type}Comments`]: data.comments
            });
            
        }else{
            this.scrollView._root.scrollToPosition(0, this.state.contentStyle.height);
        }
       


    }
    
    contentViewScroll = (e) => {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            console.log('上传滑动到底部事件')
        }
    }
    getContentStyle = (e) => {
        this.setState({
            contentStyle: {
                height: e.nativeEvent.layout.height
            }
        })
    }
    render() {
        const { longComments, shortComments } = this.state;
        const { id } = this.props.navigation.state.params;
        const { comments, long_comments, short_comments } = this.props.articleExtraStore.extras[id];
        const CommentItem = ({ avatar, author, content }) => {
            return (
                <Grid>
                    <Col size={1}>
                        <Thumbnail style={[styles.head_img]} source={{ uri: avatar }} />
                    </Col>
                    <Col size={10}>
                        <Text style={[styles.author]}>{author}</Text>
                        <Text style={[styles.content_detail]} note>{content}</Text>
                    </Col>
                </Grid>
            )
        }
        return (
            <View style={[commonStyle.wrap]}>
                <Header title={`${comments}条评论`}></Header>
                <Content ref={ref => this.scrollView = ref} onMomentumScrollEnd={this.contentViewScroll} style={[commonStyle.wrap, styles.content]} >
                    <View  onLayout={this.getContentStyle}>
                        <List>
                            <ListItem>
                                <Text>
                                    {`${long_comments}条长评`}
                                </Text>
                            </ListItem>
                            {
                                longComments.map(item => {
                                    return (
                                        <ListItem avatar key={item.id}>
                                            <CommentItem  {...item}></CommentItem>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </View>
                    <View>
                        <List ref={ref=>this.list=ref}> 
                            <ListItem>
                                <TouchableNativeFeedback onPress={() => {
                                    this.getComments('short');
                                }}>
                                    <Text>
                                        {`${short_comments}条短评`}
                                    </Text>
                                </TouchableNativeFeedback>

                            </ListItem>
                            {
                                shortComments.map(item => {
                                    return (
                                        <ListItem avatar key={item.id}>
                                            <CommentItem  {...item}></CommentItem>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </View>

                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff'
    },
    head_img: {
        width: 30,
        height: 30,
        marginTop: 13
    },
    content_detail: {
        fontSize: 16,
        lineHeight: 30,
        fontWeight: '600',
        paddingRight: 15,
        paddingLeft: 15
    },
    author: {
        fontSize: 16,
        lineHeight: 30,
        fontWeight: '600',
        paddingLeft: 15
    }
});

export default Comments;