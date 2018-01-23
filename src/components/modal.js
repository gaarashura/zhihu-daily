import React, { Component } from 'react';
import { Modal, View, Text, TouchableHighlight, ProgressBar } from 'react-native';

export default class ModalComponent extends Component {
    state = { modalVisible: true }
    constructor(props) {
        super(props);
    }
    render() {
        const { children } = this.props;
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    this.setState({
                        modalVisible: false
                    });
                }}
                {...this.props}
            >

                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableHighlight style={{flex:1,width:'100%'}} onPress={this.props.touchBg}>
                        {children}
                    </TouchableHighlight>
                </View>

            </Modal>
        )
    }

}