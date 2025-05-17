import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Replace with your actual image path
const checkImage = require('../assets/check.png');

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const quizName = Array.isArray(params.quizName) ? params.quizName[0] : params.quizName;
  const scoreStr = Array.isArray(params.score) ? params.score[0] : params.score;
  const totalStr = Array.isArray(params.total) ? params.total[0] : params.total;

  const score = parseInt(scoreStr ?? '0', 10);
  const total = parseInt(totalStr ?? '0', 10);

  const handleGoToQuizSection = () => {
    const pathToQuiz = '/quiz';
    console.log('Go to quiz: ', pathToQuiz);
    router.push(pathToQuiz);
  };

  const percentage = total > 0 ? (score / total) * 100 : 0;
  const isExcellent = percentage >= 80;
  const isGood = percentage >= 60 && percentage < 80;
  const isAverage = percentage >= 40 && percentage < 60;

  let message = 'Well done!';
  let messageColor = '#2ecc71';
  if (isExcellent) {
    message = 'Excellent!';
    messageColor = '#29abe2'; 
  } else if (isGood) {
    message = 'Good job!';
    messageColor = '#1e88e5'; 
  } else if (isAverage) {
    message = 'Not bad!';
    messageColor = '#64b5f6'; 
  } else {
    message = 'Keep trying!';
    messageColor = '#d32f2f'; 
  }

  return (
    <LinearGradient colors={['#bbdefb', '#e3f2fd']} style={styles.container}>
      <View style={styles.card}>
        <Image source={checkImage} style={styles.check} />
        <Text style={styles.title}>Quiz Completed!</Text>
        {quizName && <Text style={styles.quizName}>Quiz: {quizName}</Text>}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>Your Score:</Text>
          <Text style={[styles.scoreValue, { color: messageColor }]}>{score}</Text>
          <Text style={styles.totalLabel}>/{total}</Text>
        </View>
        <Text style={[styles.message, { color: messageColor }]}>{message}</Text>

        <TouchableOpacity style={styles.goBackBtn} onPress={handleGoToQuizSection}>
          <Text style={styles.goBackText}>Go back to Quizzz</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignItems: 'center',
  },
  check: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#1976d2', 
    marginBottom: 15,
    textAlign: 'center',
  },
  quizName: {
    fontSize: 22,
    color: '#424242',
    marginBottom: 20,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  scoreLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d47a1', 
    marginRight: 10,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  totalLabel: {
    fontSize: 24,
    color: '#757575',
    marginLeft: 10,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  goBackBtn: {
    backgroundColor: '#0d47a1', 
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  goBackText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});