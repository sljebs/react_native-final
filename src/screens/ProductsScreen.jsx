import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const PRODUCTS = [
  { id: '1', name: 'Wireless Headphones', price: 120, description: 'High quality sound wireless headphones.' },
  { id: '2', name: 'Smart Watch', price: 250, description: 'Track your health and fitness seamlessly.' },
  { id: '3', name: 'Mechanical Keyboard', price: 90, description: 'RGB backlit mechanical gaming keyboard.' },
  { id: '4', name: 'Gaming Mouse', price: 45, description: 'Ergonomic high-precision optical mouse.' },
];

export default function ProductsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>პროდუქტები</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Camera')}>
            <Text style={styles.navBtnText}>📷 კამერა</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.navBtnText}>🛒 კალათა</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { product: item })}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₾{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, marginTop: 10 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row', gap: 8 },
  navBtn: { backgroundColor: '#007AFF', padding: 8, borderRadius: 6 },
  navBtnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  productName: { fontSize: 16, fontWeight: '600' },
  productPrice: { color: '#888', marginTop: 5 },
});