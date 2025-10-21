import {StyleSheet, View} from 'react-native';
import {Router} from "./src/Router/Router";
import {Provider} from "react-redux";
import {store} from "./src/redux/store/store";
import Toast from "react-native-toast-message";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Router/>
            </View>
            <Toast/>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
    },
});
