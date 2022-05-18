//Imports

import React, { useState, useContext } from 'react';
import { Platform, ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable'
import {
  Background, Container, Logo, AreaInput, Input, SubmitButton,
  SubmitText, Link, LinkText } from '../SignIn/style'
import { AuthContext } from '../../contexts/auth';

//Aplication
export default function SignUp() {

  //States 

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp, loadingAuth } = useContext(AuthContext)

  //Functions

  function handleSignUp() {
    signUp(email, password, nome)
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >

        <Animatable.Text 
         style={style.textLogo}
         animation='flipInX'
         easing='ease-in-out'
         duration={1200}
         delay={600}
         >Finances SignUp
        </Animatable.Text>

        <Animatable.View animation='fadeInUp' delay={1000} style={style.container}>
          <AreaInput>
            <Input
              placeholder='Nome'
              autoCorrect={false}
              autoCapitalize='none'
              value={nome}
              onChangeText={text => setNome(text)}
            />
          </AreaInput>

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

          <SubmitButton onPress={handleSignUp}>
            {
              loadingAuth ? (
                <ActivityIndicator size={20} color='#FFF' />
              ) : (
                <SubmitText>Cadastrar</SubmitText>
              )
            }
          </SubmitButton>
          
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
  textLogo:{
    fontSize: 50,
    fontWeight: 'bold',
    color: '#00b94a',
    marginBottom: 40
  }
})