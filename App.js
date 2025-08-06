import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

const App = () => {
  // Estados para armazenar os dados da API e controlar os inputs
  const [data, setData] = useState(null); // Resposta do ViaCEP
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [error, setError] = useState(null); // Erro, se houver
  const [cep, setCep] = useState(''); // CEP informado pelo usuário
  const [uf, setUf] = useState ('');
  const [localidade, setLocalidade] = useState ('');
  const [logradouro, setLogradouro] = useState ('');

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
      }
    } catch (err) {
      setError(err); // Captura erro de rede ou falha na requisição
      setData(null);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.forms}>
        <Text style={styles.title}>Consulta de CEP</Text>

        {/* Campo de entrada do CEP */}
        <TextInput
          style={styles.input}
          placeholder="Digite o CEP"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
        />

        {/* Campo de entrada do Endereço */}
        
        <TextInput
          style={styles.input}
          placeholder="Digite o UF"
          placeholderTextColor="gray"
          keyboardType="text"
          value={uf}
          onChangeText={setUf}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite a Cidade"
          placeholderTextColor="gray"
          keyboardType="text"
          value={localidade}
          onChangeText={setLocalidade}
        />

        <TextInput
          style={styles.input}
          placeholder="Digite o Logradouro"
          placeholderTextColor="gray"
          keyboardType="text"
          value={logradouro}
          onChangeText={setLogradouro}
        />

<View styles={styles.botao}>
        {/* Botão de busca */}
        <Button title="Procurar" color="royalblue" onPress={handleSearch} />
        <Button title="Limpar" color="red" />
</View>
      </View>

      {/* Exibe mensagem de erro se houver */}
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
          Erro: {error.message}
        </Text>
      )}

      {/* Exibe mensagem de carregamento */}
      {loading && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Carregando dados...
        </Text>
      )}

      {/* Exibe os dados obtidos da API ViaCEP */}
      {data && !loading && (
        <View style={styles.localContainer}>
          <Text style={styles.localLogradouro}>
          Logradouro: {data.logradouro}</Text>
          <Text>Bairro: {data.bairro}</Text>
          <Text>Cidade: {data.localidade}</Text>
          <Text>Estado: {data.uf}</Text>
          <Text>DDD: {data.ddd}</Text>
          <Text>CEP: {data.cep}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'royalblue',
  },

  forms: {
    margin: 30,
  },

  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
  },

  localContainer: {
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },

  localLogradouro: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  botao: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default App;
