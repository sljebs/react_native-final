import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function CartScreen() {
  const { cart, removeFromCart, updateCartQuantity } = useContext(AuthContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>თქვენი კალათა</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>კალათა ცარიელია</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
              <View style={styles.productInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>ფასი: ₾{item.price}</Text>
                <Text style={styles.itemWarranty}>გარანტია: {item.warranty}</Text>
                <View style={styles.itemFooter}>
                  <Text style={styles.quantityLabel}>რაოდენობა</Text>
                  <View style={styles.quantityControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateCartQuantity(item.id, item.quantity - 1)}
                      accessibilityRole="button"
                      accessibilityLabel={`${item.name} რაოდენობის შემცირება`}
                    >
                      <Text style={styles.quantityButtonText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityValue}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={[
                        styles.quantityButton,
                        item.quantity >= Math.min(10, item.stock ?? 10) && styles.quantityButtonDisabled,
                      ]}
                      onPress={() => updateCartQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= Math.min(10, item.stock ?? 10)}
                      accessibilityRole="button"
                      accessibilityLabel={`${item.name} რაოდენობის გაზრდა`}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name} კალათიდან წაშლა`}
                >
                  <Text style={styles.removeText}>წაშლა</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={(
            <View style={styles.footer}>
              <Text style={styles.totalText}>ჯამი: ₾{total}</Text>
              <TouchableOpacity style={styles.checkoutBtn} onPress={() => alert('შეკვეთა მიღებულია!')}>
                <Text style={styles.checkoutText}>შეკვეთა</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F3F6F1' },
  title: { color: '#163D2D', fontFamily: 'Arial', fontSize: 24, fontWeight: '700', marginBottom: 18 },
  empty: { fontFamily: 'Arial', textAlign: 'center', color: '#718176', marginTop: 48 },
  listContent: { paddingBottom: 20 },
  cartItem: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E1E9E2', elevation: 2 },
  productImage: { width: 100, height: 112, borderRadius: 12, backgroundColor: '#E7ECE7' },
  productInfo: { flex: 1, marginLeft: 12 },
  itemName: { color: '#163D2D', fontFamily: 'Arial', fontSize: 16, fontWeight: '700', marginBottom: 8 },
  itemPrice: { color: '#1D563B', fontFamily: 'Arial', fontSize: 14, fontWeight: '600', marginBottom: 6 },
  itemWarranty: { color: '#718176', fontFamily: 'Arial', fontSize: 12, marginBottom: 12 },
  itemFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 'auto' },
  quantityLabel: { color: '#52665A', fontFamily: 'Arial', fontSize: 12 },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  quantityButton: { width: 28, height: 28, borderRadius: 8, backgroundColor: '#1D563B', alignItems: 'center', justifyContent: 'center' },
  quantityButtonDisabled: { backgroundColor: '#B8C6BA' },
  quantityButtonText: { color: '#FFFFFF', fontFamily: 'Arial', fontSize: 20, fontWeight: '600', lineHeight: 23 },
  quantityValue: { minWidth: 16, textAlign: 'center', color: '#20352A', fontFamily: 'Arial', fontSize: 15, fontWeight: '700' },
  removeButton: { alignSelf: 'flex-end', paddingVertical: 8, paddingLeft: 12 },
  removeText: { color: '#A53D35', fontFamily: 'Arial', fontWeight: '700', fontSize: 12 },
  footer: { marginTop: 6, borderTopWidth: 1, borderColor: '#D5E0D7', paddingTop: 18 },
  totalText: { color: '#163D2D', fontFamily: 'Arial', fontSize: 19, fontWeight: '700', marginBottom: 12 },
  checkoutBtn: { backgroundColor: '#1D563B', padding: 16, borderRadius: 12, alignItems: 'center' },
  checkoutText: { color: '#FFFFFF', fontFamily: 'Arial', fontWeight: '700', fontSize: 16 },
});