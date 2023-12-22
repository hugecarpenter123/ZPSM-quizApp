import React, { memo, useState } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    value: string
}

const MemoizedComponent: React.FC<Props> = memo(({ value }) => {
    for (let index = 0; index < 10000000; index++) {}
    console.log('Renderuje się z memoizacją');
    return <Text>{value}</Text>
});

const ParentComponentWithMemo = () => {
    const data = 'Hello, World!';
    const [counter, setCounter] = useState(0);

    return (
        <View>
            <MemoizedComponent value={data} />
            <MemoizedComponent value={data} />
            <Text>{counter}</Text>
            <TouchableOpacity
                onPress={() => setCounter((prev) => prev + 1)}
            >
                <Text>counter++</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ParentComponentWithMemo;
