import LottieAnimation from "./Lottie";

interface Props {
    isLoading: boolean;
}

const AppLoading = ({ isLoading }: Props) =>
    isLoading ? <LottieAnimation animationFile={require('../../assets/animation/loading.json')} /> : null

export default AppLoading;