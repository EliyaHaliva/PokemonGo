import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "./src/navigation/Navigation";
import { presistor, store } from "./src/redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={presistor}>
        <View style={styles.container}>
          <Router />
        </View>
      </PersistGate>
      <Toast />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    direction: "rtl",
    height: "100%",
  },
});
