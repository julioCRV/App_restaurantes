import * as React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import logo from '../../assets/logo.png';

export default function DetailsScreen({navigation}) {
    return (
        <View style={styles.container}>

            <Image
                source={logo} // Usa la imagen importada localmente
                style={styles.logo}
            />
            <Text style={styles.description}>
                TOCO INNOVA es un equipo de personas apasionadas por el aprendizaje y la tecnología.
                Nos une el compromiso de enfrentar desafíos y adaptarnos a nuevas tecnologías
                para cumplir y superar las expectativas de nuestros clientes.
            </Text>
            <Text style={styles.description}>
                En TOCO INNOVA, nos esforzamos por ofrecer soluciones innovadoras y efectivas,
                siempre dispuestos a mejorar y crecer en cada proyecto.
            </Text>
            <Text style={styles.description}>
                Si tienes una idea o proyecto, contáctanos y descubre cómo podemos innovar juntos.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0B0B0D',
    },

    logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
        // Efecto de sombra para el logo
        shadowColor: '#000', // Color de la sombra
        shadowOffset: { width: 0, height: 3 }, // Desplazamiento de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        shadowRadius: 5, // Difuminado de la sombra
        elevation: 5, // Elevación para Android
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30
    },
});
