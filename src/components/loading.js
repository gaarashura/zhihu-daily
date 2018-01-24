import React, { Component } from 'react';
import { View, Text, TouchableHighlight, ProgressBar } from 'react-native';
import { Spinner } from 'native-base';
import { inject, observer } from "mobx-react";
import Modal from './modal';
@inject("uiStore") @observer
class Loading extends Component {

    constructor(props) {
        super(props);
        this.state = { modalVisible: false };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        const {status,setStatus}=this.props.uiStore;

        return (
            <Modal modalVisible={status.loading} touchBg={() => {
                setStatus('loading',false);
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



export default Loading;