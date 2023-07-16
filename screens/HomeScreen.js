import Constants from 'expo-constants';
import React, { useEffect, useState, useContext } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import Loading from '../components/Loading';
import { fetchMovies } from "../servises/servises";
import { EvilIcons, FontAwesome ,Fontisto } from '@expo/vector-icons';
import { FavoriteMoviesContext } from '../contexts/FavoriteMoviesContext';

const screen = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchNow, setSearchNow] = useState(false);
  const { favoriteMovies } = useContext(FavoriteMoviesContext);

  useEffect(() => {
    setLoading(true);
    fetchMovies(searchTerm, movies).then((data) => {
      setMovies(data);
      setLoading(false);
    });
  }, [searchNow]);

  useEffect(() => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  const handlePress = () => {
    navigation.navigate('Favorites');
  };

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={handlePress} style={styles.iconContainer}>
          <View>
            <FontAwesome name="heart" size={30} color="red" />
          </View>
        </TouchableOpacity>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movies[0]?.backdrop_path}`,
          }}
          style={styles.banner}
        />
        <View style={styles.bannerInfoCard}>
          <Text style={styles.bannerTitle}>
            {movies[0]?.original_title.substr(0, 20)}
          </Text>
          <Text style={styles.bannerOverview}>
            {movies[0]?.overview.substr(0, 80) + '...'}
          </Text>
        </View>
      </View>

      <View>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder={'search movies'}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
          />
          <TouchableOpacity
            onPress={() => {
              console.log('pressed');
              setSearchNow(!searchNow);
            }}
          >
            <EvilIcons
              name={searchTerm ? 'search' : 'refresh'}
              size={20}
              color="black"
              style={{ alignSelf: 'center', marginHorizontal: 20 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.movieListCard}>

       {filteredMovies.length === 0 ? (
            // Display message when there are no search results
            <Text style={styles.noResultsText}>No results found.</Text>
          ) : (
            <FlatList
              data={filteredMovies}
              numColumns={2}
              renderItem={({ item, index }) => {
                const isFavorite = favoriteMovies.some(
                  (favorite) => favorite.id === item.id
                );
                return (
                  <Card style={styles.movieCard}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Details", { movie: item })
                      }
                    >
                      <Image
                        source={{
                          uri: `http://image.tmdb.org/t/p/w780${item.poster_path}`,
                        }}
                        style={{ width: Constants.width, height: 130 }}
                      />

                      <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>{item.title}</Text>
                        <Text style={styles.movieReview}>
                          {item.vote_average}/10{" "}
                          {isFavorite ? (
                            <>  
                           
                              <FontAwesome
                                name="star"
                                size={16}
                                color="black"
                              />

                                <Fontisto
                                  name="favorite"
                                  size={16}
                                  color="black"
                                  margin={10}
                                  />
                              
                            </>
                          ) : (
                            <FontAwesome name="star" size={15} color="black" />
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </Card>
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  banner: { width: Constants.width, height: 200 },
  bannerInfoCard: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 10,

    paddingBottom: 50,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(21,21,21,0.5)',
  },
  bannerTitle: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1.2,
  },
  bannerOverview: {
    color: 'grey',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  inputCard: {
    position: 'absolute',
    top: -40,
    margin: 20,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    zIndex: 100,
  },
  input: {
    padding: 10,
    flex: 1,
  },
  movieCard: {
    flex: 1,
    height: 200,
    margin: 5,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 5,
  },
  movieListCard: {
    top: screen.height * 0.05,
  },
  movieInfo: {
    padding: 10,
    backgroundColor: '#fff',
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  movieReview: {
    fontSize: 10,
    color: 'gray',
    marginTop: 2,
    flexDirection : 'column',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  noResultsText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
});
