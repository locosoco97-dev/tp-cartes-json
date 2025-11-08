import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, TextInput, TouchableOpacity, Text, RefreshControl } from 'react-native';
import CardItem from './CardItem.js';
import cards from '../data/cards.json';

export function CardList({ isDarkMode }) {
  const [searchText, setSearchText] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Toutes' },
    { id: 'framework', name: 'Frameworks' },
    { id: 'tool', name: 'Outils' },
    { id: 'language', name: 'Langages' },
    { id: 'layout', name: 'Layout' },
    { id: 'navigation', name: 'Navigation' },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesFavorite = !showFavoritesOnly || favorites.includes(card.id);
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesFavorite && matchesCategory;
  });

  const toggleFavorite = (cardId) => {
    setFavorites(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const renderItem = ({ item }) => (
    <CardItem
      title={item.title}
      description={item.description}
      image={item.image}
      url={item.url}
      id={item.id}
      isFavorite={favorites.includes(item.id)}
      onToggleFavorite={toggleFavorite}
      isDarkMode={isDarkMode}
    />
  );

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TextInput
        style={[styles.searchBar, isDarkMode && styles.darkSearchBar]}
        placeholder="Rechercher une carte..."
        placeholderTextColor={isDarkMode ? '#999' : '#666'}
        value={searchText}
        onChangeText={setSearchText}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, showFavoritesOnly && styles.activeFilter, isDarkMode && styles.darkFilterButton]}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Text style={[styles.filterText, showFavoritesOnly && styles.activeFilterText, isDarkMode && styles.darkFilterText]}>
            {showFavoritesOnly ? 'Toutes les cartes' : `Favoris (${favorites.length})`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, selectedCategory === item.id && styles.activeCategory, isDarkMode && styles.darkCategoryButton]}
              onPress={() => setSelectedCategory(item.id)}
            >
              <Text style={[styles.categoryText, selectedCategory === item.id && styles.activeCategoryText, isDarkMode && styles.darkCategoryText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: {
    height: 40,
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  activeFilter: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activeFilterText: {
    color: '#fff',
  },
  categoryContainer: {
    marginBottom: 16,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activeCategoryText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  darkSearchBar: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
  },
  darkFilterButton: {
    backgroundColor: '#2a2a2a',
  },
  darkFilterText: {
    color: '#fff',
  },
  darkCategoryButton: {
    backgroundColor: '#2a2a2a',
  },
  darkCategoryText: {
    color: '#fff',
  },
});