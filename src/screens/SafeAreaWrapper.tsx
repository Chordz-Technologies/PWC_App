import React, { ReactNode } from 'react';
import {
    StatusBar,
    StyleSheet,
    View,
    Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
    children: ReactNode;
    backgroundColor?: string;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
    children,
    backgroundColor = '#ffffff',
}) => {

    return (
        <SafeAreaView
            style={[
                styles.container,
                { backgroundColor }
            ]}
            edges={['top', 'left', 'right']}
        >
            <StatusBar
                translucent={false}
                backgroundColor={backgroundColor}
                barStyle={
                    Platform.OS === 'android'
                        ? 'dark-content'
                        : 'light-content'
                }
            />

            <View style={styles.content}>
                {children}
            </View>

        </SafeAreaView>
    );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    content: {
        flex: 1,
    },
});