import React from 'react';
import { Text, TouchableOpacity, Linking, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';

const MembershipRequiredScreen = ({ navigation }: any) => {
    return (
        <SafeAreaWrapper>
            <LinearGradient colors={['#4361ee', '#3f37c9']}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 25,
                }}
            >
                <Icon
                    name="lock-closed"
                    size={90}
                    color="#fff"
                />

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 28,
                        fontWeight: 'bold',
                        marginTop: 25,
                    }}
                >
                    Membership Required
                </Text>

                <Text
                    style={{
                        color: '#fff',
                        textAlign: 'center',
                        marginTop: 18,
                        fontSize: 16,
                        lineHeight: 26,
                    }}
                >
                    Visitor account limit exceeded.

                    {'\n\n'}

                    Upgrade membership to unlock:

                    {'\n'}

                    • Unlimited Referrals

                    {'\n'}

                    • Unlimited 1:1 Meetings

                    {'\n'}

                    • Premium Features
                </Text>

                <Text
                    style={{
                        color: '#fff',
                        marginTop: 25,
                        fontSize: 16,
                        fontWeight: '700',
                    }}
                >
                    Contact Admin
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL(
                            'tel:+919011126662'
                        )
                    }
                    activeOpacity={0.8}
                >
                    <Text
                        style={{
                            color: '#fff',
                            marginTop: 10,
                            fontSize: 20,
                            textDecorationLine: 'underline',
                            fontWeight: '600',
                        }}
                    >
                        +91 9011126662
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.replace('Home')
                    }
                    style={{
                        backgroundColor: '#fff',
                        paddingHorizontal: 30,
                        paddingVertical: 14,
                        borderRadius: 14,
                        marginTop: 40,
                    }}
                >
                    <Text
                        style={{
                            color: '#3f37c9',
                            fontWeight: 'bold',
                            fontSize: 16,
                        }}
                    >
                        Go Back
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaWrapper>
    );
};

export default MembershipRequiredScreen;