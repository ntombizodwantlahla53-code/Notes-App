import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Button, Text, View, Pressable, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Dimensions, Alert, ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';
import Registration from '@/components/Registration';
import Login from '@/components/LoginClass';

export default function TabLayout() {
  return (
    <Registration/>
    // <Login/>
  );
}
