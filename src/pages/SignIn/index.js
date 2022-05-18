
//Imports

import React, {useState, useContext} from 'react';
import {Platform, ActivityIndicator, StyleSheet} from 'react-native';
import {Background,Container,AreaInput,Input,SubmitButton,
SubmitText,Link,LinkText} from './style'
import {useNavigation} from '@react-navigation/native'
import {AuthContext} from '../../contexts/auth'
import * as Animatable from 'react-native-animatable'


//Aplication
export default function SignIn() {

//States 
 const navigation = useNavigation()

 const [email, setEmail] = useState('')
 const [password, setPassword] = useState('')

 const {signIn, loadingAuth} = useContext(AuthContext)

 //Functions

 function handleLogin(){
  signIn(email, password)
 }
 
 return (
   <Background>

       <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
       >

        <Animatable.Image
          style={style.logo} 
          animation='flipInY'
          delay={500}
          source={require('../../assets/Logo.png')}
        />

        <Animatable.View animation='fadeInUp' delay={1000} style={style.container}>
          
          <AreaInput>
            <Input 
              placeholder='Email'
              autoCorrect={false}
              autoCapitalize='none'
              value={email}
              onChangeText={text => setEmail(text)}
            />      
          </AreaInput>

          <AreaInput>
            <Input 
              placeholder='Senha'
              autoCorrect={false}
              autoCapitalize='none'
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
            />      
          </AreaInput>

          <SubmitButton onPress={handleLogin}>
            {
              loadingAuth ? (
                <ActivityIndicator size={20} color='#FFF'/>
              ) : (
                <SubmitText>Acessar</SubmitText>
              )
            }
          </SubmitButton>

          <Link onPress={() => navigation.navigate('SignUp')}>
            <LinkText>Criar uma conta</LinkText>
          </Link>

        </Animatable.View> 

       </Container>

   </Background>
  );
}


const style = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    marginBottom: 25
  }
})