import React from 'react';
import { View, Text, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomModal = (props) => {
    return (
        <Modal visible={props.showpopup} transparent={true} animationType={props.animation ? props.animation : 'fade'}
            animated hardwareAccelerated style={{ top: 0, flex: 1, zIndex: 100, elevation: 100, flex: 100 }}>
            <TouchableOpacity activeOpacity={0} onPress={() => props && props.onPress()} style={{ backgroundColor: '#333', opacity: props.semitransparent ? .6 : 0, flex: 100 }} />
                {props.content}
        </Modal>
    );
}

export default CustomModal;