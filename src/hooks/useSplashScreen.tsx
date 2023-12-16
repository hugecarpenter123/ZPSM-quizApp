import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, Image, StatusBar, Text } from "react-native";

const useSplashScreen = () => {
    const [appInitialized, setAppInitialized] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAppInitialized(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const styles = StyleSheet.create({
        container: {

        },
        image: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover'
        },
    });

    const SplashScreen = (): JSX.Element => {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar hidden />
                <Image
                    style={styles.image}
                    source={require('../static/images/drawer-image.webp')}
                />
            </SafeAreaView>
        )
    }

    return {
        appInitialized,
        SplashScreen,
    };
}

export default useSplashScreen;
