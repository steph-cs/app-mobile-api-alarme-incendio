import React, {Component} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ToastAndroid } from 'react-native';



export default class EnviarScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      id : null,
      indiceGas: null,
     temperatura: null,
     showToast : () => {
      ToastAndroid.show("Parametros enviados", ToastAndroid.SHORT)}
    }
  }

  
  render(){
    const { navigate } = this.props
    const indiceGas = this.state.indiceGas
    const temperatura = this.state.temperatura
    let id = this.state.id
    const toast = this.state.showToast
    

    async function enviar () {
      let data = new Date()
      let response = await fetch('http://192.168.0.8:8000/ParamAlarme',{
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        indiceGas: indiceGas,
        temperatura: temperatura,
        dia: data.toLocaleDateString(),
        hora: data.toLocaleTimeString()
      })
      })
      
      toast()
      return response
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Parametros alarme:</Text>
          <View style={styles.form}>
          <Text style={styles.texto}>Id:</Text>
            <TextInput placeholder='Id' keyboardType='numeric' style={styles.input} onChangeText={txt => this.setState({id: txt})}/>
            <Text style={styles.texto}>Indice gás:</Text>
            <TextInput placeholder='Indice gás' keyboardType='numeric' style={styles.input} onChangeText={txt => this.setState({indiceGas: txt})}/>
            <Text style={styles.texto}>Temperatura:</Text>
            <TextInput placeholder='Temperatura' keyboardType='numeric' style={styles.input} onChangeText={txt => this.setState({temperatura: txt}) }/>
            <TouchableOpacity style={styles.button}
             onPress={ t => enviar() }>
              <Text style={styles.textButton}>Enviar</Text>
            </TouchableOpacity>
          </View>
          
        </View>
    )
    }
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
  