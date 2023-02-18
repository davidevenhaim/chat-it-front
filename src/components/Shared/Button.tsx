import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../Core/theme';

interface Props {
    onPress: () => void;
    title: string;
    color?: string;
}

const Button = ({ color, onPress, title }: Props) => {

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color || theme.colors.primary }]}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
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