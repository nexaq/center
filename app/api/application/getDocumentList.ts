import {userApi} from "~/api/config";

export interface DocumentListInterface {
    "applicationAgent"?: string | null,
    "applicationPrincipal"?: string | null,
    "applicationPayment"?: string | null,
    "applicationProtocol"?: string | null
}

export const getDocumentList = async (applicationId: number) => {
    const { data } = await userApi.get<DocumentListInterface>(`/center-document/${applicationId}/application`);

    return data;
}