import React, { useCallback, useContext, useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { QuizDetails, _Task } from "../hooks/useFetchQuizDetails";
import LoadingIndicator from "./LoadingIndicator";
import usePostQuizResult, { QuizPostResult } from "../hooks/usePostQuizResult";
import { FlatList } from "react-native-gesture-handler";
import CountdownTask from "./CountdownTask";
import { useNavigation } from "@react-navigation/native";
import { DrawerParamList } from "../drawer/DrawerNavigation";
import { AppContext } from "../context/ApplicationContext";

type TasksProps = {
    quiz: QuizDetails,
}

const Tasks: React.FC<TasksProps> = ({ quiz }) => {
    console.log("Tasks render")
    const { isConnected } = useContext(AppContext);
    const [tasksAnswers, setTasksAnswers] = useState<{ [key: number]: number }>({});
    const { loading: postLoading, error: postError, postQuizResult } = usePostQuizResult();
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const isLastTask = currentTaskIndex === quiz.tasks.length - 1;
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();

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

    // Funkcja otwierająca modal
    const openModal = () => {
        setShowModal(true);
    };

    // Funkcja zamykająca modal
    const closeModal = () => {
        setShowModal(false);
    };

    const postQuizRezult = (): void => {
        const payload: QuizPostResult = {
            nick: "Alwaro",
            score: calcPoints(),
            total: quiz!.tasks.length,
            type: quiz!.name,
        }
        console.log(payload);
        postQuizResult(payload);

    }

    // this should be triggered on timeout and on deliberate "goNext" click
    const goToNextTask = () => {
        if (currentTaskIndex >= quiz.tasks.length - 1) {
            openModal();
        } else {
            setCurrentTaskIndex((prev) => prev + 1);
        }
    }

    const onSendClicked = () => {
        postQuizRezult();
        closeModal();
    }


    return (
        <>
            <CountdownTask
                task={quiz.tasks[currentTaskIndex]}
                taskIndex={currentTaskIndex}
                goToNextTask={goToNextTask}
                saveAnswers={saveAnswers}
                isLastTask={isLastTask}
            />

            <Modal
                visible={showModal}
                animationType="none"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Twój wynik: {`${calcPoints()}/${quiz.tasks.length}`}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={closeModal} style={styles.button}>
                                <Text style={styles.buttonText}>Zamknij</Text>
                            </TouchableOpacity>
                            {isConnected &&
                                <TouchableOpacity onPress={onSendClicked} style={styles.buttonSend}>
                                    <Text style={styles.buttonText}>Wyślij</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );

}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '60%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#ffb600',
        marginVertical: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    buttonSend: {
        backgroundColor: 'green',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 20,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
    }

})

export default Tasks;