export interface roleModel {
    id: number
    role: string
}
export const roles: roleModel[] = [{
    id: 1,
    role: "admin"
}, {
    id: 2,
    role: "worker"
}, {
    id: 3,
    role: "validator"
}]