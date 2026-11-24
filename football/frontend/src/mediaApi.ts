export type MediaKind = "video" | "audio";

export interface MediaJobOptions {
  kind: MediaKind;
  file: File;
  language: "ko" | "en";
  transcription: boolean;
  dubbing: boolean;
  lipSync?: boolean;
}

export interface MediaJob {
  id: string;
  status: "queued" | "processing" | "complete" | "failed";
  progress: number;
  previewUrl?: string;
  downloadUrl?: string;
}

export const mediaApi = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",

  // FastAPI should keep the Perso AI key server-side and proxy these requests.
  async createJob(options: MediaJobOptions): Promise<MediaJob> {
    const form = new FormData();
    form.append("file", options.file);
    form.append("language", options.language);
    form.append("transcription", String(options.transcription));
    form.append("dubbing", String(options.dubbing));
    form.append("lip_sync", String(options.lipSync ?? false));

    const response = await fetch(`${this.baseUrl}/api/${options.kind}/jobs`, {
      method: "POST",
      body: form,
    });
    if (!response.ok) throw new Error("AI editing job could not be created.");
    return response.json() as Promise<MediaJob>;
  },

  async getJob(kind: MediaKind, id: string): Promise<MediaJob> {
    const response = await fetch(`${this.baseUrl}/api/${kind}/jobs/${id}`);
    if (!response.ok) throw new Error("AI editing job could not be loaded.");
    return response.json() as Promise<MediaJob>;
  },
};
