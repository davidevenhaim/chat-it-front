import React from 'react';
import Lottie from 'lottie-react-native';

interface Props {
    size?: number;
    animationFile?: string;
}

const LottieAnimation = ({ size = 200, animationFile }: Props) => {



    return (
        <Lottie
            source={animationFile || require('../../assets/animation/empty.json')}
            autoPlay
            loop
            style={{
                height: size,
                width: size,
            }}
        />
    );
}

export default LottieAnimation;