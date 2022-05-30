import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationStack from './navigation/NavigationStack';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PRIMARY_COLOR } from './styles';

const tailorMadeTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: PRIMARY_COLOR,
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
