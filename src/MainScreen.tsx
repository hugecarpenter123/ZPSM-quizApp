import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl } from "react-native";
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from './drawer/DrawerNavigation';
import { QuizOverview } from './hooks/useFetchQuizes';
import LoadingIndicator from './components/LoadingIndicator';
import { AppContext } from './context/ApplicationContext';
import { refresh } from '@react-native-community/netinfo';

type Props = DrawerScreenProps<DrawerParamList, 'MainScreen'>;


const MainScreen: React.FC<Props> = ({ route, navigation }) => {
    const { quizList, fetchQuizes, error, loading } = useContext(AppContext);

    const renderTags = (arr: string[]) => {
        return arr ? arr.map((str) => "#" + str).join(" ") : "";
    }

    const RenderItem = ({ item }: { item: QuizOverview }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('TestScreen', { id: item.id })}
                key={item.id}
            >
                <View style={styles.testContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>{item.description}</Text>
                    <Text><Text style={styles.bold}>Tagi:</Text> {renderTags(item.tags)}</Text>
                    <Text><Text style={styles.bold}>Poziom:</Text> {item.level}</Text>
                    <Text><Text style={styles.bold}>Ilośc zadań:</Text> {item.numberOfTasks}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const QuizOverviewsElement = (): JSX.Element => {
        // return quizList ? (
        //     <FlatList
        //         data={quizList}
        //         renderItem={RenderItem}
        //         keyExtractor={(item) => item.id}
        //         ListEmptyComponent={() => <Text>Brak dostępnych danych...</Text>}
        //     />
        // ) :
        //     <LoadingIndicator />
        return (
            <FlatList
                data={quizList}
                renderItem={RenderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text>Brak dostępnych danych...</Text>}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={fetchQuizes}
                    />
                }
            />
        )
    }

    return (
        <View style={styles.container}>
            <QuizOverviewsElement />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'RubikDoodleShadow-Regular',
        color: 'red'
    },
    bold: {
        fontWeight: 'bold',
    },
    testContainer: {
        borderWidth: 1,
        borderColor: 'dark-gray',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
})

export default MainScreen;