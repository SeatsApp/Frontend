import React, {useEffect, useState} from 'react'
import {View, StyleSheet, ImageBackground} from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import {Button, Text} from 'react-native-paper';
import useSeat from '../../shared/hooks/useSeat';

export default function CheckIn() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const {checkInSeat} = useSeat();

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async (codeInfo: BarCodeScannerResult) => {
        setScanned(true);
        await checkInSeat(Number.parseInt(codeInfo.data));
    };

    if (!hasPermission) {
        return (
            <View style={{alignItems: 'center'}}>
                <Text>
                    No permission to access your camera.
                </Text>
            </View>
        )
    }

    return (
        <ImageBackground resizeMode='cover' style={{
            flex: 1,
            justifyContent: "center"
        }} source={require('../../../assets/background.png')}>
            <View testID={'CheckInView'} style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <BarCodeScanner testID={'BarCodeScanner'}
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                />
                {scanned &&
                    <Button mode='contained' onPress={() => setScanned(false)}>Tap to Scan Again</Button>
                }
                <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginTop: 5}}>
                    Scan the QR code on the desk you reserved to check in.
                </Text>
            </View>
        </ImageBackground>
    )
}