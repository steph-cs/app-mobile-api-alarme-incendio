import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home'
import EnviarScreen from './components/Enviar'
import HistoricoScreen from './components/Historico'


const Stack = createNativeStackNavigator();
 
export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouterName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Enviar" component={EnviarScreen}/>
        <Stack.Screen name="Historico" component={HistoricoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
