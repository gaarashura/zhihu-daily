import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ProgressBar } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import Modal from './modal';
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

class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <Modal modalVisible={this.props.status} touchBg={() => {
                console.log('touchBg');
                this.props.toggleLoading(false);
            }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <View style={{ width: '70%', height: 100, backgroundColor: '#fff' }}>
                        <Spinner />
                    </View>
                </View>
            </Modal>
        );
    }
}

const LoadingWrap = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loading);

export default LoadingWrap;