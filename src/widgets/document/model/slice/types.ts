import { DocsData } from "@/shared/api";

export interface docsModalSliceTypes {
  open: boolean;
  formType: "create" | "delete" | "change";
  currentDocument?: DocsData;
}
