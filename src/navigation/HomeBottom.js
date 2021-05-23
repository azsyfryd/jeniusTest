import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
	View,
	Image
} from 'react-native'
import Dial from '../page/home/dial/dial'
import Contact from '../page/home/contact/contact'


const Tab = createBottomTabNavigator();
const style = {headerShown:false,gestureEnabled: false}

function HomeBottom() {
  return (
		<Tab.Navigator screenOptions={{gestureEnabled: false}} 
			tabBarOptions={{
				labelStyle:{paddingBottom : 5},
				// style:{paddingTop : 5},
			}}
		>
			<Tab.Screen 
				name="Contact" 
				component={Contact}
			/>
			<Tab.Screen 
				name="Dial" 
				component={Dial}
			/>
		</Tab.Navigator>
  );
}

export default HomeBottom;