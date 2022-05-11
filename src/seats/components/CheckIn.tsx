import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Button, Text } from 'react-native-paper';
import useSeat from '../../shared/hooks/useSeat';

export default function CheckIn() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const { checkInSeat } = useSeat();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = (codeInfo: BarCodeScannerResult) => {
        setScanned(true);
        checkInSeat(Number.parseInt(codeInfo.data));
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View testID={'CheckInView'} style={styles.container}>
            <BarCodeScanner testID={'BarCodeScanner'}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button onPress={() => setScanned(false)} >Tap to Scan Again</Button>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });