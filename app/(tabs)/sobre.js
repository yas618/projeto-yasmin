import React from 'react';
import { View,Text,Image,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';

export default function App() {
  return (
      <ScrollView style={styles.background}>
          <View style={styles.container}>
              <Text style={styles.title}>Sobre mim</Text>

              <Text style={styles.subtitle}>Conheça um pouco mais sobre mim 💗</Text>

              <Image source={require('../../assets/image.png')} style={styles.image} />

              <View style={styles.card}>
                  <Text style={styles.cardTitle}>👩🏽‍💻 Quem sou eu?</Text>

                  <Text style={styles.cardText}>
                      Meu nome é Yasmin, sou estudante e estou no último ano do Ensino Médio. Gosto
                      de aprender coisas novas, passar tempo com minha família e amigos, minha cachorrinha e aproveitar
                      bons momentos.
                  </Text>
              </View>

              <View style={styles.card}>
                  <Text style={styles.cardTitle}>💻 Estudos e tecnologia</Text>

                  <Text style={styles.cardText}>
                      Atualmente estudo Desenvolvimento de Sistemas no SENAI e estou no 3°ano. Gosto de aprender e fazer
                      criação de sites e aplicativos.
                  </Text>
              </View>

              <TouchableOpacity style={styles.buttonPink}>
                  <Text style={styles.buttonTextWhite}>Linkedin</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttonWhite}>
                  <Text style={styles.buttonTextPink}>Gmail</Text>
              </TouchableOpacity>
          </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
    backgroundColor: '#F7D6DD',
  },

  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },


  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#495057',
  },

  subtitle: {
    fontSize: 15,
    color: '#6C757D',
    marginTop: 5,
    marginBottom: 20,
  },


  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 20,
  },


  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 4,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#D95D82',
    marginBottom: 8,
  },

  cardText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 21,
  },


  buttonPink: {
    width: '100%',
    backgroundColor: '#D95D82',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 12,
  },

  buttonTextWhite: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },


  buttonWhite: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',

    borderWidth: 2,
    borderColor: '#D95D82',
  },

  buttonTextPink: {
    color: '#D95D82',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
