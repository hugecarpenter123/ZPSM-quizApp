import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Answer = { content: string, isCorrect: boolean };
type Task = { question: string, answers: Answer[] };
const taskExample = {
    question: "Habababa?",
    answers: [
        {
            content: "jo",
            isCorrect: false,
        },
        {
            content: "ba",
            isCorrect: false,
        },
        {
            content: "se",
            isCorrect: false,
        },
        {
            content: "xd",
            isCorrect: true,
        },
    ],
};


const quiz: Task[] = Array(10).fill({ ...taskExample })

type AnswerProps = {
    answers: Answer[],
    onSelected: (id: number) => void,
    activeId: number | null
}
const Answers = ({ answers, onSelected, activeId }: AnswerProps) => {
    // console.log('Answers render');
    return (
        <View>
            {
                answers.map((answer, index) => (
                    <TouchableOpacity
                        onPress={() => onSelected(index)}
                        style={[styles.answerButton, activeId === index && styles.selected]}
                        key={index}
                    >
                        <Text>{answer.content}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
};

// =============== task ========================
type TaskProps = {
    task: Task,
    taskIndex: number,
    updateTasksAnswers: (taskIndex: number, answerIndex: number) => void;
}
const TaskCmp: React.FC<TaskProps> = ({ task, taskIndex, updateTasksAnswers }) => {
    console.log(`TaskCmp -${taskIndex}- render`);
    const [answerId, setAnswerId] = useState<null | number>(null);

    const handleTaskAnswerSelection = useCallback(
        (answerIndex: number) => {
            setAnswerId(answerIndex);
            // updateTasksAnswers(taskIndex, answerIndex)
        },
        [],
    );

    // const handleTaskAnswerSelection = (answerIndex: number) => {
    //     setAnswerId(answerIndex);
    //     updateTasksAnswers(taskIndex, answerIndex)
    // }

    return (
        <View>
            <Text>{task.question}</Text>
            <Answers answers={task.answers} onSelected={handleTaskAnswerSelection} activeId={answerId} />
        </View>
    )
}
// =============== END task =====================



// =============== main ========================
const ExampleCmp = () => {
    console.log("ExampleCmp render")
    const [tasksAnswers, setTasksAnswers] = useState<{ [key: number]: number }>({});

    const updateTasksAnswers = (taskIndex: number, answerIndex: number) => {
        setTasksAnswers((prevAnswers) => ({ ...prevAnswers, [taskIndex]: answerIndex }));
    }

    return (
        <ScrollView>
            {
                quiz.map((task, index) => (
                    <TaskCmp task={task} taskIndex={index} key={index} updateTasksAnswers={updateTasksAnswers} />
                ))
            }
        </ScrollView>
    );
};
// =============== END main =====================

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
    bold: {
        fontWeight: 'bold',
    },
    level: {
        textAlign: 'center',
        marginTop: 10
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
        marginVertical: 10,
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
    },
    tasksContainer: {

    },
    task: {
        marginTop: 30,
    },
})
export default ExampleCmp;