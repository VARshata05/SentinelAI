import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🏥 AyuSutra</Text>
      <Text style={styles.tagline}>Find the right hospital, fast.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/SymptomsScreen")}
      >
        <Text style={styles.buttonText}>Check Symptoms →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fff4",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: { fontSize: 36, fontWeight: "bold", color: "#1a7a4a", marginBottom: 8 },
  tagline: { fontSize: 16, color: "#555", marginBottom: 40 },
  button: {
    backgroundColor: "#1a7a4a",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
