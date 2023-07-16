import { FontAwesome } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from './ProgressBar';
import { FavoriteMoviesContext } from '../contexts/FavoriteMoviesContext';


const InfoCard = ({ movie, relaseDate }) => {
  
  const { addMovieToFavorites } = useContext(FavoriteMoviesContext);

  const addToFavorites = () => {
    addMovieToFavorites(movie);
  };

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours} hours ${minutes} minutes`;
  };

  return (
    <View style={styles.infoCard}>
      <TouchableOpacity onPress={addToFavorites} style={styles.iconContainer}>
        <View>
          <FontAwesome name="heart" size={30} color="red" />
          <Text style={styles.plusIcon}>+</Text>
        </View>
      </TouchableOpacity>
      <Image
        source={{
          uri: `http://image.tmdb.org/t/p/w780${movie?.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.textInfo}>
        <Text style={styles.title}>{movie.original_title}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 8, fontSize: 20 }}>
            {formatRuntime(relaseDate?.runtime)}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
            <Text style={{ color: 'white', fontWeight: '900', fontSize: 20 }}>
              <FontAwesome name="star" size={20} color="yellow" />
              {movie?.vote_average}
            </Text>
            <ProgressBar vote_average={movie?.vote_average} />
          </View>
        </View>

        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
          {relaseDate?.release_date}
        </Text>
        <View style={styles.genreContainer}>
          {relaseDate?.genres.map((genre) => (
            <TouchableOpacity key={genre.id} style={styles.genreButton}>
              <Text style={styles.genreButtonText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  infoCard: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    top: 10,
    paddingRight: 10,
    backgroundColor: 'rgba(21, 21, 21, 0.5)',
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    top: -1,
    right: 10,
    zIndex: 1,
  },
  plusIcon: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: [{ translateX: -6 }, { translateY: -6 }],
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  textInfo: {
    left: 10,
    right: 10,
    flex: 1,
    justifyContent: 'space-evenly',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  genreButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  genreButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
