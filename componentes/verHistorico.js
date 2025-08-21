import React from 'react';
import {Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  setError,
  setBotao
}) => {
  const verHistorico = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@historico_pesquisas');
    if (jsonValue != null) {
      const lista = JSON.parse(jsonValue);
      setHistorico(lista.reverse()); // mostra da mais recente à mais antiga
      setError(null);
      setBotao(true);
    } else {
      setError({ message: 'Nenhuma pesquisa anterior encontrada.' });
      setHistorico([]);
      setBotao(false) // função do botão de limpar hisórico
    }
  } catch (e) {
    console.error('Erro ao recuperar histórico:', e);
    setError({ message: 'Erro ao recuperar histórico.' });
    setHistorico([]);
    setBotao(false);
  }
}

return (
   <Button title="Ver Histórico" onPress={verHistorico} />
  )

};


export const LimparHistorico = ({ setHistorico, setError, setBotao }) => {
  const limparHistorico = async () => {
    try {
      await AsyncStorage.removeItem('@historico_pesquisas');
      setHistorico([]);
      setError(null);
      setBotao(false);
      console.log('Histórico apagado');
    } catch (e) {
      console.error('Erro ao limpar histórico', e);
      setError({ message: 'Erro ao limpar o histórico' });
    }
  };

  return <Button title="Limpar Histórico" onPress={limparHistorico} />;
};
