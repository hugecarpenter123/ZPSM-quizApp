import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native"
import { useContext } from "react";
import { AppContext } from "../context/ApplicationContext";
import LinearGradient from "react-native-linear-gradient";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
    const { loading, error, quizList } = useContext(AppContext);
    const Separator = (): JSX.Element => {
        return (
            <View style={styles.separator} />
        )
    }

    const TestItems = () => {
        return quizList ?
            (
                <>
                    {
                        quizList.map((item, index) => (
                            <DrawerItem key={index}
                                label={`${index + 1}. ${item.name.slice(0, 15)}...`}
                                onPress={() => props.navigation.navigate('TestScreen', { id: item.id })}
                            />
                        ))
                    }
                </>
            ) :
            <></>;
    }

    const onDrawQuiz = () => {
        // wylosuj quiz i przekieruj do TestScreen
        const randomQuizArrId = Math.floor(Math.random() * quizList!.length)
        const quiz = quizList![randomQuizArrId];
        props.navigation.navigate('TestScreen', quiz);
    }

    type DrawQuizButtonProps = {
        label: string,
        onPress: () => void;
    }
    const DrawQuizButton: React.FC<DrawQuizButtonProps> = ({ label, onPress }) => {
        return (
            <DrawerItem
                label={() => (
                    <LinearGradient
                        colors={['violet', 'green', 'orange', 'red']}
                        style={styles.drawQuizButton}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.drawQuizButtonText}>{label}</Text>
                    </LinearGradient>
                )}
                onPress={onPress}
            />
        )
    }

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../static/images/drawer-image.webp')}
                    style={styles.image}
                />
            </View>
            <DrawerItemList {...props} />
            <Separator />
            <DrawQuizButton label="Losuj Quiz!" onPress={onDrawQuiz} />
            <TestItems />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    separator: {
        width: '100%',
        backgroundColor: 'gray',
        height: 1,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        padding: 5,
    },
    image: {
        width: '100%',
        flex: 1,
        borderRadius: 8,
    },
    drawQuizButton: {
        // backgroundColor: 'violet',
        padding: 10,
        borderRadius: 5,
    },
    drawQuizButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
})

export default DrawerContent;