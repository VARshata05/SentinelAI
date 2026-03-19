import { StyleSheet, Text, View } from "react-native";

export default function SymptomsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Symptoms</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fff4",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a7a4a" },
});
