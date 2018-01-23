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
import Header from '../components/header';
import util from '../common/util';
import commonStyle from '../common/style';
import { toggleLoading } from '../store/action';
const mapStateToProps = state => {
    return {
        status: state.globalLoading
    };
};
const mapDispatchToProps = dispatch => {
    return {
        toggleLoading: status => {
            dispatch(toggleLoading(status));
        }
    };
};
class Comments extends Component {
    state = {
        comments: 0,
        longComments: [],
        shortComments: []
    }
    constructor(props) {
        super(props);
    }
    getExtra = async () => {
        const { params } = this.props.navigation.state;
        const data = await util.ajax({
            url: `story-extra/${params.id}`
        })
        this.setState(data)
    }
    getComments = async (type = 'long') => {
        if (type == 'short') {
            this.props.toggleLoading(true);
        };
        const { params } = this.props.navigation.state;
        const data = await util.ajax({
            url: `story/${params.id}/${type}-comments`
        });
        this.setState({
            [`${type}Comments`]: data.comments
        })
        this.props.toggleLoading(false);
    }
    componentDidMount() {
        this.getExtra();
        this.getComments();
    }
    render() {
        const { comments, long_comments, short_comments, longComments, shortComments } = this.state;

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
                <Content style={[commonStyle.wrap, styles.content]} >
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

const CommentWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments);
export default CommentWrap;