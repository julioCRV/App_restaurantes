import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import ListaRestaurantes from './screens/ListaRestaurantes';
import Nosotros from './screens/Nosotros';
import DetallesRestaurante from './screens/DetallesRestaurante';

// Screen names
const InicioRestaurante = "Restaurantes";
const DetallesNosotros = "Nosotros";

// Crear los navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegador de pila para la pestaña de Restaurantes
function RestaurantesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaRestaurantes"
        component={ListaRestaurantes}
        options={{ title: 'Restaurantes' }}
      />
      <Stack.Screen
        name="DetallesRestaurante"
        component={DetallesRestaurante}
        options={{ title: 'Detalles' }}
      />
    </Stack.Navigator>
  );
}

// Navegador principal de pestañas
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

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 70 },
        })}
      >
        <Tab.Screen name={InicioRestaurante} component={RestaurantesStack} options={{ headerShown: false }} />
        <Tab.Screen name={DetallesNosotros} component={Nosotros} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
