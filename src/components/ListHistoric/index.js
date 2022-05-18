import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import {Container, Tipo, IconView, TipoText, ValorText} from './style'

export default function ListHistoric({data, deleteItem}) {
 return (
   <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
    <Container>
        <Tipo>
          <IconView tipo={data.tipo}>
            <Icon 
              name={data.tipo === 'Despesa' ? 'arrow-down' : 'arrow-up'} 
              color='#FFF'
              size={18} 
            />
            <TipoText>{data.tipo}</TipoText>
          </IconView>
        </Tipo>

        <ValorText>R$ {data.valor.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</ValorText>
    </Container>
   </TouchableWithoutFeedback>
  );
}