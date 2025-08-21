import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FDEDEC',
  },

  title: {
    textAlign: 'center',
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#922B21',
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
    marginLeft: 10,
    marginRight: 30,
    marginTop: 20,
  },

  localLogradouro: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  botao: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});