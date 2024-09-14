import { DocsData } from "@/shared/api";

export interface DocsSliceTypes {
  docs: DocsData[];
  isLoading: boolean;
  error: string;
}
