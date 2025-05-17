import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Linking,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Image,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { PieChart } from 'react-native-gifted-charts';
import { useQuiz } from './../Store/QuizContext';


interface CompletedQuiz {
    quizName: string;
    score?: number;
    date?: string;
   
}

const ProfileScreen = () => {
    const mockUser = {
        uid: '123456',
        email: 'user@example.com',
    };
    
    const router = useRouter();
    const { completedQuizzes } = useQuiz() as { completedQuizzes: CompletedQuiz[] };

    const [userData, setUserData] = useState<any>(null);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [editingLinkedin, setEditingLinkedin] = useState(false);
    const [tip, setTip] = useState('');
    const fadeAnim = useState(new Animated.Value(0))[0];
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const tips = [
        '🚀 Keep learning every day!',
        '💡 Code is like humor: when you have to explain it, its bad.',
        '📚 Read documentation, it helps!',
        '🛠️ Build projects, not just portfolios.',
        '🎯 Focus on one skill at a time.',
    ];

    useEffect(() => {
        fetchUserData();
        setTip(tips[Math.floor(Math.random() * tips.length)]);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const fetchUserData = async () => {
        try {
        
            const mockUserData = {
                name: 'John Doe',
                phone: '+1 (555) 123-4567',
                linkedin: 'https://linkedin.com/in/johndoe',
                profileImageUrl: null,
            };
            
            setUserData(mockUserData);
            setNewName(mockUserData.name);
            setLinkedin(mockUserData.linkedin || '');
            setProfileImageUrl(mockUserData.profileImageUrl);
        } catch (err: any) {
            console.error('Error fetching user data:', err.message);
            Alert.alert('Error', 'Failed to fetch user data.');
        }
    };

    const updateUsername = async () => {
        try {
       
            setUserData({
                ...userData,
                name: newName
            });
            setEditingName(false);
        } catch (err: any) {
            console.error('Error updating name:', err.message);
            Alert.alert('Error', 'Failed to update name.');
        }
    };

    const updateLinkedin = async () => {
        try {
         
            setUserData({
                ...userData,
                linkedin: linkedin
            });
            setEditingLinkedin(false);
        } catch (err: any) {
            console.error('Error updating LinkedIn:', err.message);
            Alert.alert('Error', 'Failed to update LinkedIn link.');
        }
    };

    const handleLogout = async () => {
        if (logoutLoading) return;
        setLogoutLoading(true);
        try {
            
            router.push('/signup');
        } catch (error: any) {
            console.error('Logout Error:', error.message);
            Alert.alert('Logout Error', 'Failed to sign out.');
        } finally {
            setLogoutLoading(false);
        }
    };

    const pickImageFromDevice = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.status !== 'granted') {
            Alert.alert('Permission required', 'Permission to access gallery is required!');
            return;
        }

        try {
            setUploading(true);
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.7,
                allowsEditing: true,
                aspect: [1, 1],
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selectedUri = result.assets[0].uri;

             
                setProfileImageUrl(selectedUri);
                setUserData({
                    ...userData,
                    profileImageUrl: selectedUri
                });
                
                Alert.alert('Success', 'Profile picture updated!');
            }
        } catch (error) {
            console.error('Error updating profile picture:', error);
            Alert.alert('Error', 'Failed to update profile picture.');
        } finally {
            setUploading(false);
        }
    };

    // Filter quizzes by name
    const javaQuizzes = completedQuizzes.filter((quiz: CompletedQuiz) => quiz.quizName.toLowerCase().includes('java'));
    const systemDesignQuizzes = completedQuizzes.filter((quiz: CompletedQuiz) => quiz.quizName.toLowerCase().includes('system design'));
    const cPlusPlusQuizzes = completedQuizzes.filter((quiz: CompletedQuiz) => quiz.quizName.toLowerCase().includes('c++'));
    const pythonQuizzes = completedQuizzes.filter((quiz: CompletedQuiz) => quiz.quizName.toLowerCase().includes('python'));

    const totalQuizzes = completedQuizzes.length;

    // Prepare data for the pie chart with counts and percentages
    const chartData = [
        {
            value: javaQuizzes.length,
            label: `Java`,
            percentage: totalQuizzes > 0 ? parseFloat(((javaQuizzes.length / totalQuizzes) * 100).toFixed(1)) : 0,
            color: '#1974CE',
        },
        {
            value: systemDesignQuizzes.length,
            label: `System Design`,
            percentage: totalQuizzes > 0 ? parseFloat(((systemDesignQuizzes.length / totalQuizzes) * 100).toFixed(1)) : 0,
            color: '#795548',
        },
        {
            value: cPlusPlusQuizzes.length,
            label: `C++`,
            percentage: totalQuizzes > 0 ? parseFloat(((cPlusPlusQuizzes.length / totalQuizzes) * 100).toFixed(1)) : 0,
            color: '#FF6F00',
        },
        {
            value: pythonQuizzes.length,
            label: `Python`,
            percentage: totalQuizzes > 0 ? parseFloat(((pythonQuizzes.length / totalQuizzes) * 100).toFixed(1)) : 0,
            color: '#1B5E20',
        },
        // we can add more quizz here
    ].filter(data => data.value > 0); 

    if (!userData) return null;

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                {/* Wrap everything in a ScrollView */}
                <ScrollView 
                    style={{ flex: 1 }}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    showsVerticalScrollIndicator={true}
                >
                    <Animated.View style={{ opacity: fadeAnim, padding: 20 }}>
                        <View style={styles.card}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={pickImageFromDevice} style={styles.avatarPlaceholder}>
                                    {profileImageUrl ? (
                                        <Image source={{ uri: profileImageUrl }} style={styles.avatarImage} />
                                    ) : (
                                        <Icon name="account-circle" size={80} color="#A0AEC0" />
                                    )}
                                    {uploading && <Text style={styles.uploadingText}>Uploading...</Text>}
                                </TouchableOpacity>
                                <View style={styles.nameContainer}>
                                    {editingName ? (
                                        <View style={styles.editRow}>
                                            <TextInput
                                                value={newName}
                                                onChangeText={setNewName}
                                                style={styles.nameInput}
                                                placeholder="Enter name"
                                                placeholderTextColor="#718096"
                                            />
                                            <TouchableOpacity
                                                onPress={updateUsername}
                                                activeOpacity={0.7}
                                                style={styles.iconButton}
                                            >
                                                <Icon name="check" size={22} color="#38A169" />
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={styles.editRow}>
                                            <Text style={styles.name}>{userData.name}</Text>
                                            <TouchableOpacity
                                                onPress={() => setEditingName(true)}
                                                activeOpacity={0.7}
                                                style={styles.iconButton}
                                            >
                                                <Icon name="edit" size={20} color="#4A5568" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                            <View style={styles.infoContainer}>
                                <View style={styles.infoRow}>
                                    <Icon name="email" size={20} color="#4A5568" />
                                    <Text style={styles.info}>{mockUser.email}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Icon name="phone" size={20} color="#4A5568" />
                                    <Text style={styles.info}>{userData.phone}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.chartContainer}>
                            <Text style={styles.label}>📊 Quiz Completion Breakdown</Text>
                            {chartData.length > 0 ? (
                                <View style={styles.chartWrapper}>
                                    <PieChart
                                        data={chartData}
                                        donut
                                        showGradient
                                        sectionAutoFocus
                                        radius={55}
                                        innerRadius={40}
                                        innerCircleColor={'#E1F5FE'}
                                        centerLabelComponent={() => (
                                            <View style={styles.centerLabel}>
                                                <Text style={styles.centerLabelText}>{totalQuizzes}</Text>
                                                <Text style={styles.centerLabelSubtext}>Total</Text>
                                            </View>
                                        )}
                                        showValuesAsLabels={false}
                                        showTextBackground
                                        textBackgroundRadius={10}
                                        textBackgroundColor={'rgba(255, 255, 255, 0.8)'}
                                    />
                                    <View style={styles.legendContainer}>
                                        {chartData.map((item, index) => (
                                            <View key={index} style={styles.legendItem}>
                                                <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                                                <Text style={styles.legendText}>
                                                    {item.label}: {item.percentage}%
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ) : (
                                <Text style={styles.noQuizzesText}>No quizzes completed yet.</Text>
                            )}
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.label}>✨ Daily Inspiration</Text>
                            <View style={styles.tipContainer}>
                                <Text style={styles.tip}>{tip}</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <Text style={styles.label}>🔗 LinkedIn Profile</Text>
                            {editingLinkedin ? (
                                <View style={styles.editRow}>
                                    <TextInput
                                        value={linkedin}
                                        onChangeText={setLinkedin}
                                        style={styles.linkedinInput}
                                        placeholder="Enter LinkedIn URL"
                                        placeholderTextColor="#718096"
                                    />
                                    <TouchableOpacity
                                        onPress={updateLinkedin}
                                        activeOpacity={0.7}
                                        style={styles.iconButton}
                                    >
                                        <Icon name="check" size={22} color="#38A169" />
                                    </TouchableOpacity>
                                </View>
                            ) : linkedin ? (
                                <View style={styles.editRow}>
                                    <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
                                        <Text style={[styles.info, styles.link]}>{linkedin}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setEditingLinkedin(true)}
                                        activeOpacity={0.7}
                                        style={styles.iconButton}
                                    >
                                        <Icon name="edit" size={20} color="#4A5568" />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => setEditingLinkedin(true)}
                                    activeOpacity={0.7}
                                    style={styles.addLinkButton}
                                >
                                    <Text style={styles.addLinkText}>Add LinkedIn Profile</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={handleLogout}
                            activeOpacity={0.7}
                            disabled={logoutLoading}
                        >
                            <Text style={styles.logoutButtonText}>
                                {logoutLoading ? 'Logging out...' : 'Sign Out'}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F7FAFC',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    chartContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        alignItems: 'center', 
        justifyContent: 'center', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        backgroundColor: '#E2E8F0',
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    nameContainer: {
        marginLeft: 15,
        flex: 1,
    },
    editRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E0',
        fontSize: 18,
        flex: 1,
        color: '#1A202C',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2D3748',
        flex: 1,
    },
    iconButton: {
        marginLeft: 10,
    },
    infoContainer: {
        marginTop: 15,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    info: {
        marginLeft: 10,
        fontSize: 16,
        color: '#4A5568',
    },
    label: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 10,
        color: '#2D3748',
    },
    tipContainer: {
        backgroundColor: '#EDF2F7',
        padding: 10,
        borderRadius: 6,
    },
    tip: {
        fontSize: 14,
        color: '#2D3748',
    },
    linkedinInput: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#CBD5E0',
        fontSize: 16,
        color: '#1A202C',
    },
    link: {
        textDecorationLine: 'underline',
        color: '#3182CE',
    },
    addLinkButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#3182CE',
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    addLinkText: {
        color: '#3182CE',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#E53E3E',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    uploadingText: {
        position: 'absolute',
        bottom: 5,
        fontSize: 12,
        color: '#718096',
    },
    sliceLabel: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    noQuizzesText: {
        fontSize: 16,
        color: '#718096',
        textAlign: 'center',
        marginTop: 20,
    },
    chartWrapper: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLabelText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    centerLabelSubtext: {
        fontSize: 12,
        color: '#666',
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 15,
        gap: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 4,
    },
    legendText: {
        fontSize: 12,
        color: '#4A5568',
    },
});