/**
 * Typed API calls for the inspections resource.
 */
import apiClient from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type InspectionStatus =
  | "scheduled"
  | "in_progress"
  | "pending_review"
  | "completed"
  | "cancelled";

export type ItemResult = "pass" | "fail" | "na" | "pending";

export interface InspectionListItem {
  id: string;
  title: string;
  reference_number: string | null;
  status: InspectionStatus;
  site_id: string;
  asset_id: string | null;
  inspector_id: string | null;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface InspectionPhoto {
  id: string;
  inspection_id: string;
  item_id: string | null;
  storage_key: string;
  original_filename: string | null;
  content_type: string;
  file_size_bytes: number | null;
  caption: string | null;
  presigned_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface InspectionItem {
  id: string;
  inspection_id: string;
  order_index: number;
  question: string;
  result: ItemResult;
  notes: string | null;
  photos: InspectionPhoto[];
  created_at: string;
  updated_at: string;
}

export interface Inspection extends InspectionListItem {
  notes: string | null;
  started_at: string | null;
  submitted_at: string | null;
  completed_at: string | null;
  items: InspectionItem[];
  photos: InspectionPhoto[];
}

export interface CreateInspectionPayload {
  title: string;
  site_id: string;
  asset_id?: string;
  inspector_id?: string;
  scheduled_at?: string;
  notes?: string;
  items?: Array<{ question: string; order_index?: number }>;
}

export interface UpdateItemPayload {
  result?: ItemResult;
  notes?: string;
}

// ---------------------------------------------------------------------------
// API calls
// ---------------------------------------------------------------------------

export const inspectionsApi = {
  list: async (params?: {
    status?: InspectionStatus;
    site_id?: string;
    limit?: number;
    offset?: number;
  }): Promise<InspectionListItem[]> => {
    const { data } = await apiClient.get<InspectionListItem[]>("/inspections", { params });
    return data;
  },

  get: async (id: string): Promise<Inspection> => {
    const { data } = await apiClient.get<Inspection>(`/inspections/${id}`);
    return data;
  },

  create: async (payload: CreateInspectionPayload): Promise<Inspection> => {
    const { data } = await apiClient.post<Inspection>("/inspections", payload);
    return data;
  },

  submit: async (id: string, notes?: string): Promise<Inspection> => {
    const { data } = await apiClient.post<Inspection>(`/inspections/${id}/submit`, { notes });
    return data;
  },

  updateItem: async (
    inspectionId: string,
    itemId: string,
    payload: UpdateItemPayload
  ): Promise<InspectionItem> => {
    const { data } = await apiClient.patch<InspectionItem>(
      `/inspections/${inspectionId}/items/${itemId}`,
      payload
    );
    return data;
  },

  uploadPhoto: async (
    inspectionId: string,
    file: {
      uri: string;
      name: string;
      type: string;
    },
    itemId?: string,
    caption?: string
  ): Promise<InspectionPhoto> => {
    const formData = new FormData();
    formData.append("inspection_id", inspectionId);
    if (itemId) formData.append("item_id", itemId);
    if (caption) formData.append("caption", caption);
    // React Native FormData accepts { uri, name, type }
    formData.append("file", file as unknown as Blob);

    const { data } = await apiClient.post<InspectionPhoto>("/photos/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};
