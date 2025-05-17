import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useQuiz } from '../Store/QuizContext';
import { Feather } from '@expo/vector-icons';
import { Card, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Define types for quiz data
interface QuizResult {
  score: number;
  total: number;
  quizName: string;
  completedAt: string;
}

// Define the type for QuizContext
interface QuizContextType {
  completedQuizzes: QuizResult[];
  resetQuizzes: () => void;
}



const Home = () => {
  const router = useRouter();
  // Explicitly type the context values
  const { completedQuizzes, resetQuizzes } = useQuiz() as QuizContextType;

  // Make sure we have array of QuizResults
  const lastTenQuizzes: QuizResult[] = completedQuizzes.slice(-10);

  const chartData = lastTenQuizzes.map((quiz: QuizResult, index: number) => ({
    value: quiz.total > 0 ? (quiz.score / quiz.total) * 100 : 0,
    label: `Q${completedQuizzes.length - lastTenQuizzes.length + index + 1}`,
  }));

  const interviewTips = [
    { title: 'Resume Tips', description: 'Craft a resume that stands out.', link: '/courses' },
    { title: 'HR Interview', description: 'Ace your HR interview rounds.', link: '/courses' },
    { title: 'Technical Prep', description: 'Master technical interview questions.', link: '/courses' },
    { title: 'Practice Quiz', description: 'Test your knowledge with mock quizzes.', link: '/quiz' },
  ];

  // Create navigation handlers for each route to avoid type issues
  const handleNavigation = (path: string) => {
    // Using any to bypass the type checking since we know these routes exist
    router.push(path as any);
  };

  const formatDateShort = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Feather name="home" size={34} color="#4e73df" style={styles.headerIcon} />
          <Text style={styles.welcome}>Welcome Back!</Text>
        </View>
        <Text style={styles.subtitle}>Sharpen your interview skills with curated courses and quizzes.</Text>

        <Text style={styles.sectionTitle}>Explore Courses</Text>
        <View style={styles.coursesContainer}>
          {interviewTips.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.courseItem}
              onPress={() => handleNavigation(item.link)}
              activeOpacity={0.85}
            >
              <Card style={styles.courseCard}>
                <Card.Content>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text style={styles.courseDescription}>{item.description}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quiz History</Text>
        {completedQuizzes.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.historyScrollView}>
            {lastTenQuizzes.map((result: QuizResult, index: number) => {
              const percentage = result.total > 0 ? ((result.score / result.total) * 100).toFixed(0) : '0';
              return (
                <Card key={index} style={styles.historyCard}>
                  <Card.Content>
                    <Text style={styles.historyTitle}>{result.quizName || 'Quiz'}</Text>
                    <Text style={styles.historyScore}>
                      Score: <Text style={{ fontWeight: 'bold' }}>{result.score} / {result.total} ({percentage}%)</Text>
                    </Text>
                    <Text style={styles.historyTime}>Completed on: {formatDateShort(result.completedAt)}</Text>
                  </Card.Content>
                </Card>
              );
            })}
          </ScrollView>
        ) : (
          <Text style={styles.noQuizzesText}>No quiz history available.</Text>
        )}

        <Text style={styles.sectionTitle}>Your Performance</Text>
        {lastTenQuizzes.length > 0 ? (
          <View style={styles.chartContainer}>
            <View style={{ width: '100%', alignItems: 'center' , paddingTop:30}}>
              <LineChart
                areaChart
                curved
                isAnimated
                data={chartData}
                maxValue={100}
                
                noOfSections={5}
                stepValue={20}
                width={width * 0.7}
                height={240}
                initialSpacing={20}
                spacing={60}
                startFillColor="rgba(78, 115, 223, 0.5)"
                endFillColor="rgba(78, 115, 223, 0.05)"
                startOpacity={1}
                endOpacity={0.2}
                thickness={2}
                color="#4e73df"
                dataPointsColor="#4e73df"
                dataPointsRadius={4}
                dataPointsWidth={4}
                hideRules={false}
                rulesColor="#d6dbf7"
                rulesThickness={1}
                yAxisTextStyle={styles.axisLabelText}
                xAxisLabelTexts={chartData.map((d: any) => d.label)}
                yAxisLabelTexts={['0', '20', '40', '60', '80', '100']}
                yAxisSide={'left' as any}
              />
            </View>
            <View style={styles.axisLabels}>
              <Text style={styles.yAxisCustom}>Score</Text>
              <Text style={styles.xAxisCustom}>Quiz Attempts</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noQuizzesText}>No quiz data available yet.</Text>
        )}

        {completedQuizzes.length > 0 && (
          <Button
            mode="outlined"
            onPress={resetQuizzes}
            style={styles.resetButton}
            contentStyle={{ paddingVertical:4 }}
            textColor="#e74c3c"
            uppercase={false}
            labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
            
          >
            Reset Quiz History
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e6f3ff',
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerIcon: {
    marginRight: 12,
  },
  welcome: {
    fontSize: 30,
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 16,
    color: '#576574',
    marginBottom: 28,
    lineHeight: 22,
    maxWidth: '90%',
    fontStyle : 'italic',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginTop: 28,
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  coursesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  courseItem: {
    width: '48%',
    marginBottom: 18,
  },
  courseCard: {
    borderRadius: 14,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#a1a1a1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  courseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#636e72',
    lineHeight: 19,
  },
  historyScrollView: {
    marginVertical: 18,
    paddingBottom: 10,
    margin:0,
    
  },
  historyCard: {
    width: width * 0.7,
    marginRight: 18,
    backgroundColor: '#fafafa',
    borderRadius: 14,
    elevation: 4,
    shadowColor: '#999999',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginLeft:10
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#27ae60',
    marginBottom: 7,
  },
  historyScore: {
    fontSize: 15,
    color: '#34495e',
  },
  historyTime: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 5,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#e60000',
    backgroundColor: '#fff',
    marginTop: 35,
    borderRadius: 18,
    alignSelf: 'center',
    width: '55%',
    elevation: 6,
    
  },
  noQuizzesText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  chartContainer: {
    marginTop: 22,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingHorizontal: 13,
    elevation: 10,
    shadowColor: '#4e73df',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    alignItems: 'center',
    overflow: 'visible',
  },
  axisLabels: {
    marginTop: 22,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 44,
  },
  xAxisCustom: {
    fontSize: 15,
    fontWeight: '700',
    color: '#34495e',
  },
  yAxisCustom: {
    position: 'absolute',
    left: -20,
    top: '-350%',
    transform: [{ rotate: '-90deg' }],
    fontSize: 15,
    fontWeight: '700',
    color: '#34495e',
  },
  axisLabelText: {
    fontSize: 12,
    color: '#6c757d',
    fontWeight: '600',
  },
});

export default Home;