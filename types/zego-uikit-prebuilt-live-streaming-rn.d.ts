// types/zego-uikit-prebuilt-live-streaming-rn.d.ts
import { ComponentType, ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface LiveStreamingConfig {
  onLeaveLiveStreaming?: () => void;
  onLiveStreamingEnded?: () => void;
  onStartLiveButtonPressed?: () => void;
  bottomMenuBarConfig?: {
    hostButtons?: Array<string>;
    coHostButtons?: Array<string>;
    audienceButtons?: Array<string>;
  };
  turnOnCameraWhenJoining?: boolean;
  foregroundBuilder?: (params: { userInfo: any }) => ReactNode;
  // Add more config props as needed based on docs
}

export interface ZegoUIKitPrebuiltLiveStreamingProps {
  appID: number;
  appSign: string;
  userID: string;
  userName: string;
  liveID: string;
  config?: LiveStreamingConfig;
  plugins?: any[];
  style?: ViewStyle;
}

declare const ZegoUIKitPrebuiltLiveStreaming: ComponentType<ZegoUIKitPrebuiltLiveStreamingProps>;

export const HOST_DEFAULT_CONFIG: LiveStreamingConfig;
export const ZegoMenuBarButtonName: {
  toggleMicrophoneButton: string;
  coHostControlButton: string;
  // Extend with actual names from documentation
};

export default ZegoUIKitPrebuiltLiveStreaming;
