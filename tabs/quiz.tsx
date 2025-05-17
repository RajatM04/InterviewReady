import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import QuizComponent from '../components/QuizComponent';
import javaQuestions from '../components/questionData/java';
import pythonQuestions from '../components/questionData/python';
import cppQuestions from '../components/questionData/cpp';
import systemDesignQuestions from '../components/questionData/systemdesign';

const quizData = [
  {
    title: 'Java',
    image: require('../../assets/java.png'),
  },
  {
    title: 'Python',
    image: require('../../assets/python.png'),
  },
  {
    title: 'C++',
    image: require('../../assets/cpp.png'),
  },
  {
    title: 'System Design',
    image: require('../../assets/systemdesign.png'),
  },
];

const QuizTab = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  const getQuestions = () => {
    switch (selectedQuiz) {
      case 'Java':
        return javaQuestions;
      case 'Python':
        return pythonQuestions;
      case 'C++':
        return cppQuestions;
      case 'System Design':
        return systemDesignQuestions;
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {!selectedQuiz ? (
          <>
            <Text style={styles.heading}>📚 Choose a Quiz</Text>
            <Text style={styles.subheading}>
              " Select a quiz to get ready for a quick interview. "
            </Text>
            <View style={styles.cardGrid}>
              {quizData.map((quiz) => (
                <View key={quiz.title} style={styles.card}>
                  <Image source={quiz.image} style={styles.image} resizeMode="contain" />
                  <Text style={styles.cardTitle}>{quiz.title}</Text>
                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => setSelectedQuiz(quiz.title)}
                  >
                    <Text style={styles.startButtonText}>Start Quiz</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => setSelectedQuiz(null)} style={styles.backBtn}>
              <Text style={styles.backText}>←  Back to Quiz List</Text>
            </TouchableOpacity>
            <QuizComponent
              title={selectedQuiz}
              questions={getQuestions()}
              onBack={() => setSelectedQuiz(null)}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizTab;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    color: '#4b5563',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    shadowColor: '#3b82f6',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backBtn: {
    marginBottom: 16,
  },
  backText: {
    color: '#3b82f6',
    fontSize: 19,
    fontWeight: '400',
    paddingLeft: 8,
  },
});
