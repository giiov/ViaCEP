import React from 'react';
import {Button} from '@rneui/themed';
 
const LimparCampos = ({
  setCep,
  setUf,
  setLocalidade,
  setLogradouro,
  setData
}) => {
 
  // Função para calcular a multiplicação dos números
  const limparCampos = () => {
    setCep('');
    setUf('');
    setLocalidade('');
    setLogradouro('');
    setData('');
  }
 
return (
    <Button title="Limpar" color="#C0392B" onPress={limparCampos}> Limpar:
</Button>
  )
 
};
 
export default LimparCampos;
