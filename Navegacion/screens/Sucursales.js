import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Pressable, SectionList } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring,
} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Sucursales = ({ navigation }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    //   const [data, setData] = useState([]);

    const data = [
        {
            "code": 1,
            "contacts": {
                "contact_1": "+59176499135",
                "contact_2": "+59171234567"
            },
            "location": "-17.416624,-66.155233",
            "street": "Manuela Rodriguez"
        },
        {
            "code": 2,
            "contacts": {
                "contact_1": "+59172345678",
                "contact_2": "+59173216548",
                "contact_3": "+59170123456"
            },
            "location": "-17.394074,-66.160103",
            "street": "Avenida Blanco Galindo"
        },
        {
            "code": 3,
            "contacts": {
                "contact_1": "+59176784523",
                "contact_2": "+59176654321"
            },
            "location": "-17.389500,-66.156500",
            "street": "Calle Sucre"
        },
        {
            "code": 4,
            "contacts": {
                "contact_1": "+59171239876",
                "contact_2": "+59170091234",
                "contact_3": "+59177654322",
                "contact_4": "+59179456123"
            },
            "location": "-17.379034,-66.151098",
            "street": "Calle Beni"
        },
        {
            "code": 5,
            "contacts": {
                "contact_1": "+59177894567",
                "contact_2": "+59179123456"
            },
            "location": "-17.392174,-66.145987",
            "street": "Avenida Aroma"
        }
    ];

    const openWhatsApp = () => {
        const url = `whatsapp://send?phone=${contact}`;
        Linking.openURL(url).catch(() => {
            alert('No se pudo abrir WhatsApp');
        });
    };
    // const translateY = useRef(new Animated.Value(30)).current;

    //   useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const restaurantResponse = await fetch('https://sev-uzmd.onrender.com/branch/get_branches', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ "code": 1 }),
    //             });
    //             const restaurantData = await restaurantResponse.json();
    //             setData(restaurantData);
    //         } catch (error) {
    //             console.error('Erro en la solitictud de sucursales:', error);
    //         }
    //     };

    //     fetchData();
    //   }, []);

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

        // <Text style={{color:'white', fontSize: 111}}>{item.code}</Text>

        <GestureHandlerRootView onGestureEvent={gestureHandler}>
            <Animated.View style={[animatedStyle]}>
                <TouchableOpacity
                    style={styles.card}
                //   onPress={() => navigation.navigate('DetallesRestaurante', { item })}
                >

                    {/* <Image
            source={{ uri: `https://drive.google.com/uc?export=view&id=${item.photo} ` }}
            style={styles.photo}
          /> */}
                    <View style={styles.info}>
                        {/* <Text style={styles.name}>{item.name}</Text> */}

                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Image
                                    source={require('../../assets/ubicacionLista.png')}
                                    style={styles.image}
                                />
                                <Text style={{ color: 'white', fontSize: 23 }}> {item.street}</Text>
                            </View>
                        </View>

                        {/* <View style={styles.infoContainer}>
              <View style={styles.infoItem}>
                <Image
                  source={require('../../assets/relojLista.png')}
                  style={styles.image}
                />
                <Text style={styles.timing}> {item.opening_time} - {item.closing_time}</Text>
              </View>
            </View> */}
                        <View style={styles.infoItem}>
                            <Image
                                source={require('../../assets/direccion.png')}
                                style={styles.image}
                            />
                            {/* <Icon name="directions" size={24} color="#f5f5f6" /> */}
                            <Text style={styles.street}> Dirección: {item.street}</Text>
                        </View>

                        {Object.entries(item.contacts).map(([key, contact]) => (
                            <Pressable
                                key={key}
                                style={({ pressed }) => [
                                    styles.infoItem,
                                    { backgroundColor: pressed ? 'transparent' : 'transparent' },
                                ]}
                                onPressIn={() => setIsPressed(true)}
                                onPressOut={() => setIsPressed(false)}
                                onPress={() => openWhatsApp(contact)}  // Pasa el contacto actual
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../assets/contacto.png')}
                                        style={styles.image}
                                    />
                                    <Text style={[styles.infoText, { color: isPressed ? '#1180ad' : '#f5f5f6' }]}>
                                        {contact}
                                    </Text>
                                </View>
                            </Pressable>
                        ))}

                    </View>
                </TouchableOpacity>
            </Animated.View>
        </GestureHandlerRootView>
    );

    // Divide los datos en secciones
    const sections = [
        {
            title: 'Sucursal 1',
            data: data.filter(item => item.code === 1 || item.code ===2)  // Filtra los elementos con code 1
        },
        {
            title: 'Sucursal 2',
            data: data.filter(item => item.code === 3 || item.code === 4 || item.code === 5)  // Filtra los elementos con code 2
        }
    ];

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item) => item.code.toString()}
                renderItem={ renderItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.sectionHeader}>{title}</Text>
                )}
            />
        </View>

    );
};

// Estilos para la lista
const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
     sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 5,
        color: 'white'
        // backgroundColor: '#eee'
    },
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

export default Sucursales;
