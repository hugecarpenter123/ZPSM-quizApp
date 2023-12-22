import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import useFetchResults, { ResultJson } from "./hooks/useFetchResults";
import React, { useEffect } from "react";
import LoadingIndicator from "./components/LoadingIndicator";

const ResultScreen = () => {
    const { error, loading, jsonResponse } = useFetchResults();
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

    const ResultData = (): React.JSX.Element => {
        if (jsonResponse) {
            return (
                <FlatList
                    data={jsonResponse}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={styles.mainWrapper}
                />
            );
        } else if (!error && loading) {
            return <Text>Pobieranie danych...</Text>
        } else {
            return <Text>Wystąpił błąd podczas pobierania danych</Text>
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Wyniki</Text>
            <ResultData />
            {loading && <LoadingIndicator />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
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