import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ImageBackground, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

const Presentacion = ({ onPress }) => {
    const bounceAnim = useRef(new Animated.Value(0)).current; // Valor inicial para la animación

    useEffect(() => {
        const startBounce = () => {
            bounceAnim.setValue(0); // Reinicia la animación
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceAnim, {
                        toValue: -10, // Sube 10 unidades
                        duration: 300, // Duración del movimiento hacia arriba
                        useNativeDriver: true, // Mejora el rendimiento de la animación
                    }),
                    Animated.timing(bounceAnim, {
                        toValue: 0, // Vuelve a la posición original
                        duration: 300, // Duración del movimiento hacia abajo
                        useNativeDriver: true, // Mejora el rendimiento de la animación
                    }),
                ]),
            ).start();
        };

        startBounce(); // Inicia la animación

        // No es necesario detener la animación aquí, ya que usamos Animated.loop
        return () => {
            // Aquí podrías realizar cualquier limpieza si es necesario
        };
    }, [bounceAnim]);

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <ImageBackground
                source={require('../../assets/fondoInicial.jpg')} // Asegúrate de cambiar esta ruta a la ubicación correcta de tu imagen
                style={styles.container}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>SEV</Text>
                    <Text style={styles.meaning}>Servicio Eficiente de Ventas</Text>
                    <Text style={styles.description}>
                        Descubre una amplia variedad de restaurantes, explora sus menús,
                        contacta con ellos y conoce sus sucursales y servicios de manera
                        rápida y fácil.
                    </Text>
                    <Animated.View style={[styles.iconContainer, { transform: [{ translateY: bounceAnim }] }]}>
                        <Icon name='angle-dobule-down' size={20} color={'tomato'} />
                    </Animated.View>
                    <Text style={styles.meaning}></Text>
                    <Text style={styles.meaning}></Text>
                </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        padding: 20,
    },
    iconContainer: {
        paddingTop: 24,
        alignItems: 'center',
    },
    textContainer: {
        borderRadius: 10,
        padding: 20,
        width: '100%',
        // borderColor: 'white', borderWidth: 2
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'tomato',
        textAlign: 'center'
    },
    meaning: {
        fontSize: 24,
        fontStyle: 'italic',
        color: 'white',
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 10,
        textAlign: 'center'
    },
});

export default Presentacion;
