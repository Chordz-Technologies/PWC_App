import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../styles/OneToOneScreenStyle';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllMembers, addMeeting } from '../services/authApi';
import { canAddMeeting, increaseMeetingCount } from '../utils/visitorAccess';
import SafeAreaWrapper from './SafeAreaWrapper';

const OneToOneScreen = ({ navigation }: any) => {
    const [showDate, setShowDate] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [displayTime, setDisplayTime] = useState('');
    const [members, setMembers] = useState<any[]>([]);
    const [userName, setUserName] = useState('');
    const [form, setForm] = useState({
        person1: '',
        person2: '',
        title: '',
        date: '',
        time: '',
        venue: '',
        description: '',
    });

    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    useEffect(() => {

        checkMeetingAccess();

    }, []);

    const checkMeetingAccess =
        async () => {

            const allowed =
                await canAddMeeting();

            if (!allowed) {

                navigation.replace(
                    'MembershipRequired'
                );
            }
        };

    useEffect(() => {

        const showSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpen(true);
            }
        );

        const hideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpen(false);
            }
        );

        loadUser();
        fetchMembers();

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };

    }, []);

    const loadUser = async () => {
        const name = await AsyncStorage.getItem('userName');

        if (name) {
            setUserName(name);

            setForm(prev => ({
                ...prev,
                person1: name, // ✅ auto set
            }));
        }
    };

    const fetchMembers = async () => {
        try {
            const res = await getAllMembers();

            const formatted = res.all_members.map((item: any) => ({
                label: item.name,
                value: item.name, // for meeting API we only need name
            }));

            setMembers(formatted);

        } catch (error) {
            console.log('Members API error', error);
        }
    };

    // ⏰ Handle Time Selection
    const onTimeChange = (event: any, selected?: Date) => {
        setShowTimePicker(false);

        if (selected) {
            setSelectedTime(selected);

            let hours = selected.getHours();
            let minutes: any = selected.getMinutes();

            // API format
            let apiHours = hours < 10 ? `0${hours}` : hours;
            let apiMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const apiTime = `${apiHours}:${apiMinutes}:00`;

            // Display format
            let displayHours = hours % 12 || 12;
            let ampm = hours >= 12 ? 'PM' : 'AM';
            let displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const uiTime = `${displayHours}:${displayMinutes} ${ampm}`;

            setDisplayTime(uiTime);
            handleChange('time', apiTime); // send to API
        }
    };

    const handleSubmit = async () => {
        try {
            if (!form.person1 || !form.person2 || !form.title || !form.date || !form.time || !form.venue) {
                Alert.alert('Error', 'Please fill all required fields');
                return;
            }

            const res = await addMeeting(form);
            Alert.alert('Success', 'Meeting Scheduled');
            await increaseMeetingCount();
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } catch (err) {
            Alert.alert('Error', 'Failed to schedule meeting');
        }
    };

    return (
        <SafeAreaWrapper>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1, backgroundColor: '#f5f6fa' }}>

                        {/* HEADER */}
                        <LinearGradient
                            colors={['#4361ee', '#3f37c9']}
                            style={styles.header}
                        >
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon
                                    name="arrow-back"
                                    size={24}
                                    color="#fff"
                                />
                            </TouchableOpacity>

                            <Text style={styles.headerTitle}>
                                Schedule 1:1 Meeting
                            </Text>
                        </LinearGradient>

                        {/* FORM */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                padding: 15,
                                flexGrow: 1,
                                paddingBottom: keyboardOpen ? 120 : 20,
                            }}
                        >

                            {/* PERSON 1 */}
                            <Text style={styles.label}>
                                Meeting From*
                            </Text>

                            <TextInput
                                editable={false}
                                style={[
                                    styles.input,
                                    { backgroundColor: '#f0f0f0' }
                                ]}
                                value={userName}
                            />

                            {/* PERSON 2 */}
                            <Text style={styles.label}>
                                Meeting To*
                            </Text>

                            <Dropdown
                                style={styles.input}
                                data={members}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Member"
                                placeholderStyle={{ color: '#999' }}
                                value={form.person2}
                                onChange={(item) => {
                                    handleChange('person2', item.value);
                                }}
                            />

                            {/* TITLE */}
                            <Text style={styles.label}>
                                Meeting Title*
                            </Text>

                            <TextInput
                                placeholder="Enter Meeting Title"
                                placeholderTextColor="#999"
                                style={styles.input}
                                onChangeText={(v) =>
                                    handleChange('title', v)
                                }
                            />

                            {/* DATE */}
                            <Text style={styles.label}>
                                Select Date*
                            </Text>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDate(true)}
                            >
                                <Text
                                    style={{
                                        color: form.date
                                            ? '#000'
                                            : '#999'
                                    }}
                                >
                                    {form.date || 'Select Date'}
                                </Text>
                            </TouchableOpacity>

                            {showDate && (
                                <DateTimePicker
                                    mode="date"
                                    display="calendar"
                                    value={new Date()}
                                    minimumDate={new Date()}
                                    onChange={(event, date) => {

                                        setShowDate(false);

                                        if (date) {

                                            const formatted =
                                                date
                                                    .toISOString()
                                                    .split('T')[0];

                                            handleChange(
                                                'date',
                                                formatted
                                            );
                                        }
                                    }}
                                />
                            )}

                            {/* TIME */}
                            <Text style={styles.label}>
                                Select Time*
                            </Text>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() =>
                                    setShowTimePicker(true)
                                }
                            >
                                <Text
                                    style={{
                                        color: displayTime
                                            ? '#000'
                                            : '#999'
                                    }}
                                >
                                    {displayTime || 'Select Time'}
                                </Text>
                            </TouchableOpacity>

                            {showTimePicker && (
                                <DateTimePicker
                                    value={selectedTime}
                                    mode="time"
                                    display="default"
                                    onChange={onTimeChange}
                                />
                            )}

                            {/* VENUE */}
                            <Text style={styles.label}>
                                Venue*
                            </Text>

                            <TextInput
                                placeholder="Enter Venue"
                                placeholderTextColor="#999"
                                style={styles.input}
                                onChangeText={(v) =>
                                    handleChange('venue', v)
                                }
                            />

                            {/* DESCRIPTION */}
                            <Text style={styles.label}>
                                Description
                            </Text>

                            <TextInput
                                placeholder="Enter Description"
                                placeholderTextColor="#999"
                                style={[
                                    styles.input,
                                    {
                                        height: 100,
                                        textAlignVertical: 'top',
                                    }
                                ]}
                                multiline
                                onChangeText={(v) =>
                                    handleChange(
                                        'description',
                                        v
                                    )
                                }
                            />

                            {/* BUTTON */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.btnText}>
                                    Schedule Meeting
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaWrapper>
    );
};

export default OneToOneScreen;
