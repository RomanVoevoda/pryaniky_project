import { AxiosResponse } from "axios";
import client from "../../client";
import { ArrayOfDocsResponse, DocsData, SingleDocResponse } from "./types";

export default class DocsService {
  static async getDocs(): Promise<AxiosResponse<ArrayOfDocsResponse>> {
    return client.get<ArrayOfDocsResponse>(
      `/ru/data/v3/testmethods/docs/userdocs/get`,
    );
  }

  static async createDoc(
    document: DocsData,
  ): Promise<AxiosResponse<SingleDocResponse>> {
    return client.post<SingleDocResponse>(
      `/ru/data/v3/testmethods/docs/userdocs/create`,
      document,
    );
  }

  static async deleteDoc(
    id: string,
  ): Promise<AxiosResponse>{
    return client.post(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    );
  }

  static async changeDoc(
    document: DocsData,
  ): Promise<AxiosResponse<SingleDocResponse>> {
    return client.post<SingleDocResponse>(
      `/ru/data/v3/testmethods/docs/userdocs/set/${document.id}`,
      document,
    );
  }
}
