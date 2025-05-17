import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const TechnicalRoundsContent = () => {
  const handleEnrollPress = () => {
    Alert.alert('Enroll', 'Thank you for your interest! Enrollment feature coming soon.');
  };

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.detailContainer}>
        <View style={styles.header}>
          <Feather name="code" size={30} color="#4a6572" style={styles.headerIcon} />
          <Text style={styles.detailHeading}>Technical Rounds</Text>
        </View>
        <Text style={styles.detailSubheading}>Master the skills for technical interviews.</Text>
        <Text style={styles.detailText}>
          Technical interviews assess your coding skills and problem-solving abilities. They often include questions on data structures, algorithms, and system design. Preparing for these interviews is crucial to demonstrate your technical proficiency and ability to think critically under pressure.
        </Text>

        <Card style={styles.card}>
          <Card.Title
            title={<Text style={styles.cardTitle}>DSA</Text>}
            left={() => (
              <View style={styles.iconWrapper}>
                <Feather name="database" size={25} color="#388e3c" />
              </View>
            )}
          />
          <Card.Content>
            <View style={styles.textWrapper}>
              <Text style={styles.detailText}>
                Brush up on your knowledge of arrays, linked lists, trees, graphs, and common algorithms. Understanding these concepts is essential for solving coding problems efficiently.
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title={<Text style={styles.cardTitle}>Example Questions</Text>}
            left={() => (
              <View style={styles.iconWrapper}>
                <Feather name="help-circle" size={24} color="#0288d1" />
              </View>
            )}
          />
          <Card.Content>
            <View style={styles.textWrapper}>
              <Text style={styles.detailText}>
                Practice solving coding challenges and explaining your approach. Familiarize yourself with common interview questions and coding platforms to enhance your skills.
              </Text>
            </View>
          </Card.Content>
        </Card>

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
  scrollContent: {
    paddingBottom: 40,
  },
  detailContainer: {
    padding: 20,
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
    overflow: 'visible',
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
  textWrapper: {
    flexShrink: 1,
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

export default TechnicalRoundsContent;


