import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { Image, StyleSheet, View } from "react-native"
import tests from "../tests/Tests";
import { Drawer } from "./DrawerNavigation";
import TestScreen from "../TestScreen";

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {

    const Separator = (): JSX.Element => {
        return (
            <View style={styles.separator} />
        )
    }

    const TestItems = () => {
        return (
            <>
                {
                    tests.map((item, index) => (
                        <DrawerItem key={index}
                            label={`${index + 1}. ${item.description.slice(0, 15)}...`}
                            onPress={() => props.navigation.navigate('TestScreen', { id: index })}
                        />
                    ))
                }
            </>
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
        // resizeMode: 'contain'
    }
})

export default DrawerContent;