export interface ArrayOfDocsResponse {
  data: DocsData[];
}

export interface SingleDocResponse {
  data: DocsData;
}

export interface DocsData {
  id: string;
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
}
