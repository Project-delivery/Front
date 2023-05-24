import { API_URL } from "../psevdoEnv";


export default async function GetRegionsRequest(): Promise<Response>
{
        const response = await fetch(`${API_URL}/Adress/GetRegions` , {
            method: "GET",
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

export async function GetDistrictsByIdRequest(idRegion:number): Promise<Response>
{
    const formData = new FormData();
    formData.append("Name", JSON.stringify(idRegion));
    console.log(formData);
        const response = await fetch(`${API_URL}/Adress/GetDistrictsById` , {
            method: "POST",
            headers: { 'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            body: formData,
            mode: "cors"
          
        });
        return response;
} 
export async function GetCitiesByIdRequest(idDistrict:number): Promise<Response>
{
    const formData = new FormData();
    formData.append("Name", JSON.stringify(idDistrict));
    console.log(formData);
        const response = await fetch(`${API_URL}/Adress/GetCitiesById` , {
            method: "POST",
            headers: { 'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            body: formData,
            mode: "cors"
        });
        return response;
} 
export async function GetStreetsByIdRequest(idCity:number): Promise<Response>
{
    const formData = new FormData();
    formData.append("Name", JSON.stringify(idCity));
    console.log(formData);
        const response = await fetch(`${API_URL}/Adress/GetStreetsById` , {
            method: "POST",
            headers: { 'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            body: formData,
            mode: "cors"
        });
        return response;
} 
export async function GetHousesByIdRequest(idStreet:number): Promise<Response>
{
    const formData = new FormData();
    formData.append("Name", JSON.stringify(idStreet));
    console.log(formData);
        const response = await fetch(`${API_URL}/Adress/GetHouseById` , {
            method: "POST",
            headers: { 'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
            body: formData,
            mode: "cors"
        });
        return response;
} 