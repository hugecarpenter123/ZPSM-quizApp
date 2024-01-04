import React, { useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';

export function useInternetConnectivity() {
    const [isConnected, setIsConnected] = useState<undefined | boolean>(undefined);

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