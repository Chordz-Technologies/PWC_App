import React, { ReactNode } from 'react';
import { StatusBar, Platform, StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
    children: ReactNode;
    backgroundColor?: string;
}

const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
    children,
    backgroundColor = '#FFFFFF',
}) => {
    const insets = useSafeAreaInsets();

    const androidVersion =
        Platform.OS === 'android' ? Number(Platform.Version) : null;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <StatusBar
                barStyle={
                    androidVersion !== null && androidVersion >= 34
                        ? 'dark-content'
                        : 'light-content'
                }
                backgroundColor={backgroundColor}
            />

            <View
                style={[
                    styles.content,
                    {
                        paddingTop:
                            Platform.OS === 'android'
                                ? Math.max(insets.top, 0) // auto adjusts
                                : insets.top,
                    },
                ]}
            >
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