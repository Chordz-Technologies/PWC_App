import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, Image, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { launchImageLibrary } from 'react-native-image-picker';
import { styles } from '../styles/BusinessProfileScreenStyle';
import { addBusinessProfile, getBusinessProfile, updateBusinessProfile, } from '../services/authApi';

const BusinessProfileScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [memberId, setMemberId] = useState<any>(null);
    const [profileId, setProfileId] = useState<any>(null);

    const [form, setForm] = useState({
        business_name: '',
        business_owner_name: '',
        category: '',
        productservices: '',
        clientele: '',
        brief_info: '',
        dream_yuva_connect: '',
        phone: '',
        email: '',
        address: '',
    });

    const [images, setImages] = useState<any>({
        profile_photo: null,
        business_logo: null,
        photo1: null,
        photo2: null,
        photo3: null,
        photo4: null,
        photo5: null,
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const id = await AsyncStorage.getItem('userId');
            setMemberId(id);
            const res = await getBusinessProfile(id);
            if (res?.profile) {
                const data = res.profile;
                setProfileId(data.id);
                setForm({
                    business_name: data.business_name || '',
                    business_owner_name: data.business_owner_name || '',
                    category: data.category || '',
                    productservices: data.productservices || '',
                    clientele: data.clientele || '',
                    brief_info: data.brief_info || '',
                    dream_yuva_connect: data.dream_yuva_connect || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    address: data.address || '',
                });

                setImages({
                    profile_photo: data.profile_photo || null,
                    business_logo: data.business_logo || null,
                    photo1: data.photo1 || null,
                    photo2: data.photo2 || null,
                    photo3: data.photo3 || null,
                    photo4: data.photo4 || null,
                    photo5: data.photo5 || null,
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: string) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const pickImage = async (key: string) => {
        const result: any = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0.8,
        });
        if (result.didCancel) return;
        if (result.assets && result.assets.length > 0) {
            const asset = result.assets[0];
            setImages({
                ...images,
                [key]: {
                    uri: asset.uri,
                    type: asset.type,
                    name: asset.fileName,
                },
            });
        }
    };

    const handleSubmit = async () => {
        try {
            if (!form.business_name || !form.business_owner_name || !form.category || !form.productservices || !form.clientele || !form.phone || !form.email || !form.address) {
                Alert.alert('Error', 'Please fill all required fields');
                return;
            }
            setLoading(true);
            const payload = new FormData();

            // 🔷 TEXT FIELDS
            payload.append('business_name', form.business_name);
            payload.append('business_owner_name', form.business_owner_name);
            payload.append('category', form.category);
            payload.append('productservices', form.productservices);
            payload.append('clientele', form.clientele);
            payload.append('brief_info', form.brief_info);
            payload.append('dream_yuva_connect', form.dream_yuva_connect);
            payload.append('phone', form.phone);
            payload.append('email', form.email);
            payload.append('address', form.address);

            // 🔷 MEMBER ID IMPORTANT
            payload.append('member', String(memberId));

            // 🔷 IMAGES
            Object.keys(images).forEach((key: any) => {
                const image = images[key];

                // only newly selected images
                if (
                    image &&
                    typeof image === 'object' &&
                    image.uri
                ) {
                    payload.append(key, {
                        uri: image.uri,
                        type: image.type || 'image/jpeg',
                        name: image.name || `${key}.jpg`,
                    } as any);
                }
            });

            // 🔷 UPDATE API
            if (profileId) {
                await updateBusinessProfile(
                    profileId,
                    payload
                );
                Alert.alert('Success', 'Business Profile Updated Successfully');
                navigation.goBack();

            } else {
                // 🔷 ADD API
                await addBusinessProfile(payload);
                Alert.alert('Success', 'Business Profile Added Successfully');
                navigation.goBack();
            }

            // 🔷 REFRESH PROFILE
            loadProfile();
        } catch (error: any) {
            Alert.alert('Error', error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaWrapper>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#4361ee" />
                </View>
            </SafeAreaWrapper>
        );
    }

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>
                        {profileId
                            ? 'Update Business Profile'
                            : 'Add Business Profile'}
                    </Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {/* BUSINESS NAME */}
                    <Text style={styles.label}>
                        Business Name*
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Business Name"
                        placeholderTextColor="#999"
                        value={form.business_name}
                        onChangeText={(v) =>
                            handleChange('business_name', v)
                        }
                    />

                    {/* OWNER NAME */}
                    <Text style={styles.label}>
                        Business Owner Name*
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Owner Name"
                        placeholderTextColor="#999"
                        value={form.business_owner_name}
                        onChangeText={(v) =>
                            handleChange('business_owner_name', v)
                        }
                    />

                    {/* CATEGORY */}
                    <Text style={styles.label}>
                        Business Category*
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Business Category"
                        placeholderTextColor="#999"
                        value={form.category}
                        onChangeText={(v) =>
                            handleChange('category', v)
                        }
                    />

                    {/* PRODUCTS */}
                    <Text style={styles.label}>
                        Products & Services*
                    </Text>
                    <TextInput
                        multiline
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Products & Services"
                        placeholderTextColor="#999"
                        value={form.productservices}
                        onChangeText={(v) =>
                            handleChange('productservices', v)
                        }
                    />

                    {/* CLIENTELE */}
                    <Text style={styles.label}>
                        Target Clientele*
                    </Text>
                    <TextInput
                        multiline
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Target Clientele"
                        placeholderTextColor="#999"
                        value={form.clientele}
                        onChangeText={(v) =>
                            handleChange('clientele', v)
                        }
                    />

                    {/* BRIEF INFO */}
                    <Text style={styles.label}>
                        Brief Info
                    </Text>
                    <TextInput
                        multiline
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Brief Info"
                        placeholderTextColor="#999"
                        value={form.brief_info}
                        onChangeText={(v) =>
                            handleChange('brief_info', v)
                        }
                    />

                    {/* DREAM YUVA */}
                    <Text style={styles.label}>
                        Dream PWC Connect
                    </Text>
                    <TextInput
                        multiline
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Dream PWC Connect"
                        placeholderTextColor="#999"
                        value={form.dream_yuva_connect}
                        onChangeText={(v) =>
                            handleChange('dream_yuva_connect', v)
                        }
                    />

                    {/* PHONE */}
                    <Text style={styles.label}>
                        Mobile Number*
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Mobile Number"
                        placeholderTextColor="#999"
                        keyboardType="phone-pad"
                        maxLength={10}
                        value={form.phone}
                        onChangeText={(v) =>
                            handleChange('phone', v)
                        }
                    />

                    {/* EMAIL */}
                    <Text style={styles.label}>
                        Email Address*
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email Address"
                        placeholderTextColor="#999"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(v) =>
                            handleChange('email', v)
                        }
                    />

                    {/* ADDRESS */}
                    <Text style={styles.label}>
                        Business Address*
                    </Text>
                    <TextInput
                        multiline
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Business Address"
                        placeholderTextColor="#999"
                        value={form.address}
                        onChangeText={(v) =>
                            handleChange('address', v)
                        }
                    />

                    {/* PROFILE PHOTO */}
                    <Text style={styles.label}>
                        Profile Photo
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('profile_photo')}
                    >
                        {images.profile_photo ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.profile_photo === 'string'
                                            ? images.profile_photo
                                            : images.profile_photo.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Profile Photo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* BUSINESS LOGO */}
                    <Text style={styles.label}>
                        Business Logo
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('business_logo')}
                    >
                        {images.business_logo ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.business_logo === 'string'
                                            ? images.business_logo
                                            : images.business_logo.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Logo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* PHOTO 1 */}
                    <Text style={styles.label}>
                        Photo 1
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('photo1')}
                    >
                        {images.photo1 ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.photo1 === 'string'
                                            ? images.photo1
                                            : images.photo1.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Photo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* PHOTO 2 */}
                    <Text style={styles.label}>
                        Photo 2
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('photo2')}
                    >
                        {images.photo2 ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.photo2 === 'string'
                                            ? images.photo2
                                            : images.photo2.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Photo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* PHOTO 3 */}
                    <Text style={styles.label}>
                        Photo 3
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('photo3')}
                    >
                        {images.photo3 ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.photo3 === 'string'
                                            ? images.photo3
                                            : images.photo3.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Photo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* PHOTO 4 */}
                    <Text style={styles.label}>
                        Photo 4
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('photo4')}
                    >
                        {images.photo4 ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.photo4 === 'string'

                                            ? images.photo4
                                            : images.photo4.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Photo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* PHOTO 5 */}
                    <Text style={styles.label}>
                        Photo 5
                    </Text>
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={() => pickImage('photo5')}
                    >
                        {images.photo5 ? (
                            <Image
                                source={{
                                    uri:
                                        typeof images.photo5 === 'string'
                                            ? images.photo5
                                            : images.photo5.uri
                                }}
                                style={styles.previewImage}
                            />
                        ) : (
                            <>
                                <Icon
                                    name="camera-outline"
                                    size={30}
                                    color="#4361ee"
                                />
                                <Text style={styles.uploadText}>
                                    Upload Photo
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>

                    {/* SUBMIT */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.btnText}>
                            {profileId
                                ? 'Update Business Profile'
                                : 'Add Business Profile'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default BusinessProfileScreen;