import React, { useEffect } from "react";
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
                <NavigationContainer>
                    <DrawerNavigation />
                </NavigationContainer >
        )
    }

    return (
        <AppContextProvider>
            {
                appInitialized
                    ?
                    <Main />
                    :
                    <SplashScreen />
            }
        </AppContextProvider>
    )
}

export default AppBooter;