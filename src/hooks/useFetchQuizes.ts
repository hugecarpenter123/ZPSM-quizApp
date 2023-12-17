import React, { useEffect, useState } from "react";

type FetchQuizesHookResult = {
    error: boolean,
    loading: boolean,
    jsonResponse: QuizJson[] | undefined;
}

type QuizJson = {
    id: string,
    name: string,
    description: string,
    tags: string[],
    level: string,
    numberOfTasks: number,
}

type Task = {
    question: string,
    answers: {
        content: string,
        isCorrect: boolean,
    }[],
    duration: number,
}

const useFetchQuizes = (): FetchQuizesHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<QuizJson[] | undefined>(undefined);
    const url = 'https://tgryl.pl/quiz/tests';

    useEffect(() => {
        fetchQuizes();
    }, []);

    const fetchQuizes = async () => {
        const response = await fetch(url);
        console.log("------------")
        console.log(response)
        console.log("------------")
        if (!response.ok) {
            setError(true);
            setLoading(false);
            return;
        }
        const json = await response.json();
        console.log("============")
        console.log(json)
        console.log("============")
        setJsonResponse(json);
        setLoading(false);
    }

    return { error, loading, jsonResponse }
}

export default useFetchQuizes;