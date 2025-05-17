import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; // For icons

// ✅ Define valid Feather icon names
type FeatherIconNames = 'type' |'book-open' |'award'|'coffee'|'edit'|'dollar-sign' |'briefcase' | 'help-circle' | 'activity' | 'user' | 'map' | 'search' | 'key' | 'repeat' | 'anchor' | 'message-circle' | 'thumbs-up' | 'thumbs-down' | 'target' | 'clock' | 'users' | 'flag' | 'zap' | 'heart'
;

// ✅ Function Props Types
interface CardSectionProps {
  title: string;
  iconName: FeatherIconNames;
  color: string;
  content: JSX.Element;
}

interface BulletPointProps {
  iconName: FeatherIconNames;
  text: string;
}

// ✅ Render a Card Section
const renderCardSection = ({ title, iconName, color, content }: CardSectionProps) => (
  <Card style={styles.card}>
    <Card.Title
      title={<Text style={styles.cardTitle}>{title}</Text>}
      left={() => (
        <View style={styles.iconWrapper}>
          <Feather name={iconName} size={24} color={color} />
        </View>
      )}
    />
    <Card.Content>{content}</Card.Content>
  </Card>
);

// ✅ Render a Bullet Point with an Icon
const renderBulletPoint = ({ iconName, text }: BulletPointProps) => (
  <View style={styles.bulletPoint}>
    <View style={styles.iconWrapper}>
      <Feather name={iconName} size={18} color="#757575" />
    </View>
    <Text style={styles.detailBullet}>{text}</Text>
  </View>
);

const HRInterviewQuestionsContent = () => {
  const handleEnrollPress = () => {
    Alert.alert('Enroll', 'Thank you for your interest! Enrollment feature coming soon.');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.detailContainer}>
        <View style={styles.header}>
          <Feather name="users" size={30} color="#4a6572" style={styles.headerIcon} />
          <Text style={styles.detailHeading}>HR Interview Questions</Text>
        </View>
        <Text style={styles.detailSubheading}>Ace your HR interview and make a great impression.</Text>
        <Text style={styles.detailText}>
          HR interviews focus on your personality, fit for the company, and soft skills.
        </Text>

        {renderCardSection({
          title: 'Common Questions',
          iconName: 'help-circle',
          color: '#388e3c',
          content: (
            <View>
              {renderBulletPoint({ iconName: 'message-circle', text: 'Tell me about yourself.' })}
              {renderBulletPoint({ iconName: 'briefcase', text: 'Why are you interested in this company?' })}
              {renderBulletPoint({ iconName: 'thumbs-up', text: 'What are your strengths?' })}
              {renderBulletPoint({ iconName: 'thumbs-down', text: 'What are your weaknesses?' })}
              {renderBulletPoint({ iconName: 'target', text: 'Where do you see yourself in 5 years?' })}
            </View>
          ),
        })}

        {renderCardSection({
          title: 'Behavioral Questions',
          iconName: 'activity',
          color: '#0288d1',
          content: (
            <View>
              {renderBulletPoint({ iconName: 'clock', text: 'Tell me about a time you failed.' })}
              {renderBulletPoint({ iconName: 'users', text: 'Describe a time you worked in a team.' })}
              {renderBulletPoint({ iconName: 'flag', text: 'Tell me about a time you faced a challenge.' })}
              {renderBulletPoint({ iconName: 'zap', text: 'Describe a time you showed initiative.' })}
              {renderBulletPoint({ iconName: 'heart', text: 'How do you handle stress and pressure?' })}
            </View>
          ),
        })}

        {renderCardSection({
          title: 'Questions About You',
          iconName: 'user',
          color: '#f9a825',
          content: (
            <View>
              {renderBulletPoint({ iconName: 'book-open', text: 'What are your hobbies and interests?' })}
              {renderBulletPoint({ iconName: 'award', text: 'What are your biggest achievements?' })}
              {renderBulletPoint({ iconName: 'coffee', text: 'How do you prefer to work?' })}
              {renderBulletPoint({ iconName: 'edit', text: 'What is your communication style?' })}
              {renderBulletPoint({ iconName: 'dollar-sign', text: 'What are your salary expectations?' })}
            </View>
          ),
        })}

        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress} activeOpacity={0.7}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  detailContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 10,
  },
  detailHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343a40',
  },
  detailSubheading: {
    fontSize: 18,
    color: '#6c757d',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  detailText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    elevation: 4,
    borderColor: '#e0e0e0',
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  enrollButton: {
    marginTop: 30,
    backgroundColor: '#0288d1',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#0288d1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailBullet: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    flex: 1,
  },
});

export default HRInterviewQuestionsContent;
