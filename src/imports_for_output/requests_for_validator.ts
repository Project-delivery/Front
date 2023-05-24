export interface validationResponse{
    recordId:number
    idStreet: number
    region: string
    district: string
    city: string
    street: string
    house: string
    worker_id:number
    is_valid:boolean
    comment:string
}

// export let requests_for_validator : mainObj_typeValidator[] = [{
//     requestID: 4,
//     id: 0,
//     region: "abc",
//     district: "dasds",
//     city: "dsadsadasd",
//     street: "dsadasdsadsa",
//     house: "999"
// }, {
//     requestID: 432,
//     id: 1,
//     region: "fdsfdsfsdfsdfsd",
//     district: "fdsfsdvsdvs",
//     city: "fdsfsdsdsadsa",
//     street: "dadsadwqdqw",
//     house: "999"
// }, {
//     requestID: 123,
//     id: 2,
//     region: "fdsfsddas",
//     district: "fdsfdsdsadas",
//     city: "dsadDWQDQ",
//     street: "dsadsadsad",
//     house: "999"
// }, {
//     requestID: 32,
//     id: 3,
//     region: "gdsfdasfsdf",
//     district: "fdsfbscxxzc",
//     city: "dsadsaad",
//     street: "dsaffdsf",
//     house: "999"
// }, {
//     requestID: 42,
//     id: 4,
//     region: "fdsfdfdsfsd",
//     district: "gfsdfdfds",
//     city: "fdsfasd",
//     street: "sadsadsadsa",
//     house: "999"
// }]