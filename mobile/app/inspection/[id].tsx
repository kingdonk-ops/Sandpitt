import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  inspectionsApi,
  InspectionItem,
  ItemResult,
} from "@/api/inspections";

const RESULT_OPTIONS: Array<{ label: string; value: ItemResult; color: string }> = [
  { label: "Pass", value: "pass", color: "#10B981" },
  { label: "Fail", value: "fail", color: "#EF4444" },
  { label: "N/A", value: "na", color: "#9CA3AF" },
];

function ItemRow({
  item,
  inspectionId,
}: {
  item: InspectionItem;
  inspectionId: string;
}) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (result: ItemResult) =>
      inspectionsApi.updateItem(inspectionId, item.id, { result }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspection", inspectionId] });
    },
  });

  return (
    <View style={styles.itemCard}>
      <Text style={styles.itemQuestion}>{item.question}</Text>
      <View style={styles.resultRow}>
        {RESULT_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            style={[
              styles.resultBtn,
              item.result === opt.value && { backgroundColor: opt.color },
            ]}
            onPress={() => updateMutation.mutate(opt.value)}
          >
            <Text
              style={[
                styles.resultBtnText,
                item.result === opt.value && { color: "#FFFFFF" },
              ]}
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {item.photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoRow}>
          {item.photos.map((photo) =>
            photo.presigned_url ? (
              <Image
                key={photo.id}
                source={{ uri: photo.presigned_url }}
                style={styles.thumbnail}
              />
            ) : null
          )}
        </ScrollView>
      )}
    </View>
  );
}

export default function InspectionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data: inspection, isLoading } = useQuery({
    queryKey: ["inspection", id],
    queryFn: () => inspectionsApi.get(id!),
    enabled: !!id,
  });

  const submitMutation = useMutation({
    mutationFn: () => inspectionsApi.submit(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspection", id] });
      queryClient.invalidateQueries({ queryKey: ["inspections"] });
      Alert.alert("Submitted", "Inspection submitted for review.");
    },
    onError: () => {
      Alert.alert("Error", "Failed to submit inspection.");
    },
  });

  const handleAddPhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission denied", "Camera permission is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false,
    });
    if (result.canceled || !result.assets[0]) return;

    const asset = result.assets[0];
    const filename = asset.uri.split("/").pop() ?? "photo.jpg";
    const type = asset.mimeType ?? "image/jpeg";

    setUploading(true);
    try {
      await inspectionsApi.uploadPhoto(id!, { uri: asset.uri, name: filename, type });
      queryClient.invalidateQueries({ queryKey: ["inspection", id] });
    } catch {
      Alert.alert("Error", "Failed to upload photo.");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading || !inspection) {
    return <ActivityIndicator style={styles.center} size="large" color="#2563EB" />;
  }

  const canSubmit = inspection.status === "in_progress";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{inspection.title}</Text>
        {inspection.reference_number && (
          <Text style={styles.ref}>Ref: {inspection.reference_number}</Text>
        )}
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {inspection.status.replace(/_/g, " ")}
          </Text>
        </View>
      </View>

      {/* Checklist */}
      <Text style={styles.sectionTitle}>
        Checklist ({inspection.items.length} items)
      </Text>
      {inspection.items.map((item) => (
        <ItemRow key={item.id} item={item} inspectionId={id!} />
      ))}

      {/* Photos */}
      <Text style={styles.sectionTitle}>
        Photos ({inspection.photos.length})
      </Text>
      <Pressable
        style={[styles.photoBtn, uploading && styles.photoBtnDisabled]}
        onPress={handleAddPhoto}
        disabled={uploading}
      >
        <Text style={styles.photoBtnText}>
          {uploading ? "Uploading…" : "📷  Capture Photo"}
        </Text>
      </Pressable>
      {inspection.photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoRow}>
          {inspection.photos.map((photo) =>
            photo.presigned_url ? (
              <Image
                key={photo.id}
                source={{ uri: photo.presigned_url }}
                style={styles.thumbnail}
              />
            ) : null
          )}
        </ScrollView>
      )}

      {/* Submit */}
      {canSubmit && (
        <Pressable
          style={styles.submitBtn}
          onPress={() => submitMutation.mutate()}
          disabled={submitMutation.isPending}
        >
          <Text style={styles.submitBtnText}>
            {submitMutation.isPending ? "Submitting…" : "Submit for Review"}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  content: { padding: 16, paddingBottom: 48 },
  center: { flex: 1, alignSelf: "center", marginTop: 60 },
  header: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "700", color: "#111827", marginBottom: 4 },
  ref: { fontSize: 13, color: "#6B7280" },
  statusBadge: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: "#2563EB",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: { color: "#FFFFFF", fontSize: 12, fontWeight: "600", textTransform: "capitalize" },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  itemQuestion: { fontSize: 14, color: "#111827", marginBottom: 10 },
  resultRow: { flexDirection: "row", gap: 8 },
  resultBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },
  resultBtnText: { fontSize: 13, fontWeight: "600", color: "#374151" },
  photoRow: { marginTop: 10 },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "#E5E7EB",
  },
  photoBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  photoBtnDisabled: { backgroundColor: "#93C5FD" },
  photoBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 15 },
  submitBtn: {
    backgroundColor: "#059669",
    borderRadius: 10,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  submitBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 16 },
});
