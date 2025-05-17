import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Card } from 'react-native-paper';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string | null;
}

const News = () => {
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=10&apiKey=8d297709d13f4ff09c29c7f3dbe2a090') // Replace with your API key
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles && data.articles.length > 0) {
          const articles: NewsArticle[] = data.articles.map((article: any) => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
          }));
          setNewsList(articles);
        } else {
          setNewsList([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        setNewsList([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0288d1" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.scrollView}>
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <View style={styles.header}>
          <Feather name="rss" size={30} color="#4a6572" style={styles.headerIcon} />
          <Text style={styles.detailHeading}>Tech News Feed</Text>
        </View>
        <Text style={styles.detailSubheading}>Stay updated with the latest in technology.</Text>

        {newsList.length === 0 ? (
          <Text style={styles.detailText}>No news available at the moment.</Text>
        ) : (
          newsList.map((item) => (
            <Card key={item.url} style={styles.card}>
              <Card.Content>
                {item.urlToImage ? (
                  <Image source={{ uri: item.urlToImage }} style={styles.image} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderText}>No Image Available</Text>
                  </View>
                )}
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.detailText}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.readMoreBtn}
                  onPress={() => Linking.openURL(item.url)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.readMoreText}>Read More</Text>
                </TouchableOpacity>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { // Added the container style
    flex: 1,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f0f4ff',
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
    marginBottom: 12,
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
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imagePlaceholderText: {
    color: '#aaa',
    fontStyle: 'italic',
  },
  readMoreBtn: {
    backgroundColor: '#0288d1',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
    shadowColor: '#0288d1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  readMoreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default News;