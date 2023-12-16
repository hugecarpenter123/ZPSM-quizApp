import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, StyleSheet, Image } from 'react-native';
import MainScreen from "../MainScreen";
import ResultScreen from "../OutcomeScreen";
import TestScreen from "../TestScreen";
import DrawerContent from "./DrawerContent";

export type DrawerParamList = {
    "MainScreen": undefined,
    "TestScreen": { id: number },
    "ResultScreen": undefined
}

export const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="MainScreen" component={MainScreen} options={{ title: "Home" }} />
            <Drawer.Screen name="ResultScreen" component={ResultScreen} options={{ title: "Results" }} />
            <Drawer.Screen name="TestScreen" component={TestScreen} options={{ title: "Test", drawerItemStyle: {display:"none"} }} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        backgroundColor: 'gray',
        height: 1,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        padding: 5,
    },
    image: {
        width: '100%',
        flex: 1,
        borderRadius: 10,
    }
})

export default DrawerNavigation;