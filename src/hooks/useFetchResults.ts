import React, { useState, useEffect } from "react";

export type ResultJson = {
    nick: string,
    score: number,
    total: number
    type: string,
    createdOn: string,
    id: string,
}

type FetchResultsHookResult = {
    error: null | string,
    loading: boolean,
    jsonResponse: ResultJson[] | undefined;
}

const useFetchResults = (): FetchResultsHookResult => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<ResultJson[] | undefined>(undefined);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        const url = "https://tgryl.pl/quiz/results?last=20";
        const response = await fetch(url);
        console.log("------------")
        console.log(response)
        console.log("------------")
        if (!response.ok) {
            setError("Błąd podczas pobierania danych");
            setLoading(false);
        }
        const json = await response.json();
        console.log("============")
        console.log(json)
        console.log("============")
        setLoading(false)
        setError(null)
        setJsonResponse(json);
    }

    return { error, loading, jsonResponse }
}

export default useFetchResults;