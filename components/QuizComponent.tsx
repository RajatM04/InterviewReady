import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuiz } from '../Store/QuizContext'; 

// ✅ Define types for props & state
type Question = {
  question: string;
  options: string[];
  correctOption: string;
};

interface QuizProps {
  title: string;
  questions: Question[];
  onBack?: () => void;
}

export default function QuizComponent({ title, questions }: QuizProps) {
  const router = useRouter();
  const { addCompletedQuiz } = useQuiz();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(300);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && timeRemaining > 0 && !quizCompleted) {
      timer = setInterval(() => setTimeRemaining((prevTime) => prevTime - 1), 1000);
    } else if (timeRemaining === 0 && !quizCompleted) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [timerStarted, timeRemaining, quizCompleted]);

  const handleSelect = (qIndex: number, option: string) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [qIndex]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = (): number => {
    let correctAnswers = 0;
    questions.forEach((question: Question, index: number) => {
      const userAnswer = selectedAnswers[index];
      if (userAnswer && userAnswer === question.correctOption) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleSubmit = () => {
    if (!quizCompleted) {
      setTimerStarted(false);
      const finalScore = calculateScore();
      setQuizCompleted(true);
      addCompletedQuiz(title, finalScore, questions.length);
      router.push({
        pathname: '/result',
        params: { score: finalScore, total: questions.length, title: title },
      });
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>{title}</Text>

        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
          </View>
        </View>

        <View style={styles.questionBlock}>
          <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          {questions[currentQuestionIndex].options.map((opt: string, i: number) => {
            const selected = selectedAnswers[currentQuestionIndex] === opt;
            return (
              <TouchableOpacity
                key={i}
                style={[styles.option, selected && styles.selected]}
                onPress={() => {
                  if (!timerStarted) setTimerStarted(true);
                  handleSelect(currentQuestionIndex, opt);
                }}
                disabled={quizCompleted}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity style={styles.prevBtn} onPress={handlePrevious} disabled={quizCompleted}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}

          {currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity style={styles.nextBtn} onPress={handleNext} disabled={quizCompleted}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={quizCompleted}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 20,
  },
  scrollViewContent: {
    paddingBottom: 50,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
    textAlign: 'center',
  },
  timerContainer: {
    position: 'absolute',
    top: 55,
    right: 20,
    backgroundColor: '#ff240b',
    padding: 5,
    borderRadius: 8,
  },
  timerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#d3d3d3',
    borderRadius: 4,
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3cb371',
  },
  questionBlock: {
    marginBottom: 30,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  option: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginBottom: 18,
    borderWidth: 1.5,
    borderColor: '#ccc',
  },
  selected: {
    borderColor: '#1E3A8A',
    backgroundColor: '#E0E7FF',
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  prevBtn: {
    backgroundColor: '#64b5f6',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 15,
  },
  nextBtn: {
    backgroundColor: '#1e88e5',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 15,
  },
  submitBtn: {
    backgroundColor: '#0d47a1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
