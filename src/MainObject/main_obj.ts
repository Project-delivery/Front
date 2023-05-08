export type mainObj_type = {
    id: number
    role: string
    region: string
    district: string
    login: string
    password: string
}

// Финальнйы объект который запросом должен передаваться на бэк
export const mainObject: mainObj_type = {
    id: 0,
    role: "",
    region: "",
    district: "",
    login: "",
    password: ""
}