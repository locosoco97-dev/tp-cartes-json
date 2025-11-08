import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Linking, Alert, Animated, Share } from 'react-native';

export default function CardItem({ title, description, image, url, id, isFavorite, onToggleFavorite, isDarkMode }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Découvrez ${title}: ${description}\nEn savoir plus: ${url}`,
        title: title,
      });
      if (result.action === Share.sharedAction) {
        // Partage réussi
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de partager cette carte");
    }
  };

  const handlePress = async () => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erreur", "Impossible d'ouvrir cette URL : " + url);
      }
    } catch (error) {
      Alert.alert("Erreur", error.message);
    }
  };

  return (
    <Animated.View style={[styles.card, isDarkMode && styles.darkCard, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Image source={{ uri: image }} style={styles.cover} />
        <Pressable style={[styles.favoriteButton, isDarkMode && styles.darkFavoriteButton]} onPress={() => onToggleFavorite && onToggleFavorite(id)}>
          <Text style={[styles.favoriteText, isFavorite && styles.favoriteActive]}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>{title}</Text>
        <Text style={[styles.desc, isDarkMode && styles.darkDesc]}>{description}</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>En savoir plus</Text>
          </Pressable>
          <Pressable style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.buttonText}>Partager</Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
  },
  header: {
    position: 'relative',
  },
  cover: { width: '100%', height: 150 },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteText: {
    fontSize: 20,
  },
  favoriteActive: {
    transform: [{ scale: 1.2 }],
  },
  darkCard: {
    backgroundColor: '#2a2a2a',
  },
  darkFavoriteButton: {
    backgroundColor: 'rgba(42, 42, 42, 0.9)',
  },
  darkTitle: {
    color: '#fff',
  },
  darkDesc: {
    color: '#ccc',
  },
  body: { padding: 12 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  desc: { color: '#555', marginBottom: 12 },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  shareButton: {
    backgroundColor: '#34C759',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});