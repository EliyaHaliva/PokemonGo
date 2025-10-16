import {StyleSheet, View} from 'react-native';
import {Router} from "./src/components/Router";

export default function App() {
    return (
        <View style={styles.container}>
            <Router/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        direction: 'rtl',
        height: '100%',
    },
});
