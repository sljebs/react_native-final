import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ShoppingBasket01Icon } from '@hugeicons/core-free-icons';
import { AuthContext } from '../context/AuthContext';
import PRODUCTS from '../data/products';

function CartIcon() {
  return (
    <HugeiconsIcon icon={ShoppingBasket01Icon} size={24} color="#1D563B" strokeWidth={1.5} />
  );
}

export default function ProductsScreen({ navigation }) {
  const { addToCart } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>პროდუქტები</Text>
        <Text style={styles.subtitle}>შეარჩიე სასურველი ნივთი</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.navBtn}
            onPress={() => navigation.navigate('Camera')}
            accessibilityRole="button"
          >
            <Text style={styles.navBtnText} numberOfLines={1}>კამერა</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navBtn, styles.cartNavBtn]}
            onPress={() => navigation.navigate('Cart')}
            accessibilityRole="button"
          >
            <Text style={styles.navBtnText} numberOfLines={1}>კალათა</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.productDetails}
              onPress={() => navigation.navigate('Details', { product: item })}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel={`${item.name}, ფასი ${item.price} ლარი, დეტალების ნახვა`}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="cover" />
                <View style={styles.categoryBadge}>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.purchaseContent}>
              <View style={styles.stockRow}>
                <View style={styles.stockDot} />
                <Text style={styles.stock}>მარაგშია · {item.stock} ცალი</Text>
              </View>
              <View style={styles.purchaseRow}>
                <Text style={styles.productPrice}>₾{item.price}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`${item.name} კალათაში დამატება`}
                >
                  <CartIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 18, backgroundColor: '#F3F6F1' },
  header: { marginBottom: 18 },
  headerTitle: { color: '#163D2D', fontFamily: 'Arial', fontSize: 26, fontWeight: '700' },
  subtitle: { color: '#718176', fontFamily: 'Arial', fontSize: 14, marginTop: 5 },
  actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 14 },
  navBtn: { minWidth: 112, minHeight: 48, backgroundColor: '#1D563B', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cartNavBtn: { backgroundColor: '#1D563B' },
  navBtnText: { color: '#FFFFFF', fontFamily: 'Arial', fontSize: 15, lineHeight: 21, fontWeight: '700', textAlign: 'center', includeFontPadding: false, flexShrink: 0 },
  listContent: { paddingBottom: 24 },
  productRow: { gap: 12 },
  card: { flex: 1, marginBottom: 14, backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E5ECE5', overflow: 'hidden', elevation: 3, shadowColor: '#163D2D', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 8 },
  productDetails: { flex: 1 },
  imageContainer: { width: '100%', aspectRatio: 1.08, backgroundColor: '#EAF0EA' },
  productImage: { width: '100%', height: '100%' },
  categoryBadge: { position: 'absolute', left: 9, top: 9, maxWidth: '90%', backgroundColor: 'rgba(255,255,255,0.94)', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 20 },
  category: { color: '#b2b6b3', fontFamily: 'Arial', fontSize: 10, fontWeight: '700' },
  cardContent: { paddingHorizontal: 12, paddingTop: 11, paddingBottom: 2 },
  productName: { color: '#20352A', fontFamily: 'Arial', fontSize: 14, fontWeight: '700', lineHeight: 19, minHeight: 38 },
  purchaseContent: { paddingHorizontal: 12, paddingBottom: 12, paddingTop: 7 },
  stockRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  stockDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4D9462', marginRight: 6 },
  purchaseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { color: '#163D2D', fontFamily: 'Arial', fontSize: 19, fontWeight: '700', letterSpacing: 0.2 },
  stock: { color: '#718176', fontFamily: 'Arial', fontSize: 11, fontWeight: '500' },
  addButton: { width: 40, height: 38, backgroundColor: '#EAF1EB', borderWidth: 1, borderColor: '#D5E0D7', alignItems: 'center', justifyContent: 'center', marginLeft: 6, borderRadius: 12 },
});