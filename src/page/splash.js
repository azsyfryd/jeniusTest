import React, { Component } from 'react'
import { 
    View,
    Text,
} from 'react-native'

export class Splash extends Component {

    componentDidMount(){
        setTimeout(()=>{
            this.props.navigation.replace('HomeBottom')
        },2000)
    }

    render() {
        return (
            <View style={{flex : 1,justifyContent : 'center', alignItems : 'center'}}>
                <Text>splash screen</Text>
            </View>
        )
    }
}

export default Splash
