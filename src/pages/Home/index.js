import React, { useContext, useState, useEffect } from 'react';
import Header from '../../components/HeaderDrawer';
import { Alert, TouchableOpacity, Platform } from 'react-native'
import ListHistoric from '../../components/ListHistoric';
import firebase from '../../services/firebaseConnection';
import { format, isBefore } from 'date-fns'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DatePicker from '../../components/DatePicker';

import { AuthContext } from '../../contexts/auth';
import { Background, Container, Nome, Saldo, Title, List, Area } from './style';

export default function Home() {

  const { user } = useContext(AuthContext)
  const uid = user && user.uid

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)
  const [newDate, setNewDate] = useState(new Date())
  const [show, setShow] = useState(false)

  //Monitora a data para saber se tem itens novos, e renderiza os dados na tela
  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('user').child(uid).on('value', snapshot => {
        setSaldo(snapshot.val().saldo)
      })

      await firebase.database().ref('historico').child(uid)
        .orderByChild('data').equalTo(format(newDate, 'dd/MM/yyyy'))
        .limitToLast(10).on('value', snapshot => {
          setHistorico('')
          snapshot.forEach(childItem => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().data
            }

            setHistorico(oldArray => [...oldArray, list].reverse())
          })
        })
    }

    loadList()
  }, [newDate])

  //Organiza as datas para que as que sejam removidas, sejam independente da hora
  //Se caso o item for antes da data atual, questiona se quer deletar.
  function handleDelete(data) {

    //Pegando data do item:
    const [diaItem, mesItem, anoItem] = data.date.split('/')
    const dataItem = new Date(`${anoItem}/${mesItem}/${diaItem}`)
    console.log(dataItem)

    //Pegando data de hoje:
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy')
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/')

    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`)

    if (isBefore(dataItem, dateHoje)) {
      alert('Voce nao pode excluir um registro antigo')
      return
    }

    Alert.alert(
      'Cuidado Atenção',
      `Você deseja excluir ${data.tipo} - Valor ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSucess(data)
        }
      ]
    )
  }

  //Se caso optar por deletar
  async function handleDeleteSucess(data) {
    await firebase.database().ref('historico').child(uid)
      .child(data.key).remove()
      .then(async () => {
        let saldoAtual = saldo
        data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor)

        await firebase.database().ref('user').child(uid).child('saldo').set(saldoAtual)
          .catch(error => {
            alert('Error: ' + error)
          })
      })
  }

  //Mostra o Calendário Picker
  function handleShowPicker() {
    setShow(true)
  }

  //Fecha o calendário Picker no IOS
  function handleClose() {
    setShow(false)
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios')
    setNewDate(date)
  }

  return (
    <Background>
      <Header />

      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
      </Container>

      <Area>
        <TouchableOpacity onPress={handleShowPicker}>
          <Icon name='event' size={30} color='#FFF' />
        </TouchableOpacity>
        <Title>Últimas movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => <ListHistoric data={item} deleteItem={handleDelete} />}
      />

      {show && (
        <DatePicker
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
      )}

    </Background>
  );
}  