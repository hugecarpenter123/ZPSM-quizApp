import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
    value: string
}

const ComponentWithoutMemo = ({ value }: Props) => {
    console.log('Renderuje się bez memoizacji');
    for (let index = 0; index < 10000000; index++) {}
    return <Text>{value}</Text>
};

const ParentComponentWithoutMemo = () => {
    const data = 'Hello, World!';
    const [counter, setCounter] = useState(0);

    return (
        <View>
            <ComponentWithoutMemo value={data} />
            <ComponentWithoutMemo value={data} />
            <Text>{counter}</Text>
            <TouchableOpacity
                onPress={() => setCounter((prev) => prev + 1)}
            >
                <Text>counter++</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ParentComponentWithoutMemo;