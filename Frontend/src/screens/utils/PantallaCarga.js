import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const PantallaCarga = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../../../assets/animations/Animation_Loading_Receta.json')}
        autoPlay
        loop
        style={styles.animacion}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    elevation: 9999,
  },
  animacion: {
    width: 400,
    height: 400,
  },
});

export default PantallaCarga;
