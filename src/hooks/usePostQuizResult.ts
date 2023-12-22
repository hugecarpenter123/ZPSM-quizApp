import React, { useState } from 'react';

export type QuizPostResult = {
    nick: string,
    score: number,
    total: number,
    type: string,
}

type PostQuizHookResult = {
    error: boolean,
    loading: boolean,
    success: boolean,
    postQuizResult: (payload: QuizPostResult) => Promise<void>,
}

const usePostQuizResult = (): PostQuizHookResult => {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const url = 'https://tgryl.pl/quiz/result'

    const postQuizResult = async (payload: QuizPostResult) => {
        setLoading(true);
        console.log("usePostQuizResult.postQuizResult()")
        
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            setSuccess(true)
        } else {
            setError(true)
        }
        setLoading(false);
    }

    return { error, loading, success, postQuizResult }
}

export default usePostQuizResult;

