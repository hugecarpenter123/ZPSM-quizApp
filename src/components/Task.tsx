import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Answers from "./Answers";
import type { _Task } from '../hooks/useFetchQuizDetails';

type TaskProps = { task: _Task, taskIndex: number, saveTaskAnswer: (taskIndex: number, answerIndex: number) => void, }

const Task: React.FC<TaskProps> = ({ task, taskIndex, saveTaskAnswer }) => {
    console.log(`Task -${taskIndex}- render`);

    const [answerId, setAnswerId] = useState<null | number>(null);
    const onSelection = (answerIndex: number) => {
        setAnswerId(answerIndex);
        saveTaskAnswer(taskIndex, answerIndex);
    }
    return (
        <View style={styles.task} key={taskIndex}>
            <View>
                <Text style={styles.description}>{task.question}</Text>
            </View>
            <Answers task={task} taskIndex={taskIndex} onSelection={onSelection} selectedId={answerId} />
        </View>
    )
}

const styles = StyleSheet.create({
    description: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 5,
    },
    task: {
        marginTop: 30,
    },
})

export default Task;