import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Modal, TextInput, Alert, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/TrainingDevelopmentScreenStyle';
import { getTrainingVideos, addTrainingVideo } from '../services/authApi';

const TrainingDevelopmentScreen = ({ navigation }: any) => {
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [videoLink, setVideoLink] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        try {
            const res = await getTrainingVideos();
            if (res?.all_links) {
                setVideos(res.all_links);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getYoutubeId = (url: string) => {
        const regExp =
            /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
        const match = url.match(regExp);
        return match ? match[1] : '';
    };

    const handleAddVideo = async () => {
        if (!videoLink.trim()) {
            Alert.alert('Error', 'Please enter YouTube link');
            return;
        }

        try {
            setUploading(true);

            await addTrainingVideo(videoLink);

            Alert.alert(
                'Success',
                'Video Added Successfully',
            );

            setVideoLink('');
            setModalVisible(false);

            loadVideos(); // Refresh list
        } catch (error) {
            Alert.alert(
                'Error',
                'Unable to add video',
            );
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
                        Training & Development
                    </Text>
                </LinearGradient>

                {loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#4361ee"
                        style={{ marginTop: 40 }}
                    />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 15 }}
                    >
                        {videos.map((item) => (
                            <View key={item.id} style={styles.videoCard}>
                                <YoutubePlayer
                                    height={220}
                                    play={false}
                                    videoId={getYoutubeId(item.link)}
                                />
                            </View>
                        ))}

                        <Modal
                            visible={modalVisible}
                            transparent
                            animationType="slide"
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.5)',
                                }}
                            >
                                <View
                                    style={{
                                        width: '90%',
                                        backgroundColor: '#fff',
                                        borderRadius: 15,
                                        padding: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            marginBottom: 20,
                                            color: '#222',
                                        }}
                                    >
                                        Add Training Video
                                    </Text>

                                    <TextInput
                                        placeholder="Enter/Paste YouTube Link Here"
                                        placeholderTextColor="#999"
                                        value={videoLink}
                                        onChangeText={setVideoLink}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: '#ddd',
                                            borderRadius: 10,
                                            paddingHorizontal: 15,
                                            height: 50,
                                        }}
                                    />

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 25,
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(false);
                                                setVideoLink('');
                                            }}
                                            style={{
                                                padding: 12,
                                                backgroundColor: '#ddd',
                                                borderRadius: 10,
                                                width: '45%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text>Cancel</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            disabled={uploading}
                                            onPress={handleAddVideo}
                                            style={{
                                                padding: 12,
                                                backgroundColor: '#4361ee',
                                                borderRadius: 10,
                                                width: '45%',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {uploading ? 'Posting...' : 'Submit'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </ScrollView>
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

export default TrainingDevelopmentScreen;