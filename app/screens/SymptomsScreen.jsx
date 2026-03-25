import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SymptomsScreen({ navigation }) {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyseSymptoms = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.EXPO_PUBLIC_CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 500,
          messages: [
            {
              role: "user",
              content: `You are a medical assistant. A patient has these symptoms: "${symptoms}". 
            Reply in this exact JSON format only:
            {
              "condition": "most likely condition",
              "specialist": "type of doctor to see",
              "urgency": "low/medium/high",
              "hospital_type": "type of hospital needed",
              "advice": "one line of basic advice"
            }`,
            },
          ],
        }),
      });

      const data = await response.json();
      const text = data.content[0].text;
      const parsed = JSON.parse(text);
      setResult(parsed);
    } catch (error) {
      setResult({ error: "Could not analyse symptoms. Please try again." });
    }
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>What are your symptoms?</Text>
      <Text style={styles.subtitle}>Describe how you are feeling</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. fever, headache, body pain..."
        placeholderTextColor="#999"
        value={symptoms}
        onChangeText={setSymptoms}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        style={[styles.button, !symptoms.trim() && styles.buttonDisabled]}
        onPress={analyseSymptoms}
        disabled={!symptoms.trim() || loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Analysing..." : "Analyse Symptoms →"}
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          color="#1a7a4a"
          style={{ marginTop: 20 }}
        />
      )}

      {result && !result.error && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>AI Analysis Result</Text>

          <View style={styles.resultRow}>
            <Text style={styles.label}>🩺 Possible Condition</Text>
            <Text style={styles.value}>{result.condition}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.label}>👨‍⚕️ See a</Text>
            <Text style={styles.value}>{result.specialist}</Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.label}>⚠️ Urgency</Text>
            <Text
              style={[
                styles.value,
                result.urgency === "high" && { color: "#e53e3e" },
                result.urgency === "medium" && { color: "#dd6b20" },
                result.urgency === "low" && { color: "#1a7a4a" },
              ]}
            >
              {result.urgency?.toUpperCase()}
            </Text>
          </View>

          <View style={styles.resultRow}>
            <Text style={styles.label}>🏥 Hospital Type</Text>
            <Text style={styles.value}>{result.hospital_type}</Text>
          </View>

          <View style={styles.adviceBox}>
            <Text style={styles.adviceText}>💡 {result.advice}</Text>
          </View>

          <TouchableOpacity
            style={styles.findButton}
            onPress={() =>
              navigation.navigate("screens/HospitalListScreen", {
                specialist: result.specialist,
                hospital_type: result.hospital_type,
              })
            }
          >
            <Text style={styles.findButtonText}>Find Hospitals Near Me →</Text>
          </TouchableOpacity>
        </View>
      )}

      {result?.error && <Text style={styles.errorText}>{result.error}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#f0fff4", padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a7a4a",
    marginBottom: 6,
  },
  subtitle: { fontSize: 14, color: "#666", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#c6f6d5",
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#1a7a4a",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#a0aec0" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  resultCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#c6f6d5",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a7a4a",
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0fff4",
  },
  label: { fontSize: 14, color: "#666", flex: 1 },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    flex: 1,
    textAlign: "right",
  },
  adviceBox: {
    backgroundColor: "#f0fff4",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  adviceText: { fontSize: 13, color: "#2d6a4f", lineHeight: 20 },
  findButton: {
    backgroundColor: "#1a7a4a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  findButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
  errorText: { color: "#e53e3e", textAlign: "center", marginTop: 20 },
});
