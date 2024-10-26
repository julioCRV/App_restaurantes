import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListaRestaurantes"
        component={ListaRestaurantes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetallesRestaurante"
        component={DetallesRestaurante}
        options={{
          title: ' ',
          headerTransparent: true,
          headerLeft: () => (
            <MaterialIcons
              name="arrow-back-ios-new" 
              size={24}
              color="#f5f5f6"
              onPress={() => navigation.navigate('ListaRestaurantes')}
              
            />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 20, // Ajusta este valor para mover el icono horizontalmente
          },
        }}
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
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (rn === DetallesNosotros) {
              iconName = focused ? 'people-sharp' : 'people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'grey',
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 12 },
          tabBarStyle: { padding: 10, height: 70, backgroundColor: '#0B0B0D', paddingBottom: 10 },

        })}
      >
        <Tab.Screen name={InicioRestaurante} component={RestaurantesStack} options={{ headerShown: false }} />
        <Tab.Screen name={DetallesNosotros} component={Nosotros} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
