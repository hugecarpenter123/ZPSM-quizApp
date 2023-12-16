import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import useFetchResults from "./hooks/useFetchResults";
import React from "react";
const result = {
    "nick": "Władysław Łokietek",
    "score": 17,
    "total": 20,
    "type": "historia",
    "date": "2022-11-22"
}

function ResultScreen() {
    const { error, loading, jsonResponse } = useFetchResults();

    const ResultData = (): React.JSX.Element => {
        console.log("result data should render")
        console.log(jsonResponse)
        if (jsonResponse) {
            return (
                <>
                    {jsonResponse && jsonResponse.map((item, index) => (
                        <View style={styles.resultWrapper} key={item.id}>
                            <Text>nick: {item.nick}</Text>
                            <Text>score: {item.score}</Text>
                            <Text>total: {item.total}</Text>
                            <Text>createdOn: {item.createdOn}</Text>
                        </View>
                    ))}
                </>
            );
        } else if (!error && loading) {
            return <Text>Pobieranie danych...</Text>
        } else {
            return <Text>Wystąpił błąd podczas pobierania danych</Text>
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {error && <Text>Wystąpił błąd podczas pobierania danych z serwera</Text>}
            <Text style={styles.header}>Brawo uzyskałeś/aś {result.score}/{result.total} punktów!</Text>
            <ResultData />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    header: {
        fontFamily: 'RubikDoodleShadow-Regular'
    },
    resultWrapper: {

    },
});

export default ResultScreen;