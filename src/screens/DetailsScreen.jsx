import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function DetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useContext(AuthContext);
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = async () => {
    const added = await addToCart(product, quantity);
    if (added) navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>₾{product.price}</Text>
      <Text style={styles.sectionTitle}>აღწერა</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>მარაგშია</Text>
          <Text style={styles.infoValue}>{product.stock} ცალი</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>გარანტია</Text>
          <Text style={styles.infoValue}>{product.warranty}</Text>
        </View>
      </View>

      <View style={styles.quantityRow}>
        <Text style={styles.quantityLabel}>რაოდენობა</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
            onPress={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity <= 1}
            accessibilityLabel="რაოდენობის შემცირება"
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, quantity >= Math.min(product.stock, 10) && styles.quantityButtonDisabled]}
            onPress={() => setQuantity((current) => Math.min(product.stock, 10, current + 1))}
            disabled={quantity >= Math.min(product.stock, 10)}
            accessibilityLabel="რაოდენობის გაზრდა"
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subtotal}>ჯამი: ₾{product.price * quantity}</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>კალათაში დამატება</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6F1' },
  content: { padding: 20, paddingBottom: 32 },
  image: { width: '100%', aspectRatio: 1.1, borderRadius: 16, backgroundColor: '#E7ECE7', marginBottom: 18 },
  category: { color: '#52745C', fontFamily: 'Arial', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  title: { color: '#163D2D', fontFamily: 'Arial', fontSize: 26, fontWeight: '700', marginBottom: 8 },
  price: { fontFamily: 'Arial', fontSize: 24, fontWeight: '700', color: '#1D563B', marginBottom: 20 },
  sectionTitle: { color: '#20352A', fontFamily: 'Arial', fontSize: 17, fontWeight: '700', marginBottom: 8 },
  desc: { fontFamily: 'Arial', fontSize: 15, color: '#52665A', lineHeight: 23, marginBottom: 18 },
  infoCard: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E1E9E2', borderRadius: 12, paddingHorizontal: 14, marginBottom: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 13 },
  infoLabel: { color: '#718176', fontFamily: 'Arial', fontSize: 14 },
  infoValue: { color: '#20352A', fontFamily: 'Arial', fontSize: 14, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#E8EEE9' },
  quantityRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  quantityLabel: { color: '#20352A', fontFamily: 'Arial', fontSize: 15, fontWeight: '600' },
  quantityControls: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quantityButton: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#1D563B', alignItems: 'center', justifyContent: 'center' },
  quantityButtonDisabled: { backgroundColor: '#B8C6BA' },
  quantityButtonText: { color: '#FFFFFF', fontFamily: 'Arial', fontSize: 22, fontWeight: '600', lineHeight: 25 },
  quantityValue: { minWidth: 20, textAlign: 'center', color: '#20352A', fontFamily: 'Arial', fontSize: 17, fontWeight: '700' },
  subtotal: { color: '#163D2D', fontFamily: 'Arial', fontSize: 17, fontWeight: '700', marginBottom: 14 },
  button: { backgroundColor: '#1D563B', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontFamily: 'Arial', fontSize: 16, fontWeight: '700' },
});
