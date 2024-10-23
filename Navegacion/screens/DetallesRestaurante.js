import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de haber instalado la biblioteca

const DetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [restaurantData, setRestaurantData] = useState(null);
  const [dishes, setDishes] = useState([]);

  // Fetch restaurant details and dishes
  const fetchRestaurantAndDishes = async () => {
    try {
      const restaurantResponse = await fetch('https://sev-uzmd.onrender.com/restaurant/get_restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: item.code }),
      });

      const restaurantData = await restaurantResponse.json();
      setRestaurantData(restaurantData);

      const dishesResponse = await fetch('https://sev-uzmd.onrender.com/dish/get_dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: item.code }),
      });

      const dishesData = await dishesResponse.json();
      setDishes(dishesData);
    } catch (error) {
      console.error('Error fetching restaurant details and dishes:', error);
    }
  };

  useEffect(() => {
    fetchRestaurantAndDishes();
  }, []);

  if (!restaurantData) {
    return <Text>Cargando...</Text>; // Estado de carga
  }

  const { closing_time, contact, latitude, length } = restaurantData;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://drive.google.com/uc?export=view&id=${restaurantData.photo}` }}
        style={styles.photo}
      />
      <Text style={styles.name}>{restaurantData.name}</Text>
      <Text style={styles.street}>Dirección: {restaurantData.street}</Text>
      <Text style={styles.timing}>
        Horario: {restaurantData.opening_time} - {closing_time}
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Icon name="phone" size={24} color="#000" />
          <Text style={styles.infoText}>{contact}</Text>
        </View>
        <TouchableOpacity
          style={styles.infoItem}
          onPress={() => {
            const url = `https://www.google.com/maps?q=${latitude}${length}`;
            Linking.openURL(url);
          }}
        >
          <Icon name="map" size={24} color="#000" />
          <Text style={styles.infoText}>Ver en el mapa</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.dishTitle}>Platos:</Text>
      <FlatList
        data={dishes}
        keyExtractor={(dish) => dish.name}
        renderItem={({ item }) => (
          <View style={styles.dishContainer}>
            <Image
              source={{ uri: `https://drive.google.com/uc?export=view&id=${item.photo}` }}
              style={styles.dishPhoto}
            />
            <Text style={styles.dishName}>{item.name}</Text>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// Estilos para la pantalla de detalles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  street: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  timing: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 16,
  },
  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  dishContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  dishPhoto: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  dishName: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DetailsScreen;
