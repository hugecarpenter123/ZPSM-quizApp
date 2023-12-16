import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import tests from './tests/Tests';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from './drawer/DrawerNavigation';

type Props = DrawerScreenProps<DrawerParamList, 'MainScreen'>;


const MainScreen: React.FC<Props> = ({ route, navigation }) => {

    type testItem = {
        description: string,
        answers: string[],
        correctAnswerId: number,
    }

    type RenderItemPops = {
        item: testItem,
        index: number;
    }

    const RenderItem = ({ index, item }: RenderItemPops) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('TestScreen', { id: index })}
                key={index}
            >
                <View style={styles.testContainer} key={index}>
                    <Text style={styles.title}>{`Pytanie ${index + 1}`}</Text>
                    <Text>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const TestsDisplay = (): JSX.Element => {
        return (
            <FlatList
                data={tests}
                renderItem={RenderItem}
                keyExtractor={(_, index) => index.toString()}
            />
        )
    }

    return (
        <View style={styles.container}>
            <TestsDisplay />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    testContainer: {
        borderWidth: 1,
        borderColor: 'dark-gray',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
})

export default MainScreen;