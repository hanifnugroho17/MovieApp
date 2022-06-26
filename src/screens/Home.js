import { View, Text, RefreshControl, TouchableOpacity, Image, StatusBar, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {AirbnbRating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const [Recommended, setRecommended] = useState([]);
  const [Latest, setLatest] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setRecommended([]);
    setLatest([]);
    GetData();
    setRefreshing(false);
  }, []);

  const GetData = () => {
    axios
      .get('http://code.aldipee.com/api/v1/movies')
      .then(responseData => {
        const RecommendedMovies = responseData.data.results;
        RecommendedMovies.sort((a, b) => {
          return b.vote_average - a.vote_average;
        });
        setRecommended(RecommendedMovies);
      })
      .catch(err => {
        console.error(err);
      });
    axios
      .get('http://code.aldipee.com/api/v1/movies')
      .then(responseData => {
        const latestMovies = responseData.data.results;
        latestMovies.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });
        setLatest(latestMovies);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <View style={styles.Container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F4F4" />
      {IsLoading ? (
        <ActivityIndicator size={25} color="#4D96FF" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={styles.SubTitle}>Recommended</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Recommended.map(item => (
              <View key={item.id} style={styles.RecommendedContainer}>
                <TouchableOpacity
                  onPress={() => {
                    {
                      navigation.navigate('MovieDetail', {
                        idMovies: item.id,
                      });
                    }
                  }}>
                  <Image
                    style={styles.RecommendedPoster}
                    source={{uri: item.poster_path}}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.SubTitle}>Latest Upload</Text>
          {Latest.map(item => (
            <View key={item.id} style={styles.LatestContainer}>
              <View style={styles.Card}>
                <Image
                  style={styles.LatestPoster}
                  source={{uri: item.poster_path}}
                />
                <View style={styles.Content}>
                <Text style={styles.Caption}>Rating:</Text>
                  <AirbnbRating
                    count={9}
                    showRating={false}
                    isDisabled
                    defaultRating={item.vote_average}
                    size={10}
                  />
                  <Text style={styles.Title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.Date}>{item.release_date}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      {
                        navigation.navigate('MovieDetail', {
                          idMovies: item.id,
                        });
                      }
                    }}>
                    <View style={styles.ButtonContainer}>
                      <Text style={styles.Caption}>Show More</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  SubTitle: {
    color: '#303133',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  RecommendedContainer: {
    marginBottom: 10,
    width: 140,
    alignItems: 'center',
  },
  RecommendedPoster: {
    resizeMode: 'stretch',
    width: 120,
    height: 180,
    borderRadius: 25,
  },
  LatestContainer: {
    paddingTop: 25,
    paddingBottom: 15,
  },
  Card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 125,
  },
  LatestPoster: {
    width: 90,
    height: 120,
    borderRadius: 25,
    resizeMode: 'stretch',
    marginTop: -20,
    marginRight: 10,
  },
  Content: {
    paddingTop: 20,
    paddingBottom: 25,
    justifyContent: 'space-between',
  },
  Title: {
    width: 145,
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Date: {
    color: '#747474',
    marginBottom: 8,
    fontSize: 11,
  },
  ButtonContainer: {
    height: 25,
    width: 80,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  Caption: {
    fontSize: 10,
    color: '#fff',
  },
  Vote: {
    color: '#FFBC03',
    paddingTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 40,
  },
});

export default Home;
