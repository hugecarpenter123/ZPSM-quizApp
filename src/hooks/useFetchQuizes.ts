import React, { useEffect, useState } from "react";
import { shuffleArray } from "../utils/ShuffleData";

type FetchQuizesHookResult = {
    error: boolean,
    loading: boolean,
    quizList: QuizOverview[] | undefined;
    quizIdList: string[] | undefined;
    fetchQuizes: () => Promise<void>;
}

export type QuizOverview = {
    id: string,
    name: string,
    description: string,
    tags: string[],
    level: string,
    numberOfTasks: number,
}


const useFetchQuizes = (): FetchQuizesHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [quizList, setQuizList] = useState<QuizOverview[] | undefined>(undefined);
    const [quizIdList, setQuizIdList] = useState<string[] | undefined>(undefined);
    const url = 'https://tgryl.pl/quiz/tests';

    useEffect(() => {
        if (quizIdList) {
            setQuizIdList(quizList!.map((item) => item.id));
        }
    }, [quizList]);

    const fetchQuizes = async () => {
        setLoading(true);
        setError(false);
        console.log("useFetchQuizes.fetchQuizes()")
        const response = await fetch(url);
        if (!response.ok) {
            setError(true);
            setLoading(false);
            return;
        }
        const json = await response.json();
        console.log("\tquizes json response received and saved.")
        setQuizList(json);
        setLoading(false);
    }

    return { error, loading, quizList, quizIdList, fetchQuizes }
}

export default useFetchQuizes;