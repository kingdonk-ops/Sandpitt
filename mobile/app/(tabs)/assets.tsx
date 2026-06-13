import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/api/client";

interface Asset {
  id: string;
  name: string;
  asset_code: string | null;
  asset_type: string | null;
  site_id: string;
  is_active: boolean;
}

async function fetchAssets(): Promise<Asset[]> {
  const { data } = await apiClient.get<Asset[]>("/assets");
  return data;
}

export default function AssetsScreen() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.center} size="large" color="#2563EB" />
      ) : error ? (
        <Text style={styles.errorText}>Failed to load assets.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          onRefresh={refetch}
          refreshing={isLoading}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                {!item.is_active && (
                  <View style={styles.inactiveBadge}>
                    <Text style={styles.inactiveBadgeText}>Inactive</Text>
                  </View>
                )}
              </View>
              {item.asset_code && (
                <Text style={styles.meta}>Code: {item.asset_code}</Text>
              )}
              {item.asset_type && (
                <Text style={styles.meta}>Type: {item.asset_type}</Text>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No assets found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  center: { flex: 1, alignSelf: "center", marginTop: 40 },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#111827", flex: 1 },
  meta: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  inactiveBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: "#E5E7EB",
  },
  inactiveBadgeText: { fontSize: 11, color: "#6B7280" },
  errorText: { textAlign: "center", marginTop: 40, color: "#EF4444" },
  emptyText: { textAlign: "center", marginTop: 40, color: "#9CA3AF" },
});
