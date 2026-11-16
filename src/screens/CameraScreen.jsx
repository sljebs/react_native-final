import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>კამერის გამოსაყენებლად საჭიროა ნებართვა</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.text}>ნებართვის მიცემა</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Text style={styles.text}>კამერის შებრუნება</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#163D2D', padding: 20 },
  message: { fontFamily: 'Arial', textAlign: 'center', paddingBottom: 16, color: '#FFFFFF', fontSize: 16, lineHeight: 24 },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', margin: 40 },
  flipButton: { alignSelf: 'flex-end', alignItems: 'center', backgroundColor: '#163D2D', paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12 },
  button: { backgroundColor: '#1D563B', padding: 16, borderRadius: 12, alignItems: 'center' },
  text: { fontFamily: 'Arial', fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});