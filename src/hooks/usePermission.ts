// usePermission hook form Location React native

import { useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const usePermission = () => {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
      request('ios.permission.LOCATION_WHEN_IN_USE').then(() => {
        setPermission(true);
      });
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted) {
          setPermission(true);
        }
      });
    }
  }, []);

  return permission;
};
