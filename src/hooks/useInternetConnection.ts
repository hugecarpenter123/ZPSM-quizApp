import React, { useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';

export default function useInternetConnection() {
    const [isConnected, setIsConnected] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected ? true : false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return { isConnected };
}