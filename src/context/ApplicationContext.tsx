import React, { ReactNode, createContext, useEffect, useState } from "react";
import useFetchQuizes, { QuizOverview } from "../hooks/useFetchQuizes";
import { useInternetConnectivity } from "../hooks/useInternetConnection";
import { getAllQuizOverviewsPromise, initializeDatabase, insertQuizOverviews, fetchCompleteQuizDetails } from "../utils/DbManager";

interface AppContextProps {
    quizList: QuizOverview[] | undefined;
    loading: boolean;
    error: boolean;
    quizIdList: string[] | undefined;
    isConnected: boolean;
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps);
type Props = {
    children: ReactNode;
};

/**
 * 
 * AppContextProvider w trakcie ładowania ekranu ocenia czy jest połączenie z internetem, jeżeli tak to pobiera
 * quizy online, w przeciwnym razie robi to offline.
 * 
 */
export const AppContextProvider: React.FC<Props> = ({ children }) => {
    console.log("AppContextProvider render")
    const { quizList: onlineQuizList, loading, error, quizIdList, fetchQuizes } = useFetchQuizes();
    const { isConnected } = useInternetConnectivity()

    const [quizList, setQuizList] = useState<QuizOverview[] | undefined>(undefined);

    const fetchQuizesOffline = () => {
        getAllQuizOverviewsPromise()
            .then(result => {
                setQuizList(result);
            })
            .catch(error => { console.error("fetchQuizesOffline failed for some reson") })
    }

    // MAIN - inicjalizuj db, intenetConnection ? fetchQuizeOverwievs : go for embedded db
    useEffect(() => {
        initializeDatabase() // dla zasady ponieważ zazwyczaj baza oraz tabele już istnieją 
            .then(() => console.log("from useEffect db initialized"))
            .catch((error) => { console.error("from useEffect db not initialized, error") })

        if (isConnected) {
            fetchQuizes(); // kolejny useEffect zajmie się przypisaniem wartości do stanu oraz zapisu do bazy danych
            // fetchQuizesOffline();
        } else {
            // tutaj wywołać metodę która w jakiś sposób pobierze quizy offline i zapoda je do state
            fetchQuizesOffline();
        }
    }, [])


    useEffect(() => {
        if (onlineQuizList !== undefined) {
            console.log("useEffect() [onlineQuizList !== undefined]")
            // 1. zapisz offline do bazy danych (jeżeli nie istnieje!)
            insertQuizOverviews(onlineQuizList);

            // 2. aktualizuj globalny stan quizów
            setQuizList(onlineQuizList);
        }
    }, [onlineQuizList])

    useEffect(() => {
        console.log("---quizList state:", quizList != undefined)
        if (quizList) {
            fetchCompleteQuizDetails("62032610069ef9b2616c761e");
        }
    }, [quizList]);

    const contextContent: AppContextProps = {
        quizList,
        loading,
        error,
        quizIdList,
        isConnected,
    };

    return (
        <AppContext.Provider value={contextContent}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;