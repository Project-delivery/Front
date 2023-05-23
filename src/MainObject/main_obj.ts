export type mainObj_typeCreate = {
    id: number,
    region: string,
    idRegion: number,
    district: string,
    idDistrict: number,
    login: string
    password: string
    role: string
}

// Финальнйы объект который запросом должен передаваться на бэк
export const mainObject: mainObj_typeCreate = {
    id: 0,
    region: "",
    idRegion: 0,
    district: "",
    idDistrict: 0,
    login: "",
    password: "",
       role: ""
}