import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { QuizDetails, _Task } from "../hooks/useFetchQuizDetails";
import LoadingIndicator from "./LoadingIndicator";
import usePostQuizResult, { QuizPostResult } from "../hooks/usePostQuizResult";
import Task from "./Task";
import { FlatList } from "react-native-gesture-handler";

type TasksProps = {
    quiz: QuizDetails,
}

const Tasks: React.FC<TasksProps> = ({ quiz }) => {
    console.log("Tasks render")
    const [tasksAnswers, setTasksAnswers] = useState<{ [key: number]: number }>({});
    const { loading: postLoading, error: postError, postQuizResult } = usePostQuizResult();

    const saveAnswers = useCallback((taskIndex: number, answerIndex: number) => {
        setTasksAnswers((prev) => ({ ...prev, [taskIndex]: answerIndex }));
    }, []);

    const calcPoints = (): number => {
        let score = 0;
        Object.entries(tasksAnswers).forEach((entry) => {
            const taskIndex = parseInt(entry[0])
            const answerIndex = entry[1];
            if (quiz!.tasks[taskIndex]?.answers[answerIndex]?.isCorrect) {
                score++;
            }
        })
        return score;
    }

    const onSendClicked = (): void => {
        const payload: QuizPostResult = {
            nick: "Alwaro",
            score: calcPoints(),
            total: quiz!.tasks.length,
            type: quiz!.name,
        }
        console.log(payload)
        // console.log(tasksAnswers)
        postQuizResult(payload);
    }

    const renderItem = ({ item, index }: { item: _Task; index: number }) => (
        <Task task={item} taskIndex={index} saveTaskAnswer={saveAnswers} />
    );

    // return (
    //     <ScrollView style={styles.container}>
    //         <Text style={styles.header}>{quiz.name}</Text>
    //         <Text style={styles.description}>{quiz.description}</Text>
    //         <Text style={styles.level}>
    //             <Text style={styles.bold}>Poziom: </Text>
    //             {quiz.level}
    //         </Text>
    //         <FlatList
    //             data={quiz!.tasks}
    //             renderItem={renderItem}
    //             keyExtractor={(item, index) => index.toString()}
    //         />
    //         <TouchableOpacity
    //             onPress={onSendClicked}
    //             style={styles.button}
    //         >
    //             <Text style={styles.buttonText}>Wyślij rozwiązanie</Text>
    //         </TouchableOpacity>
    //         {postLoading && <LoadingIndicator />}
    //     </ScrollView>
    // )
    return (
        <FlatList
            style={styles.container}
            ListHeaderComponent={
                <>
                    <Text style={styles.header}>{quiz.name}</Text>
                    <Text style={styles.description}>{quiz.description}</Text>
                    <Text style={styles.level}>
                        <Text style={styles.bold}>Poziom: </Text>
                        {quiz.level}
                    </Text>
                </>
            }
            data={quiz!.tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={
                <>
                    <TouchableOpacity onPress={onSendClicked} style={styles.button}>
                        <Text style={styles.buttonText}>Wyślij rozwiązanie</Text>
                    </TouchableOpacity>
                    {postLoading && <LoadingIndicator />}
                </>
            }
        />
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    header: {
        fontSize: 24,
        fontFamily: 'RubikDoodleShadow-Regular',
        color: 'purple',
        textAlign: 'center',
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 5,
    },
    level: {
        textAlign: 'center',
        marginTop: 10
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'wheat',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },

})

export default Tasks;