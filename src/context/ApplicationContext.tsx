import React, { ReactNode, createContext, useCallback, useEffect, useState } from "react";
import useFetchQuizes, { QuizOverview } from "../hooks/useFetchQuizes";
import { useInternetConnectivity } from "../hooks/useInternetConnection";
import { getAllQuizOverviewsPromise, initializeDatabase, insertQuizOverviews, fetchCompleteQuizDetails } from "../utils/DbManager";
import { shuffleArray } from "../utils/ShuffleData";
import NetInfo from '@react-native-community/netinfo';

interface AppContextProps {
    fetchQuizes: () => Promise<void>;
    quizList: QuizOverview[] | undefined;
    loading: boolean;
    error: boolean;
    quizIdList: string[] | undefined;
    isConnected: undefined | boolean;
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
    const [initialOnlineFetchDone, setInitialOnlineFetchDone] = useState(false);
    const [dbInitialized, setDbInitialized] = useState(false);
    const { isConnected } = useInternetConnectivity()

    const [quizList, setQuizList] = useState<QuizOverview[] | undefined>(undefined);

    const fetchQuizesOffline = () => {
        getAllQuizOverviewsPromise()
            .then(result => {
                setQuizList(shuffleArray(result));
            })
            .catch(error => { console.error("fetchQuizesOffline failed for some reson") })
    }

    // MAIN - inicjalizuj db, intenetConnection ? fetchQuizeOverwievs : go for embedded db
    useEffect(() => {
        initializeDatabase() // dla zasady ponieważ zazwyczaj baza oraz tabele już istnieją 
            .then(async () => {
                console.log("Db initialized successfully")
                const netInfo = await NetInfo.fetch();
                if (netInfo.isConnected) {
                    console.log(`\t-INITIAL FETCH ONLINE`)
                    fetchQuizes(); // kolejny useEffect zajmie się przypisaniem wartości do stanu oraz zapisu do bazy danych
                } else {
                    // tutaj wywołać metodę która w jakiś sposób pobierze quizy offline i zapoda je do state
                    console.log(`\t-INITIAL FETCH OFFLINE`)
                    fetchQuizesOffline();
                }
            })
            .catch((error) => { console.error("from useEffect db not initialized, error") })
    }, [])

    useEffect(() => {
        if (onlineQuizList !== undefined) {
            console.log("useEffect() [onlineQuizList !== undefined]")
            // 1. zapisz offline do bazy danych (jeżeli nie istnieje!)
            insertQuizOverviews(onlineQuizList);

            // 2. potasuj i aktualizuj globalny stan quizów
            setQuizList(shuffleArray(onlineQuizList));
        }
    }, [onlineQuizList])

    const contextContent: AppContextProps = {
        fetchQuizes,
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