import React from "react";
import useAppTerms from "./hooks/useAppTerms"
import useSplashScreen from "./hooks/useSplashScreen";
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from "./drawer/DrawerNavigation";
import AppContextProvider from "./context/ApplicationContext";

const AppBooter = (): React.JSX.Element => {
    const { isFirstTime, AppTerms, storageFetched } = useAppTerms();
    const { SplashScreen, appInitialized } = useSplashScreen();

    const Main = (): React.JSX.Element => {
        return (
            isFirstTime
                ?
                <AppTerms />
                :
                <AppContextProvider>
                    <NavigationContainer>
                        <DrawerNavigation />
                    </NavigationContainer >
                </AppContextProvider>
        )
    }

    return (
        appInitialized
            ?
            <Main />
            :
            <SplashScreen />
    )
}

export default AppBooter;