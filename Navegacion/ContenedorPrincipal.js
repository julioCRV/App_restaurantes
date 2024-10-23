import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ListaRestaurantes from './screens/ListaRestaurantes';
import Nosotros from './screens/Nosotros';

//Screen names
const InicioRestaurante = "Restaurantes";
const DetallesNosotros = "Nosotros";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={InicioRestaurante}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === InicioRestaurante) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === DetallesNosotros) {
              iconName = focused ? 'list' : 'list-outline';

            } 

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={InicioRestaurante} component={ListaRestaurantes} />
        <Tab.Screen name={DetallesNosotros} component={Nosotros} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;