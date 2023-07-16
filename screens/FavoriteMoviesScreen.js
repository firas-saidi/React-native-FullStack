import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { FavoriteMoviesContext } from '../contexts/FavoriteMoviesContext';

const screen = Dimensions.get('screen');

const FavoriteMoviesScreen = ({ navigation }) => {
  const { favoriteMovies, removeMovieFromFavorites } = useContext(FavoriteMoviesContext);

  const deleteMovie = async (movieId) => {
    await removeMovieFromFavorites(movieId);
  };

  const renderItem = ({ item }) => (
    <Card key={item.id} style={styles.movieCard}>
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => deleteMovie(item.id)}>
          <AntDesign name="minuscircle" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Details', { movie: item })}>
        <Image
          source={{ uri: `http://image.tmdb.org/t/p/w780${item.poster_path}` }}
          style={{ width: Constants.width, height: 130 }}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle}>{item.title}</Text>
          <Text style={styles.movieReview}>
            {item.vote_average}/10 <FontAwesome name="star" size={15} color="black" />
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={favoriteMovies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={<Text style={{textAlign:"center" , fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20,}}>There is no movie added yet to favorite Movies List   </Text>}
      />
    </View>
  );
};

export default FavoriteMoviesScreen;

const styles = StyleSheet.create({
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
    flexDirection: 'column',
  },
  cardHeader: {
    position: 'absolute',
    top: -2,
    right: 6,
    zIndex: 1,
  },
});
