import { SafeAreaView, StyleSheet, Text, View, FlatList, Platform, StatusBar, RefreshControl } from "react-native";
import useFetchResults, { ResultJson } from "./hooks/useFetchResults";
import React, { useContext, useEffect } from "react";
import LoadingIndicator from "./components/LoadingIndicator";
import { AppContext } from "./context/ApplicationContext";

const ResultScreen = () => {
    const { isConnected } = useContext(AppContext);
    const { error, loading, jsonResponse, fetchResults } = useFetchResults();

    useEffect(() => {
        if (isConnected) {
            console.log("ResultScreen.useEffect()[] (isConnected)")
            fetchResults();
        }
    }, [])

    const renderItem = ({ item }: { item: ResultJson }) => {
        return (
            <View style={styles.resultWrapper}>
                <View style={styles.infoLine}>
                    <Text style={styles.bold}>Nick:</Text>
                    <Text>{item.nick}</Text>
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.bold}>Score:</Text>
                    <Text>{item.score}/{item.total}</Text>
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.bold}>Type:</Text>
                    <Text>{item.type}</Text>
                </View>
                <View style={styles.infoLine}>
                    <Text style={styles.bold}>Created on:</Text>
                    <Text>{item.createdOn}</Text>
                </View>
            </View>
        );
    };

    const onRefresh = () => {
        if (isConnected) {
            console.log("---refresh triggered and isConnected---")
            fetchResults();
        }
    }

    const ResultData = (): React.JSX.Element => {
        if (jsonResponse) {
            return (
                <FlatList
                    data={jsonResponse}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={onRefresh}
                        />
                    }
                    style={styles.mainWrapper}
                    ListEmptyComponent={() => <Text style={{textAlign: 'center'}}>Brak dostępnych danych...</Text>}
                />
            );
        } else if (!error && loading) {
            return <Text>Pobieranie danych...</Text>
        } else {
            return <Text>Wystąpił błąd podczas pobierania danych</Text>
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.header}>Wyniki</Text>
            <ResultData />
            {loading && <LoadingIndicator />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        fontFamily: 'RubikDoodleShadow-Regular',
        fontSize: 30,
        color: 'tomato',
        textAlign: 'center',
        marginBottom: 10,
    },
    bold: {
        fontWeight: "bold",
        marginRight: 10,
    },
    resultWrapper: {
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        marginBottom: 10,
    },
    infoLine: {
        flexDirection: 'row',
    },
    mainWrapper: {
        marginHorizontal: '10%',
    }
});

export default ResultScreen;