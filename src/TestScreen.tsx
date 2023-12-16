import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react'
import { DrawerParamList } from './drawer/DrawerNavigation';
import tests from './tests/Tests';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


type Props = DrawerScreenProps<DrawerParamList, 'TestScreen'>;

const TestScreen: React.FC<Props> = ({ route, navigation }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const test = tests[route.params.id]

    useEffect(() => {
        console.log("selectedID: " + selectedId);
    }, [selectedId]);


    const handleSelection = (id: number) => {
        if (id == selectedId) setSelectedId(null);
        else setSelectedId(id);
    }

    const handleButtonPress = (arg: 'prev' | 'next') => {
        const shiftedId = (route.params.id + (arg == 'prev' ? -1 : 1));
        const id = shiftedId >= tests.length ? 0 : (shiftedId < 0 ? tests.length - 1 : shiftedId);
        navigation.navigate("TestScreen", { id });
    }

    const Answers: React.FC = () => {
        return (
            <>
                {
                    test.answers.map((item, index) => (
                        <TouchableOpacity
                            style={[styles.answerButton, selectedId == index && styles.selected]}
                            key={index}
                            onPress={() => handleSelection(index)}
                            activeOpacity={0.8}
                        >
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    ))
                }
            </>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.description}>{test.description}</Text>
            <Answers />
            <View style={styles.buttonNavContainer}>
                <TouchableOpacity
                    onPress={() => handleButtonPress('prev')}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Poprzednie</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleButtonPress('next')}
                    style={styles.button}
                    activeOpacity={0.7}
                >
                    <Text style={styles.buttonText}>Następne</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
    },
    answerButton: {
        marginVertical: 4,
        borderRadius: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey'
    },
    button: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'wheat',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    selected: {
        backgroundColor: 'lightgreen',
        borderColor: 'green',
        borderWidth: 2,
    },
    buttonNavContainer: {
        marginTop: 30,
        flexDirection: 'row',
        // backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default TestScreen;