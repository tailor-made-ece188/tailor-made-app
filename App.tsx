import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationStack from './navigation/NavigationStack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const tailorMadeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FE5F55',
    accent: '#fff'
  }
}

export default function App() {
  return (
    <PaperProvider theme={tailorMadeTheme}>
      <NavigationStack />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
