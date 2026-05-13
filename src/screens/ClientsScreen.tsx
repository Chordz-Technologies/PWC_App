import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Alert, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import SafeAreaWrapper from './SafeAreaWrapper';
import { styles } from '../styles/ClientsScreenStyle';
import { addClients, getClients, updateClient, deleteClient, } from '../services/authApi';

const ClientsScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const [memberId, setMemberId] = useState<any>(null);
    const [clients, setClients] = useState<any[]>([]);
    const [editId, setEditId] = useState<any>(null);
    const [form, setForm] = useState({
        client_1: '',
        client_2: '',
        client_3: '',
        client_4: '',
        client_5: '',
    });

    useEffect(() => {
        loadMember();
    }, []);

    const loadMember = async () => {
        const id = await AsyncStorage.getItem('userId');
        setMemberId(id);
        fetchClients(id);
    };

    const fetchClients = async (id: any) => {
        try {
            setLoading(true);
            const res = await getClients(id);
            if (res?.client_details) {
                setClients(res.client_details);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            if (
                !form.client_1 &&
                !form.client_2 &&
                !form.client_3 &&
                !form.client_4 &&
                !form.client_5
            ) {
                Alert.alert('Error', 'Please enter at least one client');
                return;
            }
            setLoading(true);
            const payload = {
                ...form,
                member: memberId,
            };

            // 🔷 UPDATE
            if (editId) {
                await updateClient(editId, payload);
                Alert.alert('Success', 'Clients Updated Successfully');
            } else {
                // 🔷 ADD
                await addClients(payload);
                Alert.alert('Success', 'Clients Added Successfully');
            }

            // 🔷 RESET
            setForm({
                client_1: '',
                client_2: '',
                client_3: '',
                client_4: '',
                client_5: '',
            });
            setEditId(null);
            fetchClients(memberId);
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Failed to save clients');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: any) => {
        setEditId(item.id);
        setForm({
            client_1: item.client_1 || '',
            client_2: item.client_2 || '',
            client_3: item.client_3 || '',
            client_4: item.client_4 || '',
            client_5: item.client_5 || '',
        });
    };

    const handleDelete = async (id: number) => {
        Alert.alert(
            'Delete Client',
            'Are you sure you want to delete this client?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteClient(id);
                            Alert.alert('Success', 'Deleted Successfully');
                            fetchClients(memberId);
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Delete Failed');
                        }
                    },
                },
            ]
        );
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
                    <Text style={styles.headerTitle}>Clients</Text>
                </LinearGradient>

                <ScrollView
                    contentContainerStyle={{
                        padding: 15,
                        paddingBottom: 40,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 🔷 FORM CARD */}
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>
                            Add Clients
                        </Text>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <View
                                key={num}
                                style={styles.inputContainer}
                            >
                                <Icon
                                    name="person-outline"
                                    size={20}
                                    color="#8d99ae"
                                />
                                <TextInput
                                    placeholder={`Client ${num}`}
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                    value={
                                        form[
                                        `client_${num}` as keyof typeof form
                                        ]
                                    }
                                    onChangeText={(text) =>
                                        setForm({
                                            ...form,
                                            [`client_${num}`]: text,
                                        })
                                    }
                                />
                            </View>
                        ))}

                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitText}>
                                    {editId ? 'Update' : 'Submit'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* 🔷 LIST */}
                    <Text style={styles.listTitle}>
                        Client List
                    </Text>
                    {clients.length === 0 ? (
                        <Text style={styles.emptyText}>
                            No Clients Found
                        </Text>
                    ) : (
                        clients.flatMap((item: any) => {
                            const clientArray = [
                                item.client_1,
                                item.client_2,
                                item.client_3,
                                item.client_4,
                                item.client_5,
                            ].filter(Boolean);
                            return clientArray.map((clientName: string, index: number) => (
                                <View
                                    key={`${item.id}-${index}`}
                                    style={styles.clientCard}
                                >
                                    {/* CLIENT NAME */}
                                    <View style={styles.rowBetween}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={styles.clientAvatar}>
                                                <Text style={styles.clientAvatarText}>
                                                    {clientName.charAt(0).toUpperCase()}
                                                </Text>
                                            </View>
                                            <Text style={styles.singleClientName}>
                                                {clientName}
                                            </Text>
                                        </View>

                                        {/* ACTION BUTTONS */}
                                        <View style={{ flexDirection: 'row' }}>

                                            {/* EDIT */}
                                            <TouchableOpacity
                                                style={styles.iconBtn}
                                                onPress={() => handleEdit(item)}
                                            >
                                                <Icon
                                                    name="create-outline"
                                                    size={20}
                                                    color="#4361ee"
                                                />
                                            </TouchableOpacity>

                                            {/* DELETE */}
                                            <TouchableOpacity
                                                style={styles.iconBtn}
                                                onPress={() => handleDelete(item.id)}
                                            >
                                                <Icon
                                                    name="trash-outline"
                                                    size={20}
                                                    color="red"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ));
                        })
                    )}
                </ScrollView>
            </View>
        </SafeAreaWrapper>
    );
};

export default ClientsScreen;