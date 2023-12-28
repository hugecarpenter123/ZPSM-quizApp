import React, { ReactNode, createContext, useEffect, useState } from "react";
import useFetchQuizes, { QuizOverview } from "../hooks/useFetchQuizes";
import { useInternetConnectivity } from "../hooks/useInternetConnection";

interface AppContextProps {
    quizList: QuizOverview[] | undefined;
    loading: boolean;
    error: boolean;
    quizIdList: string[] | undefined;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
type Props = {
    children: ReactNode;
};

export const AppContextProvider: React.FC<Props> = ({ children }) => {
    const { quizList: onlineQuizList, loading, error, quizIdList, fetchQuizes } = useFetchQuizes();
    const { isConnected } = useInternetConnectivity()

    const [quizList, setQuizList] = useState<QuizOverview[] | undefined>(undefined);

    const fetchQuizesOffline = () => {
        return undefined;
    }

    useEffect(() => {
        console.log("AppContextProvider.useEffect()[loading]");
        console.log("\tloading:", loading);
        console.log("\tisConnected:", isConnected);
        if (isConnected) {
            fetchQuizes();
        } else {
            // tutaj wywołać metodę która w jakiś sposób pobierze quizy offline i zapoda je do state
        }
    }, [])

    useEffect(() => {
        if (onlineQuizList !== undefined) {
            // 1. zapisz offline do bazy danych
            // ...

            // 2. aktualizuj globalny stan quizów
            setQuizList(onlineQuizList);
        }
    }, [onlineQuizList])

    const contextContent: AppContextProps = {
        quizList,
        loading,
        error,
        quizIdList
    };

    return (
        <AppContext.Provider value={contextContent}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;