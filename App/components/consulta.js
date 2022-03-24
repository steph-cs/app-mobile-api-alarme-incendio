
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico:</Text>
      <View style={styles.lista}>
        <Text>elementos</Text>
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
  title:{
    fontSize: 25,
    fontWeight:'bold',
    color: '#e50000',
    textAlign: "center",
  },
  lista: {
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
});
