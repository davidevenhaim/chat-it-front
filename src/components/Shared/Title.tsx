

import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, TextProps } from 'react-native-paper'
import { theme } from '../Core/theme'

const Title = ({ ...props }: TextProps) => {
    return <Text
        {...props}
        style={[styles.header, props.style]}
    >
        {props.children}
    </Text>
}

const styles = StyleSheet.create({
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
    },
})

export default Title;