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
import { Card } from 'react-native-paper';
import ResumeWritingContent from '../components/ResumeWritingContent';
import HRInterviewQuestionsContent from '../components/HRInterviewQuestionsContent';
import TechnicalRoundsContent from '../components/TechnicalRoundsContent';

interface Course {
  title: string;
  image: any;
  description: string;
  content: React.ReactNode;
}

const courseData: Course[] = [
  {
    title: 'Resume Writing',
    image: require('../../assets/resume.png'),
    description: 'Craft a compelling resume that highlights your skills and experience.',
    content: <ResumeWritingContent />,
  },
  {
    title: 'HR Interview Questions',
    image: require('../../assets/hr_interview.png'),
    description: 'Prepare for common HR interview questions and impress recruiters.',
    content: <HRInterviewQuestionsContent />,
  },
  {
    title: 'Technical Rounds',
    image: require('../../assets/TechnicalRounds.png'),
    description: 'Master technical concepts and problem-solving for coding interviews.',
    content: <TechnicalRoundsContent />,
  },
];

const CoursesTab = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (selectedCourse) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.detailBackground}>
          <ScrollView>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedCourse(null)}
            >
              <Text style={styles.backButtonText}>← Back to Courses</Text>
            </TouchableOpacity>
            {selectedCourse.content}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.listBackground} contentContainerStyle={styles.container}>
        <Text style={styles.heading}>🎓 Explore Courses</Text>
        <Text style={styles.subheading}>
          " Enhance your interview skills with our focused courses. "
        </Text>
        <View style={styles.cardList}>
          {courseData.map((course) => (
            <Card
              key={course.title}
              style={styles.card}
              onPress={() => setSelectedCourse(course)}
            >
              <Card.Content style={styles.cardContent}>
                <Image source={course.image} style={styles.image} resizeMode="contain" />
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{course.title}</Text>
                  <Text style={styles.cardDescription}>{course.description}</Text>
                </View>
              </Card.Content>
              <Card.Actions>
                <TouchableOpacity style={styles.viewButton} onPress={() => setSelectedCourse(course)}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </Card.Actions>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  listBackground: {
    flex: 1,
    backgroundColor: '#f0f4ff', 
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 24,
  },
  subheading: {
    fontSize: 16,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 32,
  },
  cardList: {
    width: '95%',
  },
  card: {
    marginVertical: 10,
    elevation: 3,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  viewButton: {
    backgroundColor: '#1a75ff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  backButton: {
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailBackground: {
    flex: 1,
    backgroundColor: '#fff', 
  },
});

export default CoursesTab;