export type mainObj_typeCreate = {
    id: number
    role: string
    region: string
    district: string
    login: string
    password: string
}

// Финальнйы объект который запросом должен передаваться на бэк
export const mainObject: mainObj_typeCreate = {
    id: 0,
    role: "",
    region: "",
    district: "",
    login: "",
    password: ""
}