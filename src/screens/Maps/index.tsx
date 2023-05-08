import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { usePermission } from 'IpkList/src/hooks/usePermission';
import { ApplicationScreenProps } from 'IpkList/@types/navigation';
import { useSelector } from 'react-redux';
import { storesListApi } from 'IpkList/src/services/modules/storesList';
import LoadingMap from 'IpkList/src/components/Loading';
import { Colors } from 'IpkList/src/theme/Variables';
import { useTranslation } from 'react-i18next';
import Button from 'IpkList/src/components/Button';

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const MapScreen = ({ route, navigation }: ApplicationScreenProps) => {
  const hasPermission = usePermission();
  const [region, setRegion] = useState<Region>();
  const [destination, setDestination] = useState<Region>();
  const [loadingMap, setLoadingMap] = useState(true);
  const { storeId } = route.params!!;
  const { data } = useSelector(storesListApi.endpoints.getStores.select());
  const mapRef = useRef<MapView>(null);
  const { t } = useTranslation(['stores']);

  const findStoreById = useMemo(
    () => data?.find(item => item.id === storeId),
    [data, storeId],
  );
  useEffect(() => {
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        (position: any) => {
          console.log('position', position);
          setRegion({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setLoadingMap(false);
        },
        () => {
          setLoadingMap(false);
        },
        { enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 },
      );
    }
  }, [hasPermission]);

  useEffect(() => {
    if (data) {
      setDestination({
        latitude: Number(findStoreById?.address.coordinate.lat)!!,
        longitude: Number(findStoreById?.address.coordinate.lng)!!,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [data, findStoreById]);

  useEffect(() => {
    if (destination && mapRef.current) {
      mapRef.current.fitToCoordinates([region!!, destination], {
        edgePadding: { top: 20, right: 20, bottom: 20, left: 20 },
        animated: true,
      });
    }
  }, [destination, region]);

  if (loadingMap) {
    return <LoadingMap />;
  } else {
    return (
      <View style={styles.container}>
        {region && (
          <MapView ref={mapRef} style={styles.map} region={region}>
            <Marker coordinate={region} />
            {destination && (
              <>
                <Marker coordinate={destination} pinColor={Colors.primary} />
                <Polyline
                  coordinates={[region, destination]}
                  strokeColor={Colors.primary}
                  strokeWidth={3}
                />
              </>
            )}
          </MapView>
        )}
        <View style={styles.buttonContainer}>
          <Button
            text={t('stores:accept')}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default MapScreen;
