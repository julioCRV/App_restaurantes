import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const DetailsScreen = ({ route }) => {
  // Recibir los detalles del restaurante a través de la navegación
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://drive.google.com/uc?export=view&id=${item.photo}` }}
        style={styles.photo}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.street}>Dirección: {item.street}</Text>
      <Text style={styles.timing}>
        Horario: {item.opening_time} - {item.closing_time}
      </Text>
      <Text style={styles.code}>Código: {item.code}</Text>
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
  code: {
    fontSize: 14,
    color: '#999',
    marginTop: 20,
  },
});

export default DetailsScreen;
