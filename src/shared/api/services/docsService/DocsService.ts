import { AxiosResponse } from "axios";
import client from "../../client";
import { DocsData, DocsResponseTypes } from "./types";

export default class DocsService {
  static async getDocs(): Promise<AxiosResponse<DocsResponseTypes>> {
    return client.get<DocsResponseTypes>(
      `/ru/data/v3/testmethods/docs/userdocs/get`,
    );
  }

  static async createDocs(
    document: DocsData,
  ): Promise<AxiosResponse<DocsResponseTypes>> {
    return client.post<DocsResponseTypes>(
      `/ru/data/v3/testmethods/docs/userdocs/create`,
      document,
    );
  }

  static async deleteDocs(
    id: string,
  ): Promise<AxiosResponse<DocsResponseTypes>> {
    return client.post<DocsResponseTypes>(
      `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
    );
  }

  static async changeDocs(
    document: DocsData,
  ): Promise<AxiosResponse<DocsResponseTypes>> {
    return client.post<DocsResponseTypes>(
      `/ru/data/v3/testmethods/docs/userdocs/set/${document.id}`,
      document,
    );
  }
}
