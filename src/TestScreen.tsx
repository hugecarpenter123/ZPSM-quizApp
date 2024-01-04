import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react'
import { DrawerParamList } from './drawer/DrawerNavigation';
import { StyleSheet, Text } from 'react-native';
import useFetchQuizDetails, { QuizDetails } from './hooks/useFetchQuizDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from './components/LoadingIndicator';
import Tasks from './components/Tasks';
import { AppContext } from './context/ApplicationContext';
import { fetchCompleteQuizDetails as fetchQuizDetailsOffline } from './utils/DbManager';
import { shuffleQuiz } from './utils/ShuffleData';
import { ColorSpace } from 'react-native-reanimated';


type Props = DrawerScreenProps<DrawerParamList, 'TestScreen'>;

const TestScreen: React.FC<Props> = ({ route, navigation }) => {
    const id = route.params.id;
    const { loading, error, fetchQuizDetails } = useFetchQuizDetails(id);
    const [quiz, setQuiz] = useState<undefined | QuizDetails>(undefined);
    const { isConnected } = useContext(AppContext);


    useEffect(() => {
        console.log("TestScreen.useEffect() [id]")
        if (isConnected) {
            console.log("is conntected - fetching quizDetails online")
            // fetchuj ONLINE, potasuj, zapisz do stanu
            fetchQuizDetails().then(quiz => setQuiz(shuffleQuiz(quiz)));
        } else {
            console.log("not Conntected - fetching quizDetails offline")
            // fetchuj OFFLINE, potasuj, zapisz do stanu
            fetchQuizDetailsOffline(id).then(quiz => setQuiz(shuffleQuiz(quiz)));
        }
    }, [id])

    // quiz został pobrany ? wyświetl quiz : wyświetl ładowanie albo error
    const Screen = (): React.JSX.Element => {
        if (quiz) {
            return <Tasks quiz={quiz} />
        } else if (loading) {
            return <LoadingIndicator />
        } else {
            return <Text>Wydarzył się błąd podczas pobierania quizu...</Text>
        }
    }


    return (
        <SafeAreaView style={style.main}>
            <Screen />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
    }
})

export default TestScreen;