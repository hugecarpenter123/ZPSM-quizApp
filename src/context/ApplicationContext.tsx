import React, { ReactNode, createContext, useEffect, useState } from "react";
import useFetchQuizes, { QuizOverview } from "../hooks/useFetchQuizes";

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