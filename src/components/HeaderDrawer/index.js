import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import {useNavigation} from '@react-navigation/native'

import {Container, ButtonMenu} from './style'

export default function Header() {

 const navigation = useNavigation()

 return (
   <Container>
       <ButtonMenu onPress={() => navigation.toggleDrawer()}>
           <Icon name='bars' color='#FFF' size={25} />
       </ButtonMenu>
   </Container>
  );
}