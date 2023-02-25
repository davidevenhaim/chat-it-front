import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ButtonProps, TouchableOpacityProps } from 'react-native';
import { theme } from '../Core/theme';

interface Props {
    title: string;
    color?: string;
}

const Button = ({ color, title, ...props }: Props & TouchableOpacityProps) => {

    return (
        <TouchableOpacity
            {...props}
            style={[styles.button, { backgroundColor: color || theme.colors.primary }, props.style]}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity >
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: theme.colors.primary,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Button;