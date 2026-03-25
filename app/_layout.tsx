import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1a7a4a" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "AyuSutra 🏥" }} />
      <Stack.Screen
        name="screens/SymptomsScreen"
        options={{ title: "Symptoms" }}
      />
      <Stack.Screen
        name="screens/HospitalListScreen"
        options={{ title: "Hospitals" }}
      />
      <Stack.Screen name="screens/MapScreen" options={{ title: "Map" }} />
    </Stack>
  );
}
