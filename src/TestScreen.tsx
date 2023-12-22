import { DrawerScreenProps } from '@react-navigation/drawer';
import React, { useEffect } from 'react'
import { DrawerParamList } from './drawer/DrawerNavigation';
import { Text } from 'react-native';
import useFetchQuizDetails, { QuizDetails } from './hooks/useFetchQuizDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from './components/LoadingIndicator';
import Tasks from './components/Tasks';


type Props = DrawerScreenProps<DrawerParamList, 'TestScreen'>;

const TestScreen: React.FC<Props> = ({ route, navigation }) => {
    const id = route.params.id;
    const { loading, error, quiz, fetchQuizDetails } = useFetchQuizDetails(id);
    // const [tasksAnswers, setTasksAnswers] = useState<{ [key: number]: number }>({});

    useEffect(() => {
        console.log("TestScreen.useEffect() [id]")
        // pobierz quiz o podanym ID
        fetchQuizDetails();

        // wyzeruj poprzednie odpowiedzi
        // setTasksAnswers({});
    }, [id])

    type TasksProps = {
        quiz: QuizDetails,
    }

    // jeżeli quiz został pobrany ? wyświetl quiz : wyświetl ładowanie albo error
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