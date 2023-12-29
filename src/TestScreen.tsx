import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react'
import { DrawerParamList } from './drawer/DrawerNavigation';
import { Text } from 'react-native';
import useFetchQuizDetails, { QuizDetails } from './hooks/useFetchQuizDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from './components/LoadingIndicator';
import Tasks from './components/Tasks';
import { AppContext } from './context/ApplicationContext';
import { fetchCompleteQuizDetails as fetchQuizDetailsOffline } from './utils/DbManager';
import { shuffleQuiz } from './utils/ShuffleData';


type Props = DrawerScreenProps<DrawerParamList, 'TestScreen'>;

const TestScreen: React.FC<Props> = ({ route, navigation }) => {
    const id = route.params.id;
    const { loading, error, fetchQuizDetails } = useFetchQuizDetails(id);
    const [quiz, setQuiz] = useState<undefined | QuizDetails>(undefined);
    const { isConnected } = useContext(AppContext);


    useEffect(() => {
        console.log("TestScreen.useEffect() [id]")
        if (isConnected) {
            // fetchuj ONLINE, potasuj, zapisz do stanu
            fetchQuizDetails().then(quiz => setQuiz(shuffleQuiz(quiz)));
        } else {
            // fetchuj OFFLINE, potasuj, zapisz do stanu
            fetchQuizDetailsOffline().then(quiz => setQuiz(shuffleQuiz(quiz)));
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
        <SafeAreaView>
            <Screen />
        </SafeAreaView>
    );
}

export default TestScreen;