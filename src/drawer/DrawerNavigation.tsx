import React, {  } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from "../MainScreen";
import ResultScreen from "../OutcomeScreen";
import TestScreen from "../TestScreen";
import DrawerContent from "./DrawerContent";

export type DrawerParamList = {
    "MainScreen": undefined,
    "TestScreen": { id: string },
    "ResultScreen": undefined,
    "NoMemo": undefined,
    "Memo": undefined,
    "Example": undefined,
}

export const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="MainScreen" component={MainScreen} options={{ title: "Home" }} />
            <Drawer.Screen name="ResultScreen" component={ResultScreen} options={{ title: "Results" }} />
            <Drawer.Screen name="TestScreen" component={TestScreen} options={{ title: "Test", drawerItemStyle: { display: "none" } }} />

        </Drawer.Navigator>
    );
}

export default DrawerNavigation;