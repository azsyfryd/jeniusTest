import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Splash from '../page/splash'
import HomeBottom from '../navigation/HomeBottom'

const Stack = createStackNavigator();
const style = {headerShown:false}

function App(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name={'Splash'} component={Splash} options={style} />
                <Stack.Screen name={'HomeBottom'} component={HomeBottom} options={style} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App;