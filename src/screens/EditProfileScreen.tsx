import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { getMemberDetails, updateMemberDetails, getAllChapters } from '../services/authApi';
import { styles } from '../styles/OneToOneScreenStyle';

const EditProfileScreen = ({ route, navigation }: any) => {

    const { userId } = route.params;

    const [loading, setLoading] = useState(true);
    // const [showDate, setShowDate] = useState<null | string>(null);
    const [chapters, setChapters] = useState<any[]>([]);
    const [showPicker, setShowPicker] = useState<null | 'dob' | 'joining' | 'expiry'>(null);
    const [dates, setDates] = useState({
        dob: new Date(),
        joining: new Date(),
        expiry: new Date(),
    });

    const [form, setForm] = useState<any>({
        name: '',
        email: '',
        phone: '',
        pan_no: '',
        gst_no: '',
        joining_date: '',
        expiry_date: '',
        subscription_status: '',
        office_address: '',
        org_name: '',
        facebook: '',
        linkedin: '',
        social_media: '',
        personal_website: '',
        business_category: '',
        role: '',
        dob: '',
        chapter: '',
    });

    const handleChange = (key: string, value: any) => {
        setForm({ ...form, [key]: value });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [profileRes, chapterRes] = await Promise.all([
                getMemberDetails(userId),
                getAllChapters()
            ]);

            const data = profileRes.member_details;

            setForm({
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                password: data.password || '',
                pan_no: data.pan_no || '',
                gst_no: data.gst_no || '',
                joining_date: data.joining_date || '',
                expiry_date: data.expiry_date || '',
                subscription_status: data.subscription_status || '',
                office_address: data.office_address || '',
                org_name: data.org_name || '',
                facebook: data.facebook || '',
                linkedin: data.linkedin || '',
                social_media: data.social_media || '',
                personal_website: data.personal_website || '',
                business_category: data.business_category || '',
                role: data.role || '',
                dob: data.dob || '',
                chapter: data.chapter || '',
            });

            // ✅ Set Date objects for picker
            setDates({
                dob: data.dob ? new Date(data.dob) : new Date(),
                joining: data.joining_date ? new Date(data.joining_date) : new Date(),
                expiry: data.expiry_date ? new Date(data.expiry_date) : new Date(),
            });

            // ✅ Format chapters for dropdown
            const formattedChapters = chapterRes.all_chapters.map((item: any) => ({
                label: item.chapterName,
                value: item.id,
            }));

            setChapters(formattedChapters);

        } catch (error) {
            console.log('Profile Error', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!form.name || !form.email || !form.phone || !form.role || !form.chapter) {
            Alert.alert('Error', 'Please fill all required fields');
            return;
        }

        try {
            setLoading(true);

            await updateMemberDetails(userId, form);

            Alert.alert('Success', 'Profile Updated');
            navigation.goBack();

        } catch (err) {
            Alert.alert('Error', 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#4361ee" style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Edit Profile</Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={{ padding: 15 }}>

                {/* NAME */}
                <Text style={styles.label}>Full Name*</Text>
                <TextInput
                    style={styles.input}
                    value={form.name}
                    placeholder="Full Name*"
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('name', v)}
                />

                {/* EMAIL */}
                <Text style={styles.label}>Email Address*</Text>
                <TextInput
                    style={styles.input}
                    value={form.email}
                    placeholder="Email Address*"
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('email', v)}
                />

                {/* PHONE */}
                <Text style={styles.label}>Mobile Number*</Text>
                <TextInput
                    style={styles.input}
                    value={form.phone}
                    placeholder="Mobile Number*"
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('phone', v)}
                />

                {/* DOB */}
                <Text style={styles.label}>Date of Birth</Text>

                <TouchableOpacity style={styles.input} onPress={() => setShowPicker('dob')}>
                    <Text style={{ color: form.dob ? '#000' : '#999' }}>
                        {form.dob || 'Date of Birth'}
                    </Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={
                            showPicker === 'dob'
                                ? dates.dob
                                : showPicker === 'joining'
                                    ? dates.joining
                                    : dates.expiry
                        }
                        mode="date"
                        display="calendar"
                        maximumDate={showPicker === 'dob' ? new Date() : undefined}
                        onChange={(event, selectedDate) => {
                            setShowPicker(null);

                            if (selectedDate) {
                                const formatted = selectedDate.toISOString().split('T')[0];

                                if (showPicker === 'dob') {
                                    setDates({ ...dates, dob: selectedDate });
                                    setForm({ ...form, dob: formatted });
                                }

                                if (showPicker === 'joining') {
                                    setDates({ ...dates, joining: selectedDate });
                                    setForm({ ...form, joining_date: formatted });
                                }

                                if (showPicker === 'expiry') {
                                    setDates({ ...dates, expiry: selectedDate });
                                    setForm({ ...form, expiry_date: formatted });
                                }
                            }
                        }}
                    />
                )}

                {/* BUSINESS */}
                <Text style={styles.label}>PAN Number</Text>
                <TextInput
                    style={styles.input}
                    value={form.pan_no}
                    placeholder='PAN Number'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('pan_no', v)}
                />

                <Text style={styles.label}>GST Number</Text>
                <TextInput
                    style={styles.input}
                    value={form.gst_no}
                    placeholder='GST Number'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('gst_no', v)}
                />

                <Text style={styles.label}>Organization Name</Text>
                <TextInput
                    style={styles.input}
                    value={form.org_name}
                    placeholder='Organization Name'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('org_name', v)}
                />

                <Text style={styles.label}>Business Category</Text>
                <TextInput
                    style={styles.input}
                    value={form.business_category}
                    placeholder='Business Category'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('business_category', v)}
                />

                <Text style={styles.label}>Joining Date</Text>

                <TouchableOpacity style={styles.input} onPress={() => setShowPicker('joining')}>
                    <Text style={{ color: form.joining_date ? '#000' : '#999' }}>
                        {form.joining_date || 'Joining Date'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Expiry Date</Text>

                <TouchableOpacity style={styles.input} onPress={() => setShowPicker('expiry')}>
                    <Text style={{ color: form.expiry_date ? '#000' : '#999' }}>
                        {form.expiry_date || 'Expiry Date'}
                    </Text>
                </TouchableOpacity>

                <Text style={styles.label}>Subscription Status</Text>
                <TextInput
                    style={styles.input}
                    value={form.subscription_status}
                    placeholder='Subscription Status'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('subscription_status', v)}
                />

                {/* ADDRESS */}
                <Text style={styles.label}>Office Address</Text>
                <TextInput
                    style={styles.input}
                    value={form.office_address}
                    placeholder='Office Address'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('office_address', v)}
                />

                <Text style={styles.label}>Facebook Profile</Text>
                <TextInput
                    style={styles.input}
                    value={form.facebook_profile}
                    placeholder='Facebook Profile'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('facebook_profile', v)}
                />

                <Text style={styles.label}>LinkedIn Profile</Text>
                <TextInput
                    style={styles.input}
                    value={form.linkedin_profile}
                    placeholder='LinkedIn Profile'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('linkedin_profile', v)}
                />

                <Text style={styles.label}>Other Social Media</Text>
                <TextInput
                    style={styles.input}
                    value={form.other_social_media}
                    placeholder='Other Social Media'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('social_media', v)}
                />

                <Text style={styles.label}>Website URL</Text>
                <TextInput
                    style={styles.input}
                    value={form.personal_website}
                    placeholder='Website URL'
                    placeholderTextColor="#8d99ae"
                    onChangeText={(v) => handleChange('personal_website', v)}
                />

                {/* ROLE */}
                <Text style={styles.label}>Role*</Text>
                <Dropdown
                    style={styles.input}
                    data={[
                        { label: 'MEMBER', value: 'MEMBER' },
                        { label: 'VISITOR', value: 'VISITOR' }
                    ]}
                    labelField="label"
                    valueField="value"
                    value={form.role}
                    onChange={(item) => handleChange('role', item.value)}
                />

                {/* CHAPTER */}
                <Text style={styles.label}>Chapter*</Text>
                <Dropdown
                    style={styles.input}
                    data={chapters}
                    labelField="label"
                    valueField="value"
                    value={form.chapter}
                    onChange={(item) => handleChange('chapter', item.value)}
                />

                {/* UPDATE BUTTON */}
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.btnText}>Update Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default EditProfileScreen;