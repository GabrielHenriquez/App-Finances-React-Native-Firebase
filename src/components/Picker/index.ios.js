import React from 'react'
import { PickerView } from './style'
import { Picker as RNPickerSelect } from '@react-native-picker/picker'

export default function Picker({ onChange, tipo }) {
    return (
        <PickerView>
            <RNPickerSelect
                style={{
                    width: '100%'
                }}
                selectedValue={tipo}
                onValueChange={valor => onChange(valor)}
            >
                <RNPickerSelect.Item label='Receita' value='Receita' color='#222' />
                <RNPickerSelect.Item label='Despesa' value='Despesa' color='#222'/>

            </RNPickerSelect>
        </PickerView>
    )
}