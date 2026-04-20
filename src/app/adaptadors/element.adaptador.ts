import { ElementApiResponse, ElementCataleg } from "../models/element.model";

export function adaptarElementApi(apiResponse: ElementApiResponse): ElementCataleg {
    return {
        id: apiResponse.id,
        titol: apiResponse.nom,
        descripcio: apiResponse.descripcio,
        categoria: apiResponse.categoria,
        preu: apiResponse.preu,
        imatgeUrl: apiResponse.imatge,
        esPopular: apiResponse.popular,
        unitats: apiResponse.stock,
    };
}

export function adaptarElementsApi(apiResponses: ElementApiResponse[]): ElementCataleg[] {
    return apiResponses.map(adaptarElementApi);
}

export function elementBuit(): ElementCataleg {
    return {
        id: '',
        titol: '',
        descripcio: '',
        categoria: '',
        preu: 0,
        imatgeUrl: 'https://via.placeholder.com/300x200?text=Sense+imatge',
        esPopular: false,
        unitats: 0,
    };
}