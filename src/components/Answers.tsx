import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { _Task } from "../hooks/useFetchQuizDetails"

type _Answers = {
    content: string,
    isCorrect: boolean;
}[]

type AnswersProps = {
    answers: _Answers;
    onSelection: (answerIndex: number) => void,
    selectedId: number | null,
}

const Answers: React.FC<AnswersProps> = ({ onSelection, selectedId, answers }) => {
    return (
        <>
            {
                answers.map((item, answerIndex) => (
                    <TouchableOpacity
                        style={[styles.answerButton, selectedId === answerIndex && styles.selected]}
                        key={answerIndex}
                        onPress={() => onSelection(answerIndex)}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[selectedId === answerIndex && styles.selectedText]}
                        >{item.content}</Text>
                    </TouchableOpacity>
                ))
            }
        </>
    )
}


const styles = StyleSheet.create({
    answerButton: {
        // width: '100%',
        marginVertical: 4,
        borderRadius: 4,
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey'
    },
    selected: {
        backgroundColor: '#ffc99c',
        borderColor: '#ff841d',
        borderWidth: 2,
    },
    selectedText: {
        color: 'white',
    }

})

export default Answers;