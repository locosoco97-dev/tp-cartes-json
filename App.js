import React, { useState } from 'react';
import { View, StatusBar, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CardList } from './components/CardList.js';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <View style={[styles.screen, isDarkMode && styles.darkScreen]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Catalogue des Cartes</Text>
        <TouchableOpacity style={[styles.themeButton, isDarkMode && styles.darkThemeButton]} onPress={toggleTheme}>
          <Text style={styles.themeText}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>
      <CardList isDarkMode={isDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f7fb' },
  darkScreen: { backgroundColor: '#1a1a1a' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkHeader: {
    backgroundColor: '#2a2a2a',
    borderBottomColor: '#444',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  darkTitle: {
    color: '#fff',
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  darkThemeButton: {
    backgroundColor: '#2a2a2a',
  },
  themeText: {
    fontSize: 18,
  },
});