import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';

// Importando os componentes
import HandleSearch from './components/handleSearch';
import LimparCampos from './components/LimparCampos';
import { salvandoDados, VerHistorico, LimparHistorico } from './components/verHistorico';
import { styles } from './estilo/style';

const App = () => {
  // Estados para armazenar os dados da API e controlar os inputs
  const [data, setData] = useState(null); // Resposta do ViaCEP
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [error, setError] = useState(null); // Erro, se houver
  const [cep, setCep] = useState(''); // CEP informado pelo usuário
  const [uf, setUf] = useState ('');
  const [localidade, setLocalidade] = useState ('');
  const [logradouro, setLogradouro] = useState ('');
  const [historico, setHistorico] = useState([]);
  const [botao, setBotao] = useState(false); //adicionar estado para o botão

  // Função para preencher os campos
  const preencherCampos = (item) => {
    setCep(item.cep);
    setUf(item.uf);
    setLocalidade(item.localidade);
    setLogradouro(item.logradouro);
  }

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

<View style={styles.botao}>
          <HandleSearch
            cep={cep}
            uf={uf}
            localidade={localidade}
            logradouro={logradouro}
            setError={setError}
            setData={setData}
            setLoading={setLoading}
            salvandoDados={salvandoDados}
            onPress={salvandoDados}
          />
          <LimparCampos
              setCep={setCep}
              setUf={setUf}
              setLocalidade={setLocalidade}
              setLogradouro={setLogradouro}
              setData={setData}
          />
          <VerHistorico
            setHistorico={setHistorico}
            setError={setError}
            setBotao={setBotao}
          />

              {botao && (
            <LimparHistorico
            setHistorico={setHistorico}
            setError={setError}
            setBotao={setBotao}
            />
            )} 
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

      {historico.length > 0 && (
  <View style={styles.localContainer}>
    <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Histórico de Pesquisas:</Text>
    {historico.map((item, index) => (
      <View key={index} style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
        <Text onPress={() => preencherCampos(item)}>CEP: {item.cep}</Text>
<Text onPress={() => preencherCampos(item)}>Logradouro: {item.logradouro}</Text>
<Text onPress={() => preencherCampos(item)}>Bairro: {item.bairro}</Text>
<Text onPress={() => preencherCampos(item)}>Cidade: {item.localidade}</Text>
<Text onPress={() => preencherCampos(item)}>Estado: {item.uf}</Text>
<Text onPress={() => preencherCampos(item)}>DDD: {item.ddd}</Text>

      </View>
    ))}
  </View>
)}
</View>
    </ScrollView>
  );
};


export default App;
