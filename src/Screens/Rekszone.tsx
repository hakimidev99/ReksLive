import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';

// ====== TMDb API CONFIG ======
const API_KEY = '669cf58d429534c9657be216521f1741'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const TMDB = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'en-US' },
});

// ====== SCREEN ======
type RootStackParamList = {
  Details: { id: string; type: 'movie' | 'tv' };
};

type Movie = {
  id: string;
  poster_path: string;
  title?: string;
  release_date?: string;
  name?: string;
};

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.7;
const ITEM_HEIGHT = ITEM_WIDTH * (2 / 3);

const Rekszone = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [upcoming, setUpComing] = useState<Movie[]>([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const trendingRes = await TMDB.get('/trending/movie/week');
      setTrending(trendingRes.data.results);

      const popularRes = await TMDB.get('/movie/popular');
      setPopular(popularRes.data.results);

      const upcomingRes = await TMDB.get('/movie/upcoming');
      setUpComing(upcomingRes.data.results);
    } catch (err) {
      console.error('Error fetching from TMDb:', err);
    }
  };

  // ===== Carousel render item =====
  const renderCarouselItem = ({ item }: { item: Movie }) => {
    const year = item.release_date ? item.release_date.substring(0, 4) : '';
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details', { id: item.id, type: 'movie' })}
        activeOpacity={0.8}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: item.poster_path ? `${IMG_BASE}${item.poster_path}` : 'https://via.placeholder.com/115x157?text=No+Image',
            }}
            style={styles.itemImage}
          />
          <View style={styles.textOverlay}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemYear}>{year}</Text>
            <TouchableOpacity style={styles.watchNowButton}>
              <Text style={styles.watchNowButtonText}>Watch Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ===== Small FlatList render item =====
  const renderMovie = ({ item }: { item: Movie }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { id: item.id, type: 'movie' })}
      style={{ alignItems: 'center' }}
    >
      <View style={{ position: 'relative', overflow: 'hidden' }}>
        <Image
          source={{
            uri: item.poster_path
              ? `${IMG_BASE}${item.poster_path}`
              : 'https://via.placeholder.com/115x157?text=No+Image',
          }}
          style={styles.smallImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradientOverlay}
        >
          <Text style={styles.smallTitle} numberOfLines={1}>
            {item.title || item.name}
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <LinearGradient colors={['#F5F5DC', '#FFFFFF']} style={{ flex: 1 }}>
        <SafeAreaView>
          {/* Header */}
          <LinearGradient
            colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.23)']}
            start={{ x: 0, y: 2 }}
            end={{ x: 0, y: 0 }}
            style={styles.header}
          >
            <View style={styles.headerContent}>
              <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.logoText}>REKS ZONE</Text>
              </View>
              <Ionicons name="search" size={28} color="#fff" style={{ paddingRight: 8 }} />
            </View>
          </LinearGradient>

          {/* Upcoming Carousel */}
          <View style={{ marginTop: 50 }}>
            <Carousel
              data={upcoming}
              renderItem={renderCarouselItem}
              sliderWidth={screenWidth}
              itemWidth={ITEM_WIDTH}
              inactiveSlideScale={0.85}
              inactiveSlideOpacity={0.5}
              activeSlideAlignment="center"
              containerCustomStyle={{ marginVertical: 20 }}
            />

            {/* Trending */}
            <Text style={styles.sectionTitle}>Trending</Text>
            <FlatList
              horizontal
              data={trending}
              renderItem={renderMovie}
              keyExtractor={(item) => `trending-${item.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 16 }}
            />

            {/* Popular */}
            <Text style={styles.sectionTitle}>Popular</Text>
            <FlatList
              horizontal
              data={popular}
              renderItem={renderMovie}
              keyExtractor={(item) => `popular-${item.id}`}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 16 }}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

// ===== STYLES =====
const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#F5F5DC' },
  header: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
  },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  logo: { width: 48, height: 48 },
  logoText: { fontSize: 16, color: '#fff', marginLeft: 5, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#000', marginVertical: 10, paddingHorizontal: 16 },

  // Carousel Item
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  itemImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  itemTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  itemYear: { color: '#ccc', fontSize: 14, marginTop: 5 },
  watchNowButton: { backgroundColor: '#FFD700', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20, marginTop: 10, alignSelf: 'flex-start' },
  watchNowButtonText: { color: '#333', fontSize: 14, fontWeight: 'bold' },

  // Small FlatList Item
  smallImage: { width: 115, height: 157, borderRadius: 15, backgroundColor: '#ccc' },
  gradientOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  smallTitle: { position: 'absolute', bottom: 5, color: '#fff', fontSize: 14, fontWeight: '600', paddingHorizontal: 5 },
});

export default Rekszone;
