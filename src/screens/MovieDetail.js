import {View, Text, Image, ScrollView, StatusBar, RefreshControl, ActivityIndicator, StyleSheet} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import Button1 from '../components/Button1';
import {useNavigation, useRoute} from '@react-navigation/native';
import Share from 'react-native-share';

const MovieDetail = () => {
  const route = useRoute();
  const [Movie, setMovie] = useState([]);
  const [Genres, setGenres] = useState([]);
  const [Actors, setActors] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setMovie([]);
    setGenres([]);
    setActors([]);
    GetData();
    setRefreshing(false);
  }, []);

  const GetData = () => {
    axios
      .get(`http://code.aldipee.com/api/v1/movies/${route.params.idMovies}`)
      .then(responseData => {
        setMovie(responseData.data);
        setGenres(responseData.data.genres);
        setActors(responseData.data.credits.cast);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const onBack = () => {
    navigation.goBack();
  };

  const onShare = async () => {
    const shareOptions = {
      message: Movie.title,
      url: Movie.poster_path,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {IsLoading ? (
        <ActivityIndicator size={25} color="#4D96FF" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image style={styles.Backdrop} source={{uri: Movie.backdrop_path}} />
          <View style={styles.Content}>
            <View style={styles.Button}>
              <View>
                <Button1 Name={'arrow-left'} onPress={onBack} />
              </View>
              <View style={styles.Right}>
                <Button1 Name={'heart'} />
                <Button1 Name={'share'} onPress={onShare} />
              </View>
            </View>
            <View style={styles.Card}>
              <View style={styles.Header}>
                <Image
                  style={styles.Poster}
                  source={{uri: Movie.poster_path}}
                />
                <View style={styles.Text}>
                  <Text style={styles.Title}>{Movie.title}</Text>
                  <Text style={styles.Tagline}>{Movie.tagline}</Text>
                  <View style={styles.Release}>
                    <Text style={styles.Status}>{Movie.status}</Text>
                    <Text style={styles.Center}> - </Text>
                    <Text style={styles.Status}>{Movie.release_date}</Text>
                  </View>
                  <Text style={styles.Status}>
                    Rating : {Movie.vote_average}
                  </Text>
                  <Text style={styles.Status}>Runtime : {Movie.runtime}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.SubTitle}>Genre</Text>
                <View style={styles.GenreContainer}>
                  {Genres.map(item => (
                    <View key={item.id} style={styles.Box}>
                      <Text style={styles.GenreName}>{item.name}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.SubTitle}>Synopshis</Text>
                <Text style={styles.Overview}>{Movie.overview}</Text>
                <Text style={styles.SubTitle}>Actors/Artist</Text>
                <View style={styles.ActorsContainer}>
                  {Actors.map(item => (
                    <View key={item.id} style={styles.ActorContainer}>
                      <Image
                        style={styles.Photo}
                        source={{uri: item.profile_path}}
                      />
                      <Text style={styles.ActorsName} numberOfLines={1}>
                        {item.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  Backdrop: {
    width: '100%',
    height: 200,
    position: 'absolute',
  },
  Button: {
    marginBottom: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  Right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 70,
  },
  Card: {
    backgroundColor: '#fff',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingHorizontal: 25,
  },
  Header: {
    flexDirection: 'row',
  },
  Poster: {
    width: 140,
    height: 200,
    borderRadius: 20,
    resizeMode: 'stretch',
    marginTop: -50,
    marginRight: 25,
  },
  Text: {
    width: 180,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  Title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    lineHeight: 20,
  },
  Tagline: {
    fontSize: 12,
    color: '#808080',
    lineHeight: 15,
  },
  Release: {
    flexDirection: 'row',
  },
  Status: {
    fontSize: 12,
    color: '#ACACAD',
  },
  Center: {
    marginHorizontal: 3,
    fontSize: 12,
  },
  SubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 20,
  },
  GenreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  Box: {
    borderRadius: 8,
    borderColor: '#808080',
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 10,
    marginBottom: 5,
  },
  GenreName: {
    fontSize: 11,
    color: '#808080',
  },
  Overview: {
    fontSize: 12,
    color: '#ACACAD',
    textAlign: 'justify',
    lineHeight: 20,
  },
  ActorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ActorContainer: {
    width: 100,
    height: 140,
    marginBottom: 5,
    alignItems: 'center',
  },
  Photo: {
    width: 80,
    height: 100,
    borderRadius: 25,
    resizeMode: 'stretch',
    marginBottom: 5,
  },
  ActorsName: {
    width: 80,
    textAlign: 'center',
    fontSize: 12,
    color: '#ACACAD',
  },
});

export default MovieDetail;
