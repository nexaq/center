import axios from "axios";
import type {LotModel} from "~/api/lot/types";

export const main = axios.create({
    baseURL: 'http://localhost:3000',
});


export const getLot = async (urlCode: string) => {
    const { data } = await main.post<LotModel>(`lot/${urlCode}/no-cache`, {
        key: `MlLdr%PN(>=Ev2\'.9+3in^X=[])~l67"]<MM.Am[\'&{}e@*R\`><hKtYZ[rwIw0$`
    });

    return data;
}