// googleSignInConfig.js
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '207254871909-ad3u4vkhs3iie1tqdlhgdtbvv8co5eve.apps.googleusercontent.com', // from Google Cloud Console
  offlineAccess: true,
});
