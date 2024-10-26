import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    const [restaurantData, setRestaurantData] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [isPressed, setIsPressed] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);

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

    const openWhatsApp = () => {
        const url = `whatsapp://send?phone=${contact}`;
        Linking.openURL(url).catch(() => {
            alert('No se pudo abrir WhatsApp');
        });
    };

    useEffect(() => {
        fetchRestaurantAndDishes();
    }, []);

    if (!restaurantData) {
        return <Text></Text>; // Estado de carga
    }

    const { closing_time, contact, latitude, length } = restaurantData;

    const handlePress = () => {
        const url = `https://www.google.com/maps?q=${latitude}${length}`;
        Linking.openURL(url);
    };
    console.log(restaurantData);
    return (
        <View style={styles.mainContainer}>
            <Image
                source={{ uri: `https://drive.google.com/uc?export=view&id=${restaurantData.photo}` }}
                style={styles.photo}
            />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false} >
                    
                <Text style={styles.name}>{restaurantData.name}</Text>
                <Text style={styles.dishTitle}>Platillos:</Text>
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

                <View style={styles.infoItem}>
                    <Image
                        source={require('../../assets/direccion.png')}
                        style={styles.image}
                    />
                    {/* <Icon name="directions" size={24} color="#f5f5f6" /> */}
                    <Text style={styles.street}> Dirección: {restaurantData.street}</Text>
                </View>

                <View style={styles.infoItem}>
                    <Image
                        source={require('../../assets/horario.png')}
                        style={styles.image}
                    />
                    {/* <Icon name="query-builder" size={24} color="#f5f5f6" /> */}
                    <Text style={styles.timing}> Horario: {restaurantData.opening_time} - {closing_time}
                    </Text>
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.infoItem,
                        { backgroundColor: pressed ? 'transparent' : 'transparent' },
                    ]}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}
                    onPress={openWhatsApp}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/contacto.png')}
                            style={styles.image}
                        />
                        {/* <Icon name="phone" size={24} color={isPressed ? '#1180ad' : '#f5f5f6'} /> */}
                        <Text style={[styles.infoText, { color: isPressed ? '#1180ad' : '#f5f5f6' }]}>
                            {contact}
                        </Text>
                    </View>
                </Pressable>

                <Pressable
                    style={({ pressed }) => [
                        styles.infoItem,
                        { backgroundColor: pressed ? 'transparent' : 'transparent' },
                    ]}
                    onPressIn={() => setIsPressed2(true)}
                    onPressOut={() => setIsPressed2(false)}
                    onPress={handlePress}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/ubicacion.png')}
                            style={styles.image}
                        />
                        {/* <Icon name="map" size={24} color={isPressed2 ? '#1180ad' : '#f5f5f6'} /> */}
                        <Text style={[styles.infoText, { color: isPressed2 ? '#1180ad' : '#f5f5f6' }]}>
                            Ver ubicación
                        </Text>
                    </View>
                </Pressable>

            </ScrollView>
        </View>
    );
};

// Estilos para la pantalla de detalles
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0B0B0D',
    },
    container: {
        flex: 1,
        backgroundColor: '#0B0B0D',
        padding: 20,
        // alignItems: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        opacity: 0.85,
        marginTop: -50
    },
    photo: {
        width: '100%',
        height: '30%',
    },
    image: {
        width: 20,
        height: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#f5f5f6',
    },
    street: {
        fontSize: 16,
        color: '#f5f5f6',
    },
    timing: {
        fontSize: 16,
        color: '#f5f5f6',
    },

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        marginVertical: 4
    },
    infoText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#f5f5f6',
        textDecorationLine: 'underline',
    },
    dishTitle: {
        paddingTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 15,
        color: '#f5f5f6',
        paddingLeft: 15
    },

    dishContainer: {
        marginRight: 15,
        alignItems: 'center',
        // borderColor: 'white', borderWidth: 1,
        paddingBottom: 20
    },
    dishPhoto: {
        width: 200,
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    dishName: {
        fontSize: 16,
        textAlign: 'center',
        color: '#f5f5f6',
    },
});

export default DetailsScreen;
