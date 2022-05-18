import React, {useContext} from 'react';

import {Container, Nome , NewLink, NewText, Logout, LogoutText} from './style'
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/HeaderDrawer';

import {useNavigation} from '@react-navigation/native'

export default function Profile() {

 //States   
 const {signOut, user} = useContext(AuthContext)
 const navigation = useNavigation()

 return (
   <Container>
       <Header/>

      <Nome>
          {user && user.nome}
      </Nome>

      <NewLink onPress={() => navigation.navigate('Register')}>
          <NewText>Regristrar Gastos</NewText>
      </NewLink>

      <Logout onPress={signOut}>
          <LogoutText>Sair</LogoutText>
      </Logout>

   </Container>
  );
}