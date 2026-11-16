import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
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
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#000' },
  message: { textAlign: 'center', paddingBottom: 10, color: '#fff' },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', margin: 64 },
  flipButton: { alignSelf: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', padding: 12, borderRadius: 8 },
  text: { fontSize: 16, fontWeight: 'bold', color: 'white' },
});