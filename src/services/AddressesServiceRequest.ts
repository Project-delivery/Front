
export default async function GetRegionsRequest(): Promise<Response>
{
        const response = await fetch(`${process.env.API_URL}/Adress/GetRegions` , {
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
export async function AddressRequest(EndPoint:string, id?:number): Promise<Response>
{
    console.log(`${process.env.API_URL}`);
        const response = await fetch(`${process.env.API_URL+EndPoint}` , {
            method: "POST",
            mode: "cors",
            headers: {
            'Accept': 'application/json',//не помню мб можно убрать
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            body: JSON.stringify({id})
        });
        return response;
} 
export async function GetDistrictsByIdRequest(idRegion:number): Promise<Response>
{
        const response = await fetch(`${process.env.API_URL}/Adress/GetDistrictsById` , {
            method: "POST",
            mode: "cors",
            headers: {
            'Accept': 'application/json',//не помню мб можно убрать
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            body: JSON.stringify({idRegion})
        });
        return response;
} 
export async function GetCitiesByIdRequest(idDistrict:number): Promise<Response>
{
    const formData = new FormData();
    
    formData.append("Name", JSON.stringify(idDistrict));
    console.log(formData);
        const response = await fetch(`${process.env.API_URL}/Adress/GetStreetsById` , {
            method: "POST",
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
           // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            mode: "cors",
            body: formData
        });
        return response;
} 
export async function GetStreetsByIdRequest(idCity:number): Promise<Response>
{
        const response = await fetch(`${process.env.API_URL}/GetStreetsById` , {
            method: "POST",
            headers: {
            'Accept': 'application/json',//не помню мб можно убрать
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            mode: "cors",
            body: JSON.stringify({idCity})
        });
        return response;
} 
export async function GetHousesByIdRequest(idStreet:number): Promise<Response>
{
        const response = await fetch(`${process.env.API_URL}/GetHouseById` , {
            method: "POST",
            headers: {
            'Accept': 'application/json',//не помню мб можно убрать
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            mode: "cors",
            body: JSON.stringify({idStreet})
        });
        return response;
} 