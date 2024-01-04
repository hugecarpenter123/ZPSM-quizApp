// CountdownCircle.js
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, useWindowDimensions, Animated, Easing } from 'react-native';
import Answers from './Answers';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { _Task } from '../hooks/useFetchQuizDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TaskWithTimerProps = {
    task: _Task;
    taskIndex: number;
    goToNextTask: () => void;
    saveAnswers: (taskId: number, answerId: number) => void;
    isLastTask: boolean,
};

const CountdownTask: React.FC<TaskWithTimerProps> = ({
    task,
    taskIndex,
    goToNextTask,
    saveAnswers,
    isLastTask,
}) => {
    const { question, answers, duration } = task;
    const [selectedAnswerId, setSelectedAnswerId] = useState<null | number>(null);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined);
    const [progress, setProgress] = useState(100);
    const [timeLeft, setTimeLeft] = useState(duration);


    useEffect(() => {
        setSelectedAnswerId(null);
        setTimeLeft(duration);
        setProgress(100);

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const current = prev - 1;
                setProgress((current * 100) / duration);
                console.log(`countdown: ${current}, progress: ${(current * 100) / duration}`)
                if (current > 0) {
                    return current;
                } else {
                    if (selectedAnswerId) {
                        saveAnswers(taskIndex, selectedAnswerId)
                    }
                    goToNextTask();
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);

        setIntervalId(interval);

        return () => clearInterval(interval);
    }, [task]);

    const onNextPress = () => {
        if (isLastTask) {
            clearInterval(intervalId);
        }
        if (selectedAnswerId) {
            saveAnswers(taskIndex, selectedAnswerId)
        }
        goToNextTask();
    }

    return (
        <View style={styles.mainContainer}>
            <AnimatedCircularProgress
                size={50}
                width={5}
                prefill={100}
                fill={100 - progress}
                duration={900}
                easing={Easing.linear}
                tintColor='gray' 
                backgroundColor='#3498db'
                rotation={0}
                style={styles.progressCircle}
                children={() => (
                    <Text>{timeLeft}</Text>
                )}
            />
            <Text style={styles.question}>{question}</Text>
            <View style={styles.answersContainer}>
                <Answers answers={answers} onSelection={setSelectedAnswerId} selectedId={selectedAnswerId} />
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onNextPress}
                style={styles.button}
            >
                <Text style={styles.buttonText}>{isLastTask ? "Zakończ" : "Następne"}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    progressCircle: {
        alignSelf: 'flex-end',
        margin: 15,
    },
    question: {
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    answersContainer: {
        width: '100%',
        padding: 10
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#e67e22', // Orange color
        borderRadius: 5,
        marginVertical: 20,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CountdownTask;
