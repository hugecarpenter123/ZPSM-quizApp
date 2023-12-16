import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";

const STORAGE_KEY = 'termsAlreadyDisplayed';

const useAppTerms = () => {
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [storageFetched, setStorageFetched] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then(val => {
                if (val == null) {
                    setIsFirstTime(true);
                    // AsyncStorage.setItem(STORAGE_KEY, "true") // uncomment this line on production
                } else {
                    setIsFirstTime(false);
                }

                // AsyncStorage.removeItem(STORAGE_KEY);
            })
        setStorageFetched(true);
    }, []);

    const styles = StyleSheet.create({
        container: {
            padding: 20,
        },
        header: {
            textAlign: 'center',
            marginVertical: 20,
            fontSize: 20,
            fontWeight: 'bold',
        },
        button: {
            alignSelf: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: 'tomato',
            borderRadius: 5,
            marginVertical: 20,
        },
        buttonText: {
            textAlign: 'center',
            color: 'white',
        },
    });

    const AppTerms = (): JSX.Element => {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>Zasady Gry</Text>
                <Text>1. Nie można psuć komputra</Text>
                <Text>2. Należy grać sprawiedliwie</Text>
                <Text>3. Pod żadnym pozorem nie wyskakiwać z okna</Text>
                <Text>4. Nie jeść karmy dla psa</Text>
                <Text>5. I tego typu</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setIsFirstTime(false)}
                >
                    <Text style={styles.buttonText}>Do gry</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

    return {
        isFirstTime,
        storageFetched,
        AppTerms,
    };
}

export default useAppTerms;
