import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { supabase } from '../Constants/supabaseClient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// 1️⃣ Define your navigation params
type RootStackParamList = {
  Home: undefined;
  LiveStreaming: { role: 'host' | 'audience'; streamID?: string };
};

// 2️⃣ Define the navigation prop type
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// 3️⃣ Define the LiveStream type
type LiveStream = {
  id: string;
  username: string;
  avatar_url: string;
  viewer_count: number;
  is_live: boolean;
  stream_id: string;
};

// 4️⃣ Props type for the Home component
type HomeProps = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);

  useEffect(() => {
    const fetchLiveStreams = async () => {
      const { data, error } = await supabase
        .from('live_streams')
        .select('*')
        .eq('is_live', true);

      if (!error) setLiveStreams(data || []);
    };

    fetchLiveStreams();

    // Subscribe to live stream changes
    const channel = supabase
      .channel('public:live_streams')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'live_streams' },
        () => {
          fetchLiveStreams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const renderLiveItem = ({ item }: { item: LiveStream }) => (
    <TouchableOpacity
      style={styles.liveCard}
      onPress={() =>
        navigation.navigate('LiveStreaming', {
          role: 'audience',
          streamID: item.stream_id,
        })
      }
    >
      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.viewers}>{item.viewer_count} watching</Text>
      </View>
      <View style={styles.liveBadge}>
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.headerTitle}>REKS LIVE</Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={28} color="#000" />
          <Octicons name="bell" size={28} color="#000" />
        </View>
      </View>

      <View style={{ flex: 1, padding: 20 }}>
        {/* <TouchableOpacity
          style={styles.hostButton}
          onPress={() => navigation.navigate('LiveStreaming', { role: 'host' })}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Go Live</Text>
        </TouchableOpacity> */}

        {/* <Text style={styles.sectionTitle}>Live Now</Text> */}
        <FlatList
          data={liveStreams}
          keyExtractor={(item) => item.id}
          renderItem={renderLiveItem}
          ListEmptyComponent={<Text>No one is live right now</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Montserrat-Black',
    fontSize: 16,
  },
  headerIcons: {
    gap: 16,
    flexDirection: 'row',
  },
  hostButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  liveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
  },
  viewers: {
    fontSize: 14,
    color: '#666',
  },
  liveBadge: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  liveText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Home;
