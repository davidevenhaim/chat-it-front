import React from 'react'
import { Image, StyleSheet } from 'react-native'

const AppLogo = () => {
    return <Image source={require('../../assets/logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: 180,
        height: 180,
        marginBottom: 8,
    },
})

export default AppLogo