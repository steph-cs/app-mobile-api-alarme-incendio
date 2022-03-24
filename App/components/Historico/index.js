import React, {Component} from 'react';
import { RefreshControl, View, Text, FlatList, StyleSheet } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default class HistoricoScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      hist : [],
      response : fetch('http://192.168.0.8:8000/Alarme') .then((response) => response.json()).then((json) =>{this.setState({hist:json})}) ,
      refreshing:false,
      onRefresh : async() => {
        this.setState({refreshing:true})
        await fetch('http://192.168.0.8:8000/Alarme') .then((response) => response.json()).then((json) =>{this.setState({hist:json})}) 
        wait(1000).then(() => this.setState({refreshing:false}))
      },
    
    }
  }
  render(){
    const { navigate } = this.props
    const refreshing = this.state.refreshing
    const onRefresh = this.state.onRefresh
    const data = new Date().toLocaleString()
    const hist = this.state.hist.sort((a,b)=>((a.dia > b.dia) ? -1: (a.dia < b.dia) ? 1 : ((a.dia == b.dia) ? ((a.hora > b.hora ) ? -1 : (a.hora < b.hora ) ? 1 : 0) : 0)))
    
    function Item({item}){
      return(
        <View style={styles.lista}>
          <View style={styles.data}>
              <Text style={styles.texto}>Dia: {item.dia}</Text>
              <Text style={styles.texto}>Hora: {item.hora}</Text>
          </View>
          <View style={styles.divRow}>
            <View style={styles.divCol}>
              <Text style={styles.texto}>Indice gas: {item.indiceGas}</Text>
              <Text style={styles.texto}>Temperatura: {item.temperatura}</Text>
            </View>
            <View style={styles.divCol}>
              <Text style={styles.status}>Status: {item.status}</Text>
            </View>
          </View>
          
        </View>
      )
    }
    
    return (
      <View style={styles.container}>
          <Text style={styles.title}>Historico registros:</Text>
          <View style={styles.form}>
            <FlatList
            keyExtractor={item => item.id}
            data={hist}
            renderItem={({item}) => <Item item={item}/>}
            refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}/>}
            />
          </View>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"90%",
    bottom: 0,
    paddingTop: 60,
    backgroundColor: '#e0e5e5',
    
  },
  
  title:{
    fontSize: 25,
    fontWeight:'bold',
    color: '#e50000',
    textAlign: "center",
  },
  status:{
    fontSize: 20,
    fontWeight:'bold',
    color: '#e50000',
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
    paddingRight: 20,
    backgroundColor: '#ffffff',
  },
  lista:{
    display:"flex",
    flexDirection:"column",
    
    marginBottom:20,
    paddingTop: 5,
    paddingBottom: 5,
    borderColor: 'grey',
    borderWidth: 1.5,
    borderRadius: 10,
  },
  data: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-around",
  },
  divRow:{
    width:"100%",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  divCol:{
    width:"50%",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  texto:{
    marginBottom:10,
    fontSize:16,
  },
});