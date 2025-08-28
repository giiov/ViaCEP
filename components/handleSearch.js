import React from 'react';
import { Button } from '@rneui/themed';

const HandleSearch = ({
  cep,
  uf,
  localidade,
  logradouro,
  setError,
  setData,
  setLoading,
  salvandoDados
}) => {
  const handleSearch = async () => {
    if (!cep && (!uf || !localidade || !logradouro)) {
      setError({ message: 'Informe um CEP válido!' });
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = '';
      if (cep) {
        url = `https://viacep.com.br/ws/${cep}/json/`;
      } else {
        url = `https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json/`;
      }

      const resposta = await fetch(url);
      const json = await resposta.json();

      if (!json || json.erro || (Array.isArray(json) && json.length === 0)) {
        setError({ message: 'CEP não encontrado!' });
        setData(null);
      } else {
        const resultado = Array.isArray(json) ? json : [json];
        setData(resultado);
        salvandoDados(resultado);
      }
    } catch (err) {
      setError({ message: 'Erro na requisição. Tente novamente.' });
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button title="Pesquisar" color="#922B21" onPress={handleSearch}>
      Pesquisar
    </Button>
  );
};

export default HandleSearch;
