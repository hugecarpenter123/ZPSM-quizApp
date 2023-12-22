import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { _Task } from "../hooks/useFetchQuizDetails"

type AnswersProps = {
    task: _Task,
    taskIndex: number,
    onSelection: (answerIndex: number) => void,
    selectedId: number | null,
}

const Answers: React.FC<AnswersProps> = ({ task, taskIndex, onSelection, selectedId }) => {
    return (
        <>
            {
                task.answers.map((item, answerIndex) => (
                    <TouchableOpacity
                        style={[styles.answerButton, selectedId === answerIndex && styles.selected]}
                        key={answerIndex}
                        onPress={() => onSelection(answerIndex)}
                        activeOpacity={0.8}
                    >
                        <Text>{item.content}</Text>
                    </TouchableOpacity>
                ))
            }
        </>
    )
}


const styles = StyleSheet.create({
    answerButton: {
        marginVertical: 4,
        borderRadius: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey'
    },
    selected: {
        backgroundColor: 'lightgreen',
        borderColor: 'green',
        borderWidth: 2,
    },

})

export default Answers;