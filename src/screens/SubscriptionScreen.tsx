import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import RazorpayCheckout from 'react-native-razorpay';
import SafeAreaWrapper from './SafeAreaWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllSubscriptions, createSubscriptionPayment, verifySubscriptionPayment, } from '../services/authApi';
import { styles } from '../styles/SubscriptionScreenStyle';

const SubscriptionScreen = ({ navigation }: any) => {
    const [subscriptions, setSubscriptions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);

    useEffect(() => {
        loadSubscriptions();
    }, []);

    const loadSubscriptions = async () => {
        try {
            setLoading(true);
            const response = await getAllSubscriptions();

            if (
                response?.status === 'success' &&
                Array.isArray(response?.all_subscriptions)
            ) {
                setSubscriptions(
                    response.all_subscriptions
                );
            } else {
                setSubscriptions([]);
            }
        } catch (error: any) {
            Alert.alert('Error', error?.message || 'Unable to load subscriptions.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (subscription: any) => {
        if (paymentLoading) {
            return;
        }

        try {
            setPaymentLoading(true);
            const memberId = await AsyncStorage.getItem('userId');

            if (!memberId) {
                Alert.alert('Error', 'Member ID not found. Please login again.',);
                return;
            }

            const orderResponse = await createSubscriptionPayment(memberId, subscription.id);

            if (orderResponse?.status !== 'success') {
                Alert.alert('Error', orderResponse?.message || 'Unable to create payment order.',);
                return;
            }

            const orderId = orderResponse?.data?.order_details?.razorpay_order_id;
            const razorpayKey = orderResponse?.data?.razorpay_key;

            if (!orderId) {
                Alert.alert('Error', 'Razorpay order ID not received.',);
                return;
            }

            if (!razorpayKey) {
                Alert.alert('Error', 'Razorpay key not received.',);
                return;
            }

            const options = {
                description: `${subscription.name} Subscription`,
                currency: 'INR',
                key: razorpayKey,
                amount: Math.round(Number(subscription.price) * 100),
                name: 'Pune Women’s Club',
                order_id: orderId,
                theme: { color: '#4361ee', },
            };

            const paymentData = await RazorpayCheckout.open(options);

            if (!paymentData?.razorpay_payment_id || !paymentData?.razorpay_signature) {
                Alert.alert('Payment Failed', 'Payment details were not received.',);
                return;
            }

            const verifyResponse = await verifySubscriptionPayment({
                order_id: orderId,
                razorpay_payment_id: paymentData.razorpay_payment_id,
                razorpay_signature: paymentData.razorpay_signature,
                razorpay_key: razorpayKey,
            });

            if (verifyResponse?.status === 'success' || verifyResponse?.code === 200 || verifyResponse?.verified === true) {
                await AsyncStorage.setItem('subscription_status', 'ACTIVE',);
                Alert.alert('Success', 'Subscription activated successfully!',
                    [{
                        text: 'OK',
                        onPress: () => {
                            navigation.goBack();
                        },
                    }],
                );
            } else {
                Alert.alert('Payment Verification Failed', verifyResponse?.message || 'Unable to verify payment.',);
            }
        } catch (error: any) {
            if (error?.code === 0 || error?.code === 2) {
                Alert.alert('Payment Cancelled', 'You cancelled the payment.',);
            } else {
                Alert.alert('Payment Failed', error?.message || error?.description || 'Unable to complete payment.',);
            }
        } finally {
            setPaymentLoading(false);
        }
    };

    const getBenefits = (benefits: string) => {
        if (!benefits) {
            return [];
        }
        return benefits
            .split('\n')
            .map((item: string) => item.trim())
            .filter(Boolean);
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                <LinearGradient colors={['#4361ee', '#3f37c9',]} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        Subscription
                    </Text>
                </LinearGradient>

                {loading ? (
                    <ActivityIndicator size="large" color="#4361ee"
                        style={{ marginTop: 40, }}
                    />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 15,
                            paddingBottom: 40,
                        }}
                    >
                        {subscriptions.length === 0 ? (
                            <Text style={styles.emptyText}>
                                No subscriptions available.
                            </Text>
                        ) : (
                            subscriptions.map(
                                (item: any) => (
                                    <View key={item.id} style={styles.subscriptionCard}>
                                        <View style={styles.planHeader}>
                                            <View style={styles.planIcon}>
                                                <Icon name="star" size={25} color="#fff" />
                                            </View>
                                            <View
                                                style={{
                                                    flex: 1,
                                                    marginLeft: 12,
                                                }}
                                            >
                                                <Text style={styles.planName}>
                                                    {item.name}
                                                </Text>
                                                <Text style={styles.duration}>
                                                    {item.duration_months}{' '}
                                                    Months
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.priceContainer}>
                                            <Text style={styles.price}>
                                                ₹{Number(item.price).toLocaleString('en-IN')}
                                            </Text>
                                            <Text style={styles.perPlan}>
                                                / {item.duration_months}{' '}months
                                            </Text>
                                        </View>

                                        <Text style={styles.benefitTitle}>
                                            Benefits
                                        </Text>

                                        {getBenefits(item.benefits)
                                            .map(
                                                (benefit: string, index: number) => (
                                                    <View key={index} style={styles.benefitRow}>
                                                        <Icon name="checkmark-circle" size={18} color="#06d6a0" />
                                                        <Text style={styles.benefitText}>
                                                            {benefit}
                                                        </Text>
                                                    </View>
                                                )
                                            )}

                                        <TouchableOpacity style={styles.subscribeButton}
                                            disabled={paymentLoading}
                                            onPress={() => handleSubscribe(item)}>

                                            {paymentLoading ? (
                                                <ActivityIndicator color="#fff" />
                                            ) : (
                                                <>
                                                    <Icon name="card-outline" size={20} color="#fff" />
                                                    <Text style={styles.subscribeText}>
                                                        Subscribe Now
                                                    </Text>
                                                </>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                )
                            )
                        )}
                    </ScrollView>
                )}

                {paymentLoading && (
                    <View style={styles.paymentOverlay}>
                        <View style={styles.paymentLoaderCard}>
                            <ActivityIndicator size="large" color="#4361ee" />
                            <Text style={styles.paymentLoaderText}>
                                Processing payment...
                            </Text>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaWrapper>
    );
};

export default SubscriptionScreen;