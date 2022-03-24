import React, {Component} from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state ={
        estado : null,
        paramGas : null,
        paramTemp : null,
        refreshing:false,
        getParam : fetch('http://192.168.0.8:8000/ParamAlarme') .then((response) => response.json()).then((json) =>{json.length >= 1? this.setState({paramGas:json[json.length - 1].indiceGas, paramTemp:json[json.length - 1].temperatura }): "0" }) ,
        getAlarme : fetch('http://192.168.0.8:8000/Alarme') .then((response) => response.json()).then((json) =>{json.length >= 1? this.setState({estado:json[json.length - 1].status}): "desativado" }) ,
        
        onRefresh : async() => {
          this.setState({refreshing:true})
          await fetch('http://192.168.0.8:8000/Alarme') .then((response) => response.json()).then((json) =>{json.length >= 1? this.setState({estado:json[json.length - 1].status}): "desativado" })
          await fetch('http://192.168.0.8:8000/ParamAlarme') .then((response) => response.json()).then((json) =>{json.length >= 1? this.setState({paramGas:json[json.length - 1].indiceGas, paramTemp:json[json.length - 1].temperatura }): "0" }) 
          
          wait(1000).then(() => this.setState({refreshing:false}))},
     
        }
        
      }
      render(){
        const {navigate} = this.props.navigation
        const refreshing = this.state.refreshing
        const onRefresh = this.state.onRefresh
        const status = this.state.estado
        const paramGas = this.state.paramGas
        const paramTemp = this.state.paramTemp

        console.log(status)
        return (
            <SafeAreaView style={styles.container}>
              
              <ScrollView
                contentContainerStyle={styles.scroll}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <Text style={styles.title}>Parametros Alarme:</Text>
                <Text style={styles.title}>I.Gas: {paramGas}     Temp.: {paramTemp}</Text>
                <Text style={styles.title}>Status: {status} </Text>
                <View style={styles.form}>
                  <TouchableOpacity style={styles.button}
                  onPress={() => navigate('Enviar')}>
                    <Text style={styles.textButton}>Enviar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}
                  onPress={() => navigate('Historico')}>
                    <Text style={styles.textButton}>Consultar</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </SafeAreaView>
            
          );
      }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#e0e5e5',
  
  },
  scroll: {
    flex: 1,
    
  
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
