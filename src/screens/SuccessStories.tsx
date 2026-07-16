import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/SuccessStoriesStyle';
import { getSuccessStories, addSuccessStory } from '../services/authApi';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SuccessStoriesScreen = ({ navigation }: any) => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [showDate, setShowDate] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadStories();
    }, []);

    const loadStories = async () => {
        try {
            const res = await getSuccessStories();
            if (res?.all_stories) {
                setStories(res.all_stories);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const res = await launchImageLibrary({
            mediaType: 'photo',
        });

        if (!res.didCancel && res.assets) {
            setSelectedImage(res.assets[0]);
        }
    };

    const handleSubmit = async () => {
        if (!selectedImage || !date || !description) {
            Alert.alert('Error', 'Please fill all required fields',);
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('image', {
                uri: selectedImage.uri,
                name: selectedImage.fileName || 'story.jpg',
                type: selectedImage.type || 'image/jpeg',
            } as any);
            formData.append('date', date);
            formData.append('description', description);

            await addSuccessStory(formData);

            Alert.alert('Success', 'Story Added Successfully',);
            setModalVisible(false);
            setSelectedImage(null);
            setDate('');
            setDescription('');
            loadStories();
        } catch (e) {
            Alert.alert('Error', 'Unable to add story',);
        } finally {
            setUploading(false);
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>
                <LinearGradient
                    colors={['#4361ee', '#3f37c9']}
                    style={styles.header}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-back"
                            color="#fff"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>
                        Success Stories
                    </Text>
                </LinearGradient>

                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#4361ee"
                        style={{ marginTop: 40 }}
                    />
                ) : (
                    <>
                        <FlatList
                            data={stories}
                            keyExtractor={(item: any) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                padding: 15,
                                paddingBottom: 100,
                            }}
                            renderItem={({ item }) => (
                                <View style={styles.storyCard}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={styles.storyImage}
                                    />
                                    <View style={{ padding: 15, }}>
                                        <Text style={styles.storyDate}>
                                            {item.date}
                                        </Text>
                                        <Text style={styles.storyDesc}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />

                        <Modal
                            visible={modalVisible}
                            animationType="slide"
                            transparent
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalCard}>
                                    <Text style={styles.modalTitle}>
                                        Add Success Story
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.imagePicker}
                                        onPress={pickImage}
                                    >
                                        {selectedImage ? (
                                            <Image
                                                source={{ uri: selectedImage.uri }}
                                                style={styles.preview}
                                            />
                                        ) : (
                                            <View
                                                style={[
                                                    styles.preview,
                                                    {
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#f3f4f6',
                                                    },
                                                ]}
                                            >
                                                <Icon
                                                    name="image-outline"
                                                    size={40}
                                                    color="#888"
                                                />

                                                <Text>Select Image</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.input}
                                        onPress={() =>
                                            setShowDate(true)
                                        }
                                    >
                                        <Text
                                            style={{
                                                color: date ? '#000' : '#888',
                                                fontSize: 15,
                                            }}
                                        >
                                            {date || 'Select Date'}
                                        </Text>
                                    </TouchableOpacity>

                                    {showDate && (
                                        <DateTimePicker
                                            value={new Date()}
                                            mode="date"
                                            display="calendar"
                                            onChange={(event, selectedDate) => {
                                                setShowDate(false);

                                                if (selectedDate) {
                                                    const formatted =
                                                        selectedDate.toISOString().split('T')[0];

                                                    setDate(formatted);
                                                }
                                            }}
                                        />
                                    )}

                                    <TextInput
                                        placeholder="Write Success Story..."
                                        placeholderTextColor="#888"
                                        multiline
                                        value={description}
                                        onChangeText={setDescription}
                                        style={styles.description}
                                    />
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 20,
                                        }}
                                    >
                                        <TouchableOpacity
                                            style={styles.cancelBtn}
                                            onPress={() => {
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text>Cancel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={styles.submitBtn}
                                            onPress={handleSubmit}
                                        >
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {uploading ? 'Uploading...' : 'Submit'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </>
                )}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setModalVisible(true)}
                >
                    <Icon
                        name="add"
                        size={32}
                        color="#fff"
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaWrapper>
    );
};

export default SuccessStoriesScreen;