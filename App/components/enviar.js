
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alarme Incendio</Text>
      <View style={styles.form}>
        <Text style={styles.texto}>Indice gás:</Text>
        <TextInput placeholder='Indice gás' keyboardType='numeric' style={styles.input}/>
        <Text style={styles.texto}>Temperatura:</Text>
        <TextInput placeholder='Temperatura' keyboardType='numeric' style={styles.input}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
      
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: 80,
    backgroundColor: '#e0e5e5',
    
  },
  texto:{
    marginBottom:10,
    fontSize:18,
  },
  title:{
    fontSize: 25,
    fontWeight:'bold',
    color: '#e50000',
    textAlign: "center",
  },
  form: {
    width:"100%",
    height:"100%",
    bottom: 0,
    marginTop:40,
    paddingTop: 30,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingLeft: 20,
    backgroundColor: '#ffffff',
  },
  input:{
    width: "90%",
    backgroundColor: '#e0e5e5',
    marginBottom:10,
    padding:5,
    borderRadius:20,

  },
  textButton:{
    fontSize: 20,         
    color: '#ffff',
    fontWeight: '700'
  },
  button:{
    width: "90%",
    alignItems:"center",
    margin:30,
    marginLeft:10,
    padding:15,
    borderRadius:50,
    backgroundColor: '#ff0043',
  },
});
