import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Loading from "../components/Loading";
import { fetchCredits, fetchRelaseDate } from "../servises/servises";
import Constants from "expo-constants";
import InfoCard from "../components/InfoCard";
import BackButton from "../components/BackButton";

const MovieScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [relaseDate, setRelaseDate] = useState();
  const { movie } = route.params;

  useEffect(() => {
    setLoading(true);
    fetchCredits(movie.id).then((data) => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchRelaseDate(movie.id).then((data) => {
      setRelaseDate(data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View>
        <Image
          source={{
            uri: `http://image.tmdb.org/t/p/w780${movie?.backdrop_path}`,
          }}
          style={styles.banner}
        />
        <InfoCard movie={movie} relaseDate={relaseDate} />
      </View>

      <Text style={styles.overviewTitle}>Overview</Text>
      <ScrollView>
        <View style={styles.overviewContainer}>
          <Text style={styles.overviewText}>{movie.overview}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default MovieScreen;

const styles = StyleSheet.create({
  banner: { width: Constants.width, height: 300 },

  container: {
    flex: 1,
    backgroundColor: "#212121",
  },

  overviewContainer: {
    borderWidth: 2,
    borderColor: "white",
    margin: 10,
    padding: 10,
  },

  overviewTitle: {
    color: "white",
    fontSize: 40,
    fontWeight: "900",
    paddingBottom: 12,
  },

  overviewText: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
    letterSpacing: 2,
  },
});
