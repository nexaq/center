import axios from "axios";
import type {LotModel} from "~/api/lot/types";

export const main = axios.create({
    baseURL: 'http://localhost:3000',
});


export const getLot = async (urlCode: string) => {
    const { data } = await main.get<LotModel>(`lot/${urlCode}`);

    return data;
}