import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import AuthNavigationContainer from "./AuthNavigation";
import UnAuthNavContainer from "./UnAuthNavigation";

const NavigationIndex = () => {
    const { userInfo } = useContext(AuthContext);

    return userInfo.refreshToken ? <AuthNavigationContainer /> : <UnAuthNavContainer />
}

export default NavigationIndex;