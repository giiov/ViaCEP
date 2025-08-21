import React from 'react';
import {Button} from '@rneui/themed';

export const salvandoDados = async (novaPesquisa) => {
  try {
    const historicoAtual = await AsyncStorage.getItem('@historico_pesquisas');
    const historico = historicoAtual ? JSON.parse(historicoAtual) : [];

    historico.push(novaPesquisa); // adiciona nova pesquisa ao histórico

    await AsyncStorage.setItem('@historico_pesquisas', JSON.stringify(historico));
    console.log('Histórico atualizado!');
  } catch (e) {
    console.error('Erro ao salvar no histórico:', e);
  }
};

export const VerHistorico = ({
  setHistorico,
  setError
}) => {
  const verHistorico = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@historico_pesquisas');
    if (jsonValue != null) {
      const lista = JSON.parse(jsonValue);
      setHistorico(lista.reverse()); // mostra da mais recente à mais antiga
      setError(null);
    } else {
      setError({ message: 'Nenhuma pesquisa anterior encontrada.' });
      setHistorico([]);
    }
  } catch (e) {
    console.error('Erro ao recuperar histórico:', e);
    setError({ message: 'Erro ao recuperar histórico.' });
    setHistorico([]);
  }
}

return (
    <Button title="Historico" color="green" onPress={verHistorico}> Histórico
</Button>
  )

};
