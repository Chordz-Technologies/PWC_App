import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/SuggestionScreenStyle';
import { addSuggestion } from '../services/authApi';

const SuggestionScreen = ({ navigation }: any) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) {
            Alert.alert(
                'Error',
                'Please enter your suggestion'
            );
            return;
        }

        try {
            setLoading(true);
            await addSuggestion({
                message: message,
            });
            setLoading(false);
            Alert.alert(
                'Success',
                'Thank you for your valuable suggestion.'
            );
            setMessage('');
            navigation.goBack();
        } catch (error: any) {
            setLoading(false);
            Alert.alert(
                'Error',
                error?.message || 'Something went wrong'
            );
        }
    };

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.container}>

                    {/* HEADER */}
                    <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header} >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>
                            Suggestions
                        </Text>
                        <View style={{ width: 24 }} />
                    </LinearGradient>

                    <ScrollView
                        contentContainerStyle={{
                            padding: 20,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.card}>
                            <Icon
                                name="bulb-outline"
                                size={50}
                                color="#4361ee"
                                style={{
                                    alignSelf: 'center',
                                    marginBottom: 15,
                                }}
                            />

                            <Text style={styles.title}>
                                Share Your Suggestions
                            </Text>

                            <Text style={styles.subTitle}>
                                We value your feedback.
                                Share ideas about referrals,
                                one-to-one meetings,
                                events, chapters, networking, {'\n'}
                                or any improvements.
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Write your suggestion here..."
                                placeholderTextColor="#999"
                                multiline
                                value={message}
                                onChangeText={setMessage}
                                textAlignVertical="top"
                            />

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Text style={styles.buttonText}>
                                            Submit Suggestion
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default SuggestionScreen;