import React from 'react';
import {Button} from '@rneui/themed';

// Colocar no slide
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
  
  // Função chamada ao clicar no botão "Procurar"
  const handleSearch = async () => {
    // Verifica se o campo de CEP foi preenchido
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
      // Busca por CEP
      url = `https://viacep.com.br/ws/${cep}/json/`;
    } else if (uf && localidade && logradouro) {
      // Busca por endereço completo
      url = `https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json/`;
    }

    const resposta = await fetch(url);
    const json = await resposta.json();

      // Se o CEP não existir, a API retorna um campo "erro: true"
      if (json.erro || json.lenght === 0) {
        setError({ message: 'CEP não encontrado!' });
        setData(null);
      } else {
        setData(Array.isArray(json) ? json[0] : json);
        salvandoDados(Array.isArray(json) ? json[0] : json);
      }
    } catch (err) {
      setError(err); // Captura erro de rede ou falha na requisição
      setData(null);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  }

  return (
    <Button title="Procurar" color="green" onPress={handleSearch}> Pesquisar
</Button>
  )
};

export default HandleSearch;
