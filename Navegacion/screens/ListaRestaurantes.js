import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

const RestaurantList = ({ navigation }) => {
  const [data, setData] = useState([]);
  // const translateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sev-uzmd.onrender.com/restaurant/get_restaurants');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();

    // Animated.timing(translateY, {
    //   toValue: 0,
    //   duration: 500,
    //   useNativeDriver: true,
    // }).start();
  }, []);

  const translateY = useSharedValue(0);

  // Manejar el gesto de desplazamiento
  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateY.value = withSpring(0); // Vuelve a la posición inicial
    },
  });

  // Estilo animado para aplicar el desplazamiento
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const renderItem = ({ item }) => (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[ animatedStyle]}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('DetallesRestaurante', { item })}
        >
          <Image
            source={{ uri: `https://drive.google.com/uc?export=view&id=${item.photo} ` }}
            style={styles.photo}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Image
                  source={require('../../assets/ubicacionLista.png')}
                  style={styles.image}
                />
                <Text style={styles.street}> {item.street}</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Image
                  source={require('../../assets/relojLista.png')}
                  style={styles.image}
                />
                <Text style={styles.timing}> {item.opening_time} - {item.closing_time}</Text>
              </View>
            </View>

          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
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
    backgroundColor: '#0B0B0D',
    paddingTop: 35,
    padding: 10
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1b1b20',
    marginVertical: 8,
    padding: 6,
    borderRadius: 12,
  },
  photo: {
    width: 130,
    height: 80,
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,

  },
  info: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'left',
    paddingLeft: 25,

  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f5f5f6',
  },
  street: {
    fontSize: 12,
    color: '#f5f5f6',
    textAlign: 'center',
  },
  timing: {
    fontSize: 12,
    color: '#f5f5f6',
    textAlign: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default RestaurantList;
