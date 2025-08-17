import { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { Camera } from 'react-native-vision-camera';

const useCameraPermissions = () => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'authorized');
    };
    requestPermissions();
  }, []);

  return hasPermission;
};

export default useCameraPermissions;
