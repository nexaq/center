import {useQuery} from "@tanstack/react-query";
import {type DocumentListInterface, getDocumentList} from "~/api/application/getDocumentList";

export const useDocumentList = (id: number) => {
    return useQuery<DocumentListInterface>({
        queryKey: ['application-document-list', id],
        queryFn: async () => {
            return getDocumentList(id);
        }
    });
}