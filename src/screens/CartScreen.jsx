import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function CartScreen() {
  const { cart, removeFromCart } = useContext(AuthContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>თქვენი კალათა</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>კალათა ცარიელია</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text>₾{item.price} x {item.quantity}</Text>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeText}>წაშლა</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.totalText}>ჯამი: ₾{total}</Text>
            <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('შეკვეთა მიღებულია!')}>
              <Text style={styles.checkoutText}>შეკვეთა</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  empty: { textAlign: 'center', color: '#888', marginTop: 40 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: '500' },
  removeText: { color: 'red', fontWeight: 'bold' },
  footer: { marginTop: 20, borderTopWidth: 1, borderColor: '#ccc', paddingTop: 15 },
  totalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  checkoutBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});