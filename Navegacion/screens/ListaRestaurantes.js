import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const RestaurantList = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de ambos cuerpos
    const fetchData = async () => {
      try {
        const body1 = { start: 1, end: 2 };
        const body2 = { start: 2, end: 2 };

        // Hacemos ambas solicitudes usando fetch
        const response1 = await fetch('https://sev-uzmd.onrender.com/restaurant/get_restaurants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body1),
        });
        const response2 = await fetch('https://sev-uzmd.onrender.com/restaurant/get_restaurants', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body2),
        });

        // Convertimos las respuestas a JSON
        const data1 = await response1.json();
        const data2 = await response2.json();

        // Combinamos los datos obtenidos
        setData([...data1, ...data2]);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);
console.log(data);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetallesRestaurante', { item })}
    >
      <Image
        source={{ uri: `https://drive.google.com/uc?export=view&id=${item.photo}` }}
        style={styles.photo}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.street}>{item.street}</Text>
        <Text style={styles.timing}>
          {item.opening_time} - {item.closing_time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.code.toString()}
      />
    </View>
  );
};

// Estilos para la lista
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  street: {
    fontSize: 16,
    color: '#666',
  },
  timing: {
    fontSize: 14,
    color: '#888',
  },
});

export default RestaurantList;
