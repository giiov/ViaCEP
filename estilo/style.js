import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FDEDEC',
  },

  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#922B21',
  },

  titleLine: {
  width: 80,
  height: 3,
  backgroundColor: "#922B21",
  alignSelf: "center",
  borderRadius: 2,
  marginBottom: 20,
},

  forms: {
    margin: 30,
  },

  input: {
    height: 40,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color:'#2C3E50',
  },

  localContainer: {
    marginLeft: 10,
    marginRight: 30,
    marginTop: 20,
  },

  localLogradouro: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  botao: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

});
