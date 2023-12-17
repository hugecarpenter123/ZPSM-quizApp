import React, { useEffect, useState } from "react";

type FetchQuizDetailsHookResult = {
    error: boolean,
    loading: boolean,
    jsonResponse: QuizJson[] | undefined;
    fetchQuizDetails: () => Promise<void>
}

export type QuizJson = {
    tags: string[],
    tasks: Task[],
    name: string,
    description: string,
    level: string,
    id: string,
}

export type Task = {
    question: string,
    answers: {
        content: string,
        isCorrect: boolean,
    }[],
    duration: number,
}

const useFetchQuizes = (id: string): FetchQuizDetailsHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<QuizJson[] | undefined>(undefined);
    const url = 'https://tgryl.pl/quiz/test/' + id;

    const fetchQuizDetails = async () => {
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

    return { error, loading, jsonResponse, fetchQuizDetails }
}

export default useFetchQuizes;