import React, { useEffect, useState } from "react";
import shuffleArray from "../utils/ShuffleData";

type FetchQuizDetailsHookResult = {
    error: boolean,
    loading: boolean,
    quiz: QuizDetails | undefined;
    fetchQuizDetails: () => Promise<any>
}

export type QuizDetails = {
    tags: string[],
    tasks: _Task[],
    name: string,
    description: string,
    level: string,
    id: string,
}

export type _Task = {
    question: string,
    answers: {
        content: string,
        isCorrect: boolean,
    }[],
    duration: number,
}

const useFetchQuizDetails = (id: string): FetchQuizDetailsHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<QuizDetails | undefined>(undefined);
    const url = 'https://tgryl.pl/quiz/test/' + id;

    const fetchQuizDetails = async () => {
        console.log("useFetchQuizeDetails.fetchQuizDetails()")
        const response = await fetch(url);
        if (!response.ok) {
            setError(true);
            setLoading(false);
            return null;
        }
        const json: QuizDetails = await response.json();
        console.log("quiz details json response received, shuffled & saved.")
        const shuffledQuiz = shuffleData(json);
        setJsonResponse(shuffledQuiz);
        setLoading(false);
        return json;
    }

    const shuffleData = (json: QuizDetails): QuizDetails => {
        const shuffledTasks = json.tasks.map(task => ({
            ...task,
            answers: shuffleArray(task.answers),
        }));

        const shuffledQuiz: QuizDetails = {
            ...json,
            tasks: shuffledTasks,
        };

        return shuffledQuiz;
    }

    return { error, loading, quiz: jsonResponse, fetchQuizDetails }
}

export default useFetchQuizDetails;