import { API_URL } from "../psevdoEnv";


export default async function CreateAddressRequest(): Promise<Response>
{
        const response = await fetch(`${API_URL}/Validator/AddNewAdress` , {
            method: "POST",
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            mode: "cors"
        });
        return response;
} 

export async function CreateAddress(idStreet:number,  name:string, id:number)
{
    // const response = await GetStreetsByIdRequest(idCity);
    // if(response.ok)
    // {
    // let data:streetModel[] = await response.json();
    // return data; 
    // }else{
        
    //     alert(response.status)
    //     return [];
    // }

}