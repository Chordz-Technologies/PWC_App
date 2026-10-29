import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { getAllChapterMeetings, createMeetingPayment, verifyMeetingPayment, } from '../services/authApi';
import { styles } from '../styles/RegularMeetingsScreenStyle';

const RegularMeetingsScreen = ({ navigation, route }: any) => {
    const [meetings, setMeetings] = useState<any[]>([]);
    const [filteredMeetings, setFilteredMeetings] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [paymentLoadingId, setPaymentLoadingId] = useState<number | null>(null,);

    useEffect(() => {
        fetchMeetings();
    }, []);

    // Fetch meetings from other chapters
    const fetchMeetings = async () => {
        try {
            setLoading(true);
            const chapterId = await AsyncStorage.getItem('chapter_id');
            if (!chapterId) {
                setMeetings([]);
                setFilteredMeetings([]);
                return;
            }
            const userChapterId = Number(chapterId);
            const res = await getAllChapterMeetings();
            if (
                res?.all_chapter_meet &&
                Array.isArray(res.all_chapter_meet)
            ) {
                const otherChapterMeetings = res.all_chapter_meet.filter(
                    (item: any) => Number(item.chapter) !== userChapterId,
                );

                setMeetings(otherChapterMeetings);
                setFilteredMeetings(otherChapterMeetings);
            } else {
                setMeetings([]);
                setFilteredMeetings([]);
            }
        } catch (error) {
            setMeetings([]);
            setFilteredMeetings([]);
        } finally {
            setLoading(false);
        }
    };

    // Search meetings by title
    const handleSearch = (text: string) => {
        setSearch(text);
        const filtered = meetings.filter((item: any) =>
            item.title?.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredMeetings(filtered);
    };

    // Format date
    const formatDate = (date: string) => {
        if (!date) {
            return 'Date not available';
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return date;
        }

        return parsedDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    // Format time
    const formatTime = (time: string) => {
        if (!time) {
            return '';
        }

        const parsedTime = new Date(`1970-01-01T${time}`);

        if (Number.isNaN(parsedTime.getTime())) {
            return time;
        }

        return parsedTime.toLocaleTimeString('en-IN', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    // Create payment and verify payment
    const handleEnrollNow = async (meeting: any) => {
        const meetingId = Number(meeting.id);

        if (paymentLoadingId !== null) {
            return;
        }

        try {
            setPaymentLoadingId(meetingId);

            // Step 1: Get logged-in member ID
            const storedMemberId = await AsyncStorage.getItem('userId');

            if (!storedMemberId) {
                Alert.alert('Login Required', 'Please log in before enrolling in a meeting.',);
                return;
            }

            const memberId = Number(storedMemberId);

            if (!Number.isFinite(memberId) || !Number.isFinite(meetingId)) {
                Alert.alert('Error', 'Invalid member ID or meeting ID.');
                return;
            }

            // Step 2: Create payment order
            const createResponse = await createMeetingPayment(meetingId);

            console.log('Create payment response:', createResponse);

            if (
                createResponse?.status !== 'success' ||
                !createResponse?.data?.razorpay_order_id ||
                !createResponse?.data?.razorpay_key_id ||
                createResponse?.data?.payment_id == null
            ) {
                Alert.alert('Payment Error', createResponse?.message || 'Unable to create payment order.');
                return;
            }

            const paymentData = createResponse.data;

            // Step 3: Open Razorpay Checkout
            const razorpayOptions = {
                description: `Enrollment for ${meeting.title || 'Regular Meeting'}`,
                currency: paymentData.currency || 'INR',
                key: paymentData.razorpay_key_id,
                amount: Number(paymentData.amount),
                name: "Pune Women's Club",
                order_id: paymentData.razorpay_order_id,
                theme: {
                    color: '#4361ee',
                },
            };

            const razorpayResult: any =
                await RazorpayCheckout.open(razorpayOptions);

            console.log('Razorpay checkout result:', razorpayResult);

            // Step 4: Validate fields returned by Razorpay
            const razorpayPaymentId = razorpayResult?.razorpay_payment_id;
            const razorpayOrderId = razorpayResult?.razorpay_order_id;
            const razorpaySignature = razorpayResult?.razorpay_signature;

            if (
                !razorpayPaymentId ||
                !razorpayOrderId ||
                !razorpaySignature
            ) {
                Alert.alert(
                    'Verification Pending',
                    'Payment details are incomplete. Please contact support before attempting payment again.',
                );
                return;
            }

            // Step 5: Verify payment with your backend
            const verifyResponse = await verifyMeetingPayment({
                payment_id: Number(paymentData.payment_id),
                razorpay_payment_id: razorpayPaymentId,
                razorpay_order_id: razorpayOrderId,
                razorpay_signature: razorpaySignature,
            });

            console.log('Verify payment response:', verifyResponse);

            // Step 6: Show success only when backend confirms verification
            if (verifyResponse?.status === 'success') {
                Alert.alert(
                    'Payment Successful',
                    verifyResponse?.message ||
                    `You have successfully enrolled in ${meeting.title || 'the meeting'}.`,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                navigation.navigate('RegularMeetings');
                            },
                        },
                    ],
                );
            } else {
                Alert.alert(
                    'Verification Failed',
                    verifyResponse?.message ||
                    'We received your payment response, but the server did not confirm the payment. Please contact support.',
                );
            }
        } catch (error: any) {
            console.log('Payment flow error:', error);

            const errorMessage =
                error?.description ||
                error?.message ||
                error?.detail ||
                'Something went wrong while processing your payment.';

            const isCancelled =
                error?.code === 'PAYMENT_CANCELLED' ||
                String(errorMessage).toLowerCase().includes('cancel');

            if (isCancelled) {
                Alert.alert(
                    'Payment Cancelled',
                    'You cancelled the payment. You can try again whenever you are ready.',
                );
            } else {
                Alert.alert('Payment Error', 'Something went wrong while processing your payment.');
            }
        } finally {
            setPaymentLoadingId(null);
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                {/* Header */}
                <LinearGradient
                    colors={['#4361ee', '#3f37c9']}
                    style={styles.header}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Regular Meetings</Text>
                </LinearGradient>

                {/* Search */}
                <View style={styles.searchBox}>
                    <Icon name="search" size={18} color="#888" />

                    <TextInput
                        placeholder="Search Meetings"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>

                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#4361ee"
                        style={{ marginTop: 20 }}
                    />
                ) : filteredMeetings.length === 0 ? (
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>
                        No Meetings Found
                    </Text>
                ) : (
                    <FlatList
                        data={filteredMeetings}
                        keyExtractor={(item: any) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 15,
                            paddingBottom: 30,
                        }}
                        renderItem={({ item }: any) => (
                            <View style={styles.card}>
                                {/* Title and Fees */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'flex-start',
                                        width: '100%',
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.title,
                                            {
                                                flex: 1,
                                                marginRight: 10,
                                            },
                                        ]}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.fees,
                                            {
                                                flexShrink: 0,
                                                textAlign: 'right',
                                            },
                                        ]}
                                    >
                                        ₹ {item.fees}
                                    </Text>
                                </View>

                                {/* Date */}
                                <View style={styles.infoRow}>
                                    <Icon
                                        name="calendar-outline"
                                        size={17}
                                        color="#666"
                                    />

                                    <Text style={styles.infoText}>
                                        {formatDate(item.date)}
                                    </Text>
                                </View>

                                {/* Time */}
                                <View style={styles.infoRow}>
                                    <Icon name="time-outline" size={17} color="#666" />

                                    <Text style={styles.infoText}>
                                        {formatTime(item.start_time)} -{' '}
                                        {formatTime(item.end_time)}
                                    </Text>
                                </View>

                                {/* Venue */}
                                <View style={styles.infoRow}>
                                    <Icon
                                        name="location-outline"
                                        size={17}
                                        color="#666"
                                    />

                                    <Text style={styles.infoText}>{item.venue}</Text>
                                </View>

                                {/* Buttons */}
                                <View style={styles.buttonRow}>
                                    {/* Add Visitor */}
                                    <TouchableOpacity
                                        style={styles.addVisitorButton}
                                        onPress={() =>
                                            navigation.navigate('AddVisitor', {
                                                meetingId: item.id,
                                            })
                                        }
                                        disabled={paymentLoadingId !== null}
                                    >
                                        <Icon
                                            name="person-add-outline"
                                            size={16}
                                            color="#fff"
                                        />

                                        <Text style={styles.buttonText}>Add Visitor</Text>
                                    </TouchableOpacity>

                                    {/* Enroll Now */}
                                    <TouchableOpacity
                                        style={[
                                            styles.enrollButton,
                                            paymentLoadingId === Number(item.id) && {
                                                opacity: 0.6,
                                            },
                                        ]}
                                        onPress={() => handleEnrollNow(item)}
                                        disabled={paymentLoadingId !== null}
                                    >
                                        {paymentLoadingId === Number(item.id) ? (
                                            <ActivityIndicator
                                                size="small"
                                                color="#fff"
                                            />
                                        ) : (
                                            <Icon
                                                name="checkmark-circle-outline"
                                                size={16}
                                                color="#fff"
                                            />
                                        )}

                                        <Text style={styles.buttonText}>
                                            {paymentLoadingId === Number(item.id)
                                                ? 'Processing...'
                                                : 'Enroll Now'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </SafeAreaWrapper>
    );
};

export default RegularMeetingsScreen;