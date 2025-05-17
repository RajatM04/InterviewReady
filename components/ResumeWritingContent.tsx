import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; 

const ResumeWritingContent = () => {
  const handleEnrollPress = () => {
    Alert.alert('Enroll', 'Thank you for your interest! Enrollment feature coming soon.');
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.detailContainer}>
        <View style={styles.header}>
          <Feather name="file-text" size={30} color="#4a6572" style={styles.headerIcon} />
          <Text style={styles.detailHeading}>Resume Writing Guide</Text>
        </View>
        <Text style={styles.detailSubheading}>Unlock your career potential with a powerful resume.</Text>
        <Text style={styles.detailText}>
          Your resume is more than just a list of jobs; it's your personal marketing document.
          Let's craft one that truly showcases your value.
        </Text>

        <Card style={styles.card}>
          <Card.Title
            title={<Text style={styles.cardTitle}>Key Sections</Text>}
            left={() => <View style={styles.iconWrapper}><Feather name="list" size={24} color="#388e3c" /></View>}
          />
          <Card.Content>
            {renderBulletPoint("user", "Contact Information: Make it easy to reach you.")}
            {renderBulletPoint("bookmark", "Summary/Objective: A compelling first impression.")}
            {renderBulletPoint("briefcase", "Experience: Highlight achievements with impact.")}
            {renderBulletPoint("book-open", "Education: Showcase your academic foundation.")}
            {renderBulletPoint("code", "Skills: Demonstrate your key abilities.")}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title={<Text style={styles.cardTitle}>Formatting for Success</Text>}
            left={() => <View style={styles.iconWrapper}><Feather name="layout" size={24} color="#0288d1" /></View>}
          />
          <Card.Content>
            {renderBulletPoint("grid", "Clean and organized layout.")}
            {renderBulletPoint("type", "Professional, readable font.")}
            {renderBulletPoint("type", "Consistent font sizes and styles.")}
            {renderBulletPoint("list", "Strategic use of bullet points.")}
            {renderBulletPoint("maximize", "Effective use of white space.")}
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title={<Text style={styles.cardTitle}>Steer Clear of These Pitfalls</Text>}
            left={() => <View style={styles.iconWrapper}><Feather name="x-octagon" size={24} color="#d32f2f" /></View>}
          />
          <Card.Content>
            {renderBulletPoint("alert-triangle", "Typos and grammatical errors.")}
            {renderBulletPoint("meh", "Generic, uninspired content.")}
            {renderBulletPoint("slash", "Irrelevant or outdated information.")}
            {renderBulletPoint("shuffle", "Inconsistent formatting.")}
          </Card.Content>
        </Card>

        <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress} activeOpacity={0.7}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Helper function to render bullet points
const renderBulletPoint = (iconName, text) => (
  <View style={styles.bulletPoint}>
    <View style={styles.iconWrapper}><Feather name={iconName} size={18} color="#757575" /></View>
    <Text style={styles.detailBullet}>{text}</Text>
  </View>
);

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
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailBullet: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    flex: 1,
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
});

export default ResumeWritingContent;
