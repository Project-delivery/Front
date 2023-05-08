export interface roleModel {
    id: number
    role: string
}
export const roles: roleModel[] = [{
    id: 1,
    role: "Admin"
}, {
    id: 2,
    role: "Worker"
}, {
    id: 3,
    role: "Validator"
}]