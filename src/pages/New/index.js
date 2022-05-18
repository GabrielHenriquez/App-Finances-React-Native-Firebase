import React, { useState } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import Header from '../../components/HeaderDrawer';
import { Container, Input, SubmitButton, SubmitText } from './style'
import Picker from '../../components/Picker'
import firebase from '../../services/firebaseConnection'
import { format } from 'date-fns'
import {useNavigation} from '@react-navigation/native'

export default function New() {

  //States

  const navigation = useNavigation()
  const [valor, setValor] = useState('')
  const [tipo, setTipo] = useState('Receita')



  //Functions

  function handleSubmit() {
    Keyboard.dismiss()
    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert('Preencha todos os campos')
      return
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo: ${tipo} - Valor: ${parseFloat(valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  //Adicionando registro no banco de dados
  async function handleAdd() {
    let uid = await firebase.auth().currentUser.uid
    let key = await firebase.database().ref('historico').child(uid).push().key

    await firebase.database().ref('historico').child(uid).child(key).set({
      tipo,
      valor: parseFloat(valor),
      data: format(new Date(), 'dd/MM/yyyy')
    })

    //Atualizar o saldo
    let user = firebase.database().ref('user').child(uid)

    await user.once('value').then(snapshot => {
      let saldo = parseFloat(snapshot.val().saldo)

      tipo === 'Despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor)

      user.child('saldo').set(saldo)
    })

    Keyboard.dismiss()
    setValor('')
    navigation.navigate('Home') 
  }

  return (

    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header />
        <SafeAreaView style={{ alignItems: 'center' }}>

          <Input
            placeholder='Valor desejado'
            keyboardType='numeric'
            returnKeyType='next'
            value={valor}
            onSubmitEditing={() => Keyboard.dismiss()}
            onChangeText={text => setValor(text)}
          />

          <Picker onChange={setTipo} tipo={tipo} />

          <SubmitButton onPress={handleSubmit}>
              <SubmitText>Registrar</SubmitText>
          </SubmitButton>

        </SafeAreaView>
      </Container>
    </TouchableWithoutFeedback>
  );
}