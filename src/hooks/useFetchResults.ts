import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/ApplicationContext";

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
    fetchResults: () => Promise<void>;
}

const useFetchResults = (): FetchResultsHookResult => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [jsonResponse, setJsonResponse] = useState<ResultJson[] | undefined>(undefined);

    const fetchResults = async () => {
        const url = "https://tgryl.pl/quiz/results?last=20";
        const response = await fetch(url);
        if (!response.ok) {
            setError("Błąd podczas pobierania danych");
            setLoading(false);
        }
        const json = await response.json();
        setLoading(false)
        setError(null)
        setJsonResponse(json);
    }

    return { error, loading, jsonResponse, fetchResults }
}

export default useFetchResults;