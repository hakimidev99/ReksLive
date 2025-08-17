import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import StreamerProfile from '../Constants/StreamerProfile';
import { supabase } from '../Constants/supabaseClient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  SoloLiveScreen: { role?: 'host' | 'audience' };
};
type Props = NativeStackScreenProps<RootStackParamList, 'SoloLiveScreen'>;

type Profile = {
  id: string;
  username: string;
  avatar_url: string;
};

const appID = 123456789; // Replace with Reks ZEGOCLOUD App ID
const appSign = 'YOUR_TEMP_TOKEN'; // Replace with Reks  ZEGOCLOUD App Sign
const roomID = 'room1';

//  Manually define default configs
const HOST_DEFAULT_CONFIG = {
  turnOnCameraWhenJoining: true,
  turnOnMicrophoneWhenJoining: true,
  showMyCameraToggleButton: true,
  showMyMicrophoneToggleButton: true,
  showLeaveLiveStreamingButton: true,
};

const AUDIENCE_DEFAULT_CONFIG = {
  turnOnCameraWhenJoining: false,
  turnOnMicrophoneWhenJoining: false,
  showMyCameraToggleButton: false,
  showMyMicrophoneToggleButton: false,
  showLeaveLiveStreamingButton: true,
};

export default function SoloLiveScreen({ route }: Props) {
  const role = route?.params?.role ?? 'audience';

  const { profile, loading } = StreamerProfile() as {
    profile: Profile | null;
    loading: boolean;
  };

  useEffect(() => {
    if (loading || !profile) return;
    let liveId: number | undefined;

    const startStreamRecord = async () => {
      if (role === 'host') {
        const { data, error } = await supabase
          .from('live_streams')
          .insert([{
            host_id: profile.id,
            username: profile.username,
            avatar_url: profile.avatar_url,
            stream_id: roomID,
            is_live: true,
            viewer_count: 0,
          }])
          .select()
          .single();

        if (!error && data) {
          liveId = data.id;
        }
      }
    };

    const removeStreamRecord = async () => {
      if (role === 'host' && liveId) {
        await supabase.from('live_streams').delete().eq('id', liveId);
      }
    };

    startStreamRecord();
    return () => {
      removeStreamRecord();
    };
  }, [loading, profile, role]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  if (!profile) return null;

  const liveConfig =
    role === 'host' ? { ...HOST_DEFAULT_CONFIG } : { ...AUDIENCE_DEFAULT_CONFIG };

  return (
    <View style={{ flex: 1 }}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={appID}
        appSign={appSign}
        userID={profile.id}
        userName={profile.username || 'Guest'}
        liveID={roomID}
        config={liveConfig}
      />
    </View>
  );
}
