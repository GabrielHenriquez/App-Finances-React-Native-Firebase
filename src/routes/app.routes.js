import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'

import Home from '../pages/Home'
import New from '../pages/New'
import Profile from '../pages/Profile'
import CustomDrawer from '../components/CustomDrawer'

const Drawer = createDrawerNavigator()

function AppRoutes(){
    return(
        <Drawer.Navigator
        drawerContent={props => <CustomDrawer {...props} />}
        screenOptions={{
            drawerStyle: {
              backgroundColor: '#171717',
              width: 240
            },
            drawerLabelStyle:{
                fontWeight: 'bold'
            },
            drawerActiveTintColor: '#FFF',
            drawerActiveBackgroundColor: '#00b94a',
            drawerInactiveBackgroundColor: '#000',
            drawerInactiveTintColor: '#DDD',
            drawerItemStyle:{
                marginVertical: 5
            },
            headerShown: false
          }}
          
        >
            <Drawer.Screen name='Home' component={Home}/>
            <Drawer.Screen name='Register' component={New}/>
            <Drawer.Screen name='Profile' component={Profile}/>
            
        </Drawer.Navigator>
    )
}

export default AppRoutes;