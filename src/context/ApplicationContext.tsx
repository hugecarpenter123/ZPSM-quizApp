import React, { ReactNode, createContext, useEffect, useState } from "react";
import useFetchQuizes, { QuizOverview } from "../hooks/useFetchQuizes";
import useInternetConnection from "../hooks/useInternetConnection";

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
    const { quizList, loading, error, quizIdList } = useFetchQuizes();
    const { isConnected } = useInternetConnection();

    useEffect(() => {
        console.log("ApplicationContext.useEffetc()[]");
        console.log("\tisConnected:", isConnected);
    }, [])

    const fetchQuizesOffline = () => {
        // function to fetch data from database and return it
    }

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