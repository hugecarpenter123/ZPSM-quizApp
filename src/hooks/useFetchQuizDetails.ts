import React, { useEffect, useState } from "react";
import { insertQuizDetails } from "../utils/DbManager";
import { shuffleArray } from "../utils/ShuffleData";

type FetchQuizDetailsHookResult = {
    error: boolean,
    loading: boolean,
    quiz: QuizDetails | undefined;
    fetchQuizDetails: () => Promise<QuizDetails>
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

const shuffleQuiz = (json: QuizDetails): QuizDetails => {
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

const useFetchQuizDetails = (id: string): FetchQuizDetailsHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<QuizDetails | undefined>(undefined);
    const url = 'https://tgryl.pl/quiz/test/' + id;

    const fetchQuizDetailsPromise = (): Promise<QuizDetails> => {
        console.log("useFetchQuizeDetails.fetchQuizDetails()");

        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        setError(true);
                        setLoading(false);
                        reject(new Error(`Failed to fetch quiz details. Status: ${response.status}`));
                    }
                    return response.json();
                })
                .then(
                    (json: QuizDetails) => {
                        console.log("Quiz details JSON response received");
                        insertQuizDetails(json); // Save to DB
                        const shuffledQuiz = shuffleQuiz(json);
                        setJsonResponse(shuffledQuiz); // Set state
                        setLoading(false);
                        resolve(shuffledQuiz);
                    },
                    (error) => {
                        console.error("Error processing JSON response or saving to database:", error);
                        setLoading(false);
                        reject(error);
                    }
                )
                .catch((error) => {
                    console.error("Unexpected error:", error);
                    reject(error);
                });
        });
    };

    return { error, loading, quiz: jsonResponse, fetchQuizDetails: fetchQuizDetailsPromise }
}

export default useFetchQuizDetails;