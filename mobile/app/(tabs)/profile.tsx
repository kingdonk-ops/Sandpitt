import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👷</Text>
        </View>
        <Text style={styles.name}>Inspector</Text>
        <Text style={styles.status}>
          {isAuthenticated ? "Authenticated" : "Not authenticated"}
        </Text>
      </View>

      <View style={styles.section}>
        <Pressable style={styles.menuItem} onPress={handleLogout}>
          <Text style={styles.menuItemText}>🚪  Log out</Text>
        </Pressable>
      </View>

      <Text style={styles.version}>Sandpitt Inspector v1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6", padding: 24 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 36 },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  status: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemText: { fontSize: 15, color: "#111827" },
  version: { textAlign: "center", fontSize: 12, color: "#9CA3AF" },
});
