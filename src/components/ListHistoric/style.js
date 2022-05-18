import styled from 'styled-components/native'

export const Container = styled.View`
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 2px 2px rgba(0,0,0, 0.45);
    background-color: rgba(0,0,0,0.10);
    border-radius: 5px;
`

export const Tipo = styled.View`
    flex-direction: row;
`

export const IconView = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: ${props => props.tipo === 'Receita' ? '#049301' : '#c62c36'};
    padding-bottom: 3px;
    padding-top: 3px;
    padding-left: 8px;
    padding-right: 10px;
    border-radius: 7px;
`

export const TipoText = styled.Text`
    color: #FFF;
    font-size: 16px;
    font-style: italic;
    margin-left: 5px;
`

export const ValorText = styled.Text`
    color: #222;
    font-size: 22px;
    font-weight: bold;
`

