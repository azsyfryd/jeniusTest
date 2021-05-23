import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
}from 'react-native'
import {D} from '../variable/dimension'
export class header extends Component {
    render() {
        return (
            <View>
                <View style={style.container}>
                    <Text style={style.textHead}>{this.props.text!=undefined? this.props.text : ''}</Text>
                </View>
            </View>
        )
    }
}

const style=StyleSheet.create({
    container : {
        paddingVertical : 15,
        backgroundColor : '#03bafc',
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingHorizontal : D.width * 5/100
    },
    textHead : {
        fontSize : 20,
        color : 'white',
        fontWeight : 'bold'
    }
})

export default header
