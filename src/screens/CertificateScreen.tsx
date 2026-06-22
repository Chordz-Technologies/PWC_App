import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/CertificateScreenStyle';

const CertificateScreen = ({ navigation }: any) => {
    const [userName, setUserName] = useState('');
    const viewShotRef = useRef<any>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const name = await AsyncStorage.getItem('userName');

        if (name) {
            setUserName(name);
        }
    };

    const shareCertificate = async () => {
        try {
            const uri = await viewShotRef.current.capture();

            await Share.open({
                url: `file://${uri}`,
                type: 'image/png',
            });
        } catch (error) {
            console.log(error);
        }
    };

    const downloadCertificate = async () => {
        try {
            const uri = await viewShotRef.current.capture();

            const fileName = `Certificate_${Date.now()}.png`;

            const destPath =
                `${RNFS.CachesDirectoryPath}/${fileName}`;

            await RNFS.copyFile(uri, destPath);

            await CameraRoll.save(
                `file://${destPath}`,
                {
                    type: 'photo',
                    album: 'PWC Certificates',
                }
            );

            Alert.alert(
                'Success',
                'Certificate saved to Gallery'
            );

        } catch (error) {
            console.log(error);

            Alert.alert(
                'Error',
                'Unable to save certificate'
            );
        }
    };

    return (
        <SafeAreaWrapper>
            <View style={styles.container}>

                {/* 🔷 HEADER */}
                <LinearGradient colors={['#4361ee', '#3f37c9']} style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Certificate</Text>
                </LinearGradient>

                <ViewShot
                    ref={viewShotRef}
                    options={{
                        format: 'png',
                        quality: 1,
                    }}
                >
                    <LinearGradient
                        colors={['#fff8dc', '#ffffff']}
                        style={styles.certificate}
                    >
                        <Text style={styles.heading}>
                            CERTIFICATE OF MEMBERSHIP
                        </Text>

                        <Text style={styles.subHeading}>
                            This Certificate is Proudly Presented To
                        </Text>

                        <Text style={styles.memberName}>
                            {userName}
                        </Text>

                        <Text style={styles.description}>
                            In recognition of your valuable membership and
                            contribution to the Professional Women's Circle.
                        </Text>

                        <Text style={styles.footer}>
                            Professional Women's Circle
                        </Text>
                    </LinearGradient>
                </ViewShot>

                <View style={styles.buttonContainer}>

                    {/* DOWNLOAD */}
                    <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={downloadCertificate}
                    >
                        <Text style={styles.downloadText}>
                            Download
                        </Text>
                    </TouchableOpacity>

                    {/* SHARE */}
                    <TouchableOpacity
                        style={styles.shareButton}
                        onPress={shareCertificate}
                    >
                        <Text style={styles.downloadText}>
                            Share
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaWrapper>
    );
};

export default CertificateScreen;