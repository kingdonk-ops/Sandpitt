import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { inspectionsApi, InspectionStatus } from "@/api/inspections";

const STATUS_FILTERS: Array<{ label: string; value: InspectionStatus | undefined }> = [
  { label: "All", value: undefined },
  { label: "Scheduled", value: "scheduled" },
  { label: "In Progress", value: "in_progress" },
  { label: "Pending Review", value: "pending_review" },
  { label: "Completed", value: "completed" },
];

const STATUS_COLORS: Record<InspectionStatus, string> = {
  scheduled: "#3B82F6",
  in_progress: "#F59E0B",
  pending_review: "#8B5CF6",
  completed: "#10B981",
  cancelled: "#EF4444",
};

export default function InspectionsScreen() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<InspectionStatus | undefined>(undefined);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["inspections", selectedStatus],
    queryFn: () => inspectionsApi.list({ status: selectedStatus }),
  });

  return (
    <View style={styles.container}>
      {/* Status filter chips */}
      <View style={styles.filterRow}>
        {STATUS_FILTERS.map((f) => (
          <Pressable
            key={f.label}
            style={[
              styles.chip,
              selectedStatus === f.value && styles.chipActive,
            ]}
            onPress={() => setSelectedStatus(f.value)}
          >
            <Text
              style={[
                styles.chipText,
                selectedStatus === f.value && styles.chipTextActive,
              ]}
            >
              {f.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.center} size="large" color="#2563EB" />
      ) : error ? (
        <Text style={styles.errorText}>Failed to load inspections.</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          onRefresh={refetch}
          refreshing={isLoading}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/inspection/${item.id}`)}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: STATUS_COLORS[item.status] },
                  ]}
                >
                  <Text style={styles.badgeText}>
                    {item.status.replace("_", " ")}
                  </Text>
                </View>
              </View>
              {item.reference_number && (
                <Text style={styles.cardMeta}>Ref: {item.reference_number}</Text>
              )}
              {item.scheduled_at && (
                <Text style={styles.cardMeta}>
                  Scheduled: {new Date(item.scheduled_at).toLocaleDateString()}
                </Text>
              )}
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No inspections found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  center: { flex: 1, alignSelf: "center", marginTop: 40 },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  chipActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  chipText: { fontSize: 13, color: "#374151" },
  chipTextActive: { color: "#FFFFFF", fontWeight: "600" },
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
    marginBottom: 6,
  },
  cardTitle: { fontSize: 15, fontWeight: "600", color: "#111827", flex: 1, marginRight: 8 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: { fontSize: 11, color: "#FFFFFF", fontWeight: "600", textTransform: "capitalize" },
  cardMeta: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  errorText: { textAlign: "center", marginTop: 40, color: "#EF4444" },
  emptyText: { textAlign: "center", marginTop: 40, color: "#9CA3AF" },
});
