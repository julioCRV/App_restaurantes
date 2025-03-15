import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking, Pressable, ScrollView, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicos from 'react-native-vector-icons/Ionicons';
import IonAnt from 'react-native-vector-icons/AntDesign';

const DetailsScreen = ({ route }) => {
    const { item } = route.params;
    const [restaurantData, setRestaurantData] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [data, setData] = useState([]);
    const [pagosData, setPagosData] = useState([]);
    const [serviciosData, setServicioData] = useState([]);

    const [pressedIndex, setPressedIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);

    const [modalVisible2, setModalVisible2] = useState(false);
    const [selectedDishDetails, setSelectedDishDetails] = useState([]);
    const [loading, setLoading] = useState(false);

    const scrollViewRef = useRef(null);

    const openModalWithContacts = (contacts) => {
        setSelectedContacts(contacts); // Actualiza los contactos específicos
        setModalVisible(true);         // Muestra el modal
    };

    const [isPressed, setIsPressed] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    // const data = [
    //     {
    //         "code": 1,
    //         "contacts": {
    //             "contact_1": "76499135",
    //             "contact_2": "71234567"
    //         },
    //         "location": "-17.416624,-66.155233",
    //         "street": "Manuela Rodriguez"
    //     },
    //     {
    //         "code": 2,
    //         "contacts": {
    //             "contact_1": "72345678",
    //             "contact_2": "73216548",
    //             "contact_3": "70123456"
    //         },
    //         "location": "-17.394074,-66.160103",
    //         "street": "Avenida Blanco Galindo"
    //     },
    //     {
    //         "code": 3,
    //         "contacts": {
    //             "contact_1": "+59176784523",
    //             "contact_2": "+59176654321"
    //         },
    //         "location": "-17.389500,-66.156500",
    //         "street": "Calle Sucre"
    //     },
    // ]

    const fetchRestaurantAndDishes = async () => {
        try {
            const restaurantResponse = await fetch('https://sev-uzmd.onrender.com/restaurant/get_restaurant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: item.code }),
            });
            const restaurantData2 = await restaurantResponse.json();
            setRestaurantData(restaurantData2);

            const dishesResponse = await fetch('https://sev-uzmd.onrender.com/dish/get_dishes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: item.code }),
            });
            const dishesData = await dishesResponse.json();
            setDishes(dishesData);

            const sucursalResponse = await fetch('https://sev-uzmd.onrender.com/branch/get_branches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: item.code }),
            });
            const sucursalData2 = await sucursalResponse.json();
            setData(sucursalData2);

            const pagosResponse = await fetch('https://sev-uzmd.onrender.com/payment_method/get_payment_methods', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: item.code }),
            });
            const pagosData = await pagosResponse.json();
            setPagosData(pagosData);

            const serviciosResponse = await fetch('https://sev-uzmd.onrender.com/service/get_services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: item.code }),
            });
            const seriviceData = await serviciosResponse.json();
            setServicioData(seriviceData);

        } catch (error) {
            console.error('Error fetching restaurant details and dishes:', error);
        }
    };

    const openWhatsApp = (contact) => {
        const url = `whatsapp://send?phone=${contact}`;
        Linking.openURL(url).catch(() => {
            alert('No se pudo abrir WhatsApp');
        });
    };

    // Función para obtener los detalles del plato
    const fetchDishDetails = async (dishCode) => {
        setLoading(true);
        try {
            const response = await fetch('https://sev-uzmd.onrender.com/dish/get_dish_details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code_restaurant: item.code, code_dish: dishCode }),
            });
            const data = await response.json();
            setSelectedDishDetails(data);
            setModalVisible2(true);
        } catch (error) {
            console.error('Error al obtener detalles del plato:', error);
        } finally {
            setLoading(false);
        }
    };

    const [verPagos, setVerPagos] = useState(false);

    const mostrarPagos = () => {
        setVerPagos(!verPagos);
        if (!verPagos) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    const [verServicio, setVerServicio] = useState(false);

    const mostrarServicios = () => {
        setVerServicio(!verServicio);
        // Desplaza hacia abajo si se muestra el contenido
        if (!verServicio) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    // Renderizado del modal
    const renderModalContent = () => (
        <Modal
            visible={modalVisible2}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible2(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitlePlatillos}>Menú</Text>
                    {selectedDishDetails.length > 0 ? (
                        <FlatList
                            data={selectedDishDetails}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.detailContainer}>
                                    <Text style={styles.detailText2}>
                                        {item.sobriquet} ........................... Bs. {item.price.replace('$', '')}
                                    </Text>

                                    <Text style={styles.detailText}>{item.detail}</Text>
                                    {/* <Text style={styles.detailText}>Precio: {item.price}</Text> */}
                                </View>
                            )}
                        />
                    ) : (
                        <Text>No hay detalles disponibles.</Text>
                    )}
                    {/* <Button title="Cerrar" onPress={() => setModalVisible2(false)} /> */}
                    <Pressable onPress={() => setModalVisible2(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );


    useEffect(() => {
        fetchRestaurantAndDishes();
    }, []);

    if (!restaurantData) {
        return <Text></Text>;
    }


    const handlePress = () => {
        const [latitude, longitude] = dataExtra.location.split(',');
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        Linking.openURL(url);
    };
    return (
        <ScrollView ref={scrollViewRef} style={styles.mainContainer}>
            {/* <Image
                source={{ uri: `https://drive.google.com/uc?export=view&id=${restaurantData.photo}` }}
                style={styles.photo}
            /> */}

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false} >
              
                <Text style={styles.name}>{restaurantData.name}</Text>
                <Text style={styles.timing}>Nuestro horario de atención es de {restaurantData.opening_time} a {restaurantData.closing_time} ¡Será un placer atenderle!</Text>
                <Text style={styles.dishTitle}>Platillos:</Text>

                <View>
                    <FlatList
                        data={dishes}
                        keyExtractor={(dish) => dish.name}
                        renderItem={({ item }) => (
                            <View style={styles.dishContainer}>
                                {/* <Image
                                    source={{ uri: `https://drive.google.com/uc?export=view&id=${item.photo}` }}
                                    style={styles.dishPhoto}
                                /> */}
                                <Text style={styles.dishName}>{item.name}</Text>
                                <Pressable onPress={() => fetchDishDetails(item.code)} style={styles.closeButtonPlatillo}>
                                    <Icon name="menu-open" size={20} color="#f5f5f6" />
                                </Pressable>
                            </View>
                        )}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    {renderModalContent()}
                </View>

                {/* {dataExtra && dataExtra.contacts && Object.keys(dataExtra.contacts).length > 0 && (
                    Object.entries(dataExtra.contacts).map(([key, contact]) => (
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
                    ))
                )} */}

                <Text style={styles.dishTitle}>Sucursales:</Text>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.code.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.sucursalContainer}>
                            <Text style={{ color: 'white' }}> {item.street}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 12 }}>
                                {item.contacts && Object.keys(item.contacts).length > 0 && (
                                    <Pressable
                                        onPress={() => openModalWithContacts(Object.values(item.contacts))}
                                        style={({ pressed }) => [
                                            styles.infoItem,
                                            { backgroundColor: pressed ? 'rgba(0,0,0,0.1)' : 'transparent' },
                                        ]}
                                    >
                                        <Ionicos name="logo-whatsapp" size={24} color="tomato" />
                                    </Pressable>
                                )}

                                <Modal
                                    visible={modalVisible}
                                    transparent={true}
                                    animationType="slide"
                                    onRequestClose={() => setModalVisible(false)}
                                >
                                    <View style={styles.modalOverlay}>
                                        <View style={styles.modalContent}>
                                            <Text style={styles.modalTitle}>Contactos</Text>
                                            {selectedContacts.map((contact, index) => (
                                                <View>
                                                    <Pressable
                                                        key={index}
                                                        style={({ pressed }) => [
                                                            styles.infoItem,
                                                            { backgroundColor: pressed ? 'transparent' : 'transparent' },
                                                        ]}
                                                        onPressIn={() => setPressedIndex(index)}
                                                        onPressOut={() => setPressedIndex(null)}
                                                        onPress={() => openWhatsApp(contact)}
                                                    >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Ionicos
                                                                name="caret-forward"
                                                                size={18}
                                                                color={pressedIndex === index ? '#1180ad' : 'tomato'}
                                                            />
                                                            <Text style={[
                                                                styles.infoText,
                                                                { color: pressedIndex === index ? '#1180ad' : '#f5f5f6' }
                                                            ]}>
                                                                {contact} </Text>
                                                            <Ionicos
                                                                name="caret-back"
                                                                size={18}
                                                                color={pressedIndex === index ? '#1180ad' : 'tomato'}
                                                            />
                                                        </View>
                                                    </Pressable>
                                                </View>
                                            ))}
                                            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                                <Text style={styles.closeButtonText}>Cerrar</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>

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
                                        <Ionicos name="location" size={24} color={isPressed2 ? '#1180ad' : 'tomato'} />
                                    </View>
                                </Pressable>
                            </View>

                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

                <View>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        onPress={mostrarPagos}
                    >
                        <Text style={styles.dishTitle}>Métodos de pago</Text>
                        <Ionicos name={verPagos ? "chevron-up-sharp" : "chevron-down-sharp"}
                            size={20} color="tomato" style={{ paddingTop: 5 }} />
                    </TouchableOpacity>

                    {verPagos && (
                        <View style={{ paddingLeft: 18 }}>
                            {pagosData.map((pago, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                    <IonAnt name="pushpin" size={18} color="tomato" />
                                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>{pago.name.trim()}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                </View>

                <View style={{ paddingBottom: 40 }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                        onPress={mostrarServicios}
                    >
                        <Text style={styles.dishTitle}>Servicios</Text>
                        <Ionicos name={verServicio ? "chevron-up-sharp" : "chevron-down-sharp"}
                            size={20} color="tomato" style={{ paddingTop: 5 }} />
                    </TouchableOpacity>

                    {verServicio && (
                        <View style={{ paddingLeft: 18 }}>
                            {serviciosData.map((pago, index) => (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                    <IonAnt name="pushpin" size={18} color="tomato" />
                                    <Text style={{ color: 'white', fontSize: 16, marginLeft: 8 }}>{pago.name.trim()}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

            </ScrollView>
        </ScrollView>
    );
}; 5

// Estilos para la pantalla de detalles
const styles = StyleSheet.create({
    dishPhoto: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    dishName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dishCode: {
        fontSize: 14,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    modalTitlePlatillos: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'tomato'
    },
    detailContainer: {
        marginBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: 'white',
        // fontWeight: 'bold'
    },
    detailText2: {
        fontSize: 16,
        color: 'tomato',
        fontWeight: 'bold'
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        width: '80%',
        backgroundColor: '#212126',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'tomato',
        paddingLeft: 15
    },
    contactText: {
        fontSize: 16,
        marginVertical: 5,
    },
    closeButtonPlatillo: {
        marginTop: 5,
        // width: 20, height: 20,
        backgroundColor: 'tomato',
        padding: 5,
        borderRadius: 5,
        padding: 4
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: 'tomato',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#212126',
        fontWeight: 'bold',
    },

    mainContainer: {
        flex: 1,
        backgroundColor: '#0B0B0D',
    },
    container: {
        flex: 1,
        backgroundColor: '#0B0B0D',
        padding: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        opacity: 0.80,
        marginTop: -50,
        paddingBottom: 270,
        borderColor: '#0B0B0D',
        borderWidth: 1,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10, // Altura del degradado en la parte superior
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
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
        marginBottom: 25,
        color: 'tomato',
    },
    street: {
        fontSize: 16,
        color: '#f5f5f6',
    },
    timing: {
        fontSize: 16,
        color: '#f5f5f6',
        textAlign: 'center'
    },
    infoItemTime: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 100
        // 
    },

    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
        // marginVertical: 4,borderColor: 'white', borderWidth: 2
    },
    infoText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#f5f5f6',
        // textDecorationLine: 'underline',
    },
    dishTitle: {
        // paddingTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'tomato',
        paddingLeft: 15,
        // borderWidth: 2, borderColor: 'white'
    },

    dishContainer: {
        marginRight: 15,
        alignItems: 'center',
        backgroundColor: '#212126',
        borderRadius: 18,
        // borderColor: 'white', borderWidth: 1,
        paddingBottom: 20,
        // Sombra para dar efecto 3D
        shadowColor: 'white',  // color oscuro para resaltar
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
        // Sombra para Android
        elevation: 10,
        // Borde sutil para más contraste
        borderWidth: 1,
        borderColor: '#333',
    },
    sucursalContainer: {
        width: 220,
        marginRight: 15,
        // textAlign: 'right',
        alignItems: 'center',
        backgroundColor: '#212126',
        borderRadius: 18,
        padding: 18,
        // Sombra para dar efecto 3D
        shadowColor: 'white',  // color oscuro para resaltar
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 6,
        // Sombra para Android
        elevation: 10,
        // Borde sutil para más contraste
        borderWidth: 1,
        borderColor: '#333',
    }
    ,

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
