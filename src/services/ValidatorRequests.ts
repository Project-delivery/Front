import { mainObj_typeAddress } from "../MainObject/mainObj_address";
import { validationResponse } from "../imports_for_output/requests_for_validator";
import { API_URL } from "../psevdoEnv";


export async function AddValidationRequest(region:string, district:string, city:string, street:string, house:string, street_id:number,is_valid:boolean, comment:string ): Promise<Response>
{
    
  const formData = new FormData();

  formData.append("region", region);
  formData.append("district", district);
  formData.append("city", city);
  formData.append("street", street);
  formData.append("house", house);
  formData.append("street_id", street_id.toString());
  formData.append("is_valid", is_valid.toString());
  formData.append("comment", comment);
        const response = await fetch(`${API_URL}/Account/Register` , {
          method: "POST",
          headers: {
            "Accept": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        },
          body: formData,
          mode: "cors"
        });
        return response;
} 

export async function GetAllTemporaryAdressesRequest(): Promise<Response>
{

    
        const response = await fetch(`${API_URL}/Validator/getAllTempAdresses` , {
          method: "GET",
          headers: {
            "Accept": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        },
          mode: "cors"
        });
        return response;
} 
export async function GetAllTemporaryAdresses():Promise<validationResponse[]>
{

    const response = await GetAllTemporaryAdressesRequest();
    if(response.ok)
    {
    let data:validationResponse[] = await response.json();
    
    console.log(data)
    return data; 
    }else{
        
        alert(response.status)
        return [];
    }

}


export function AddResponseToTemporaryAdresses(region:string, district:string, city:string, street:string, house:string, worker_id:number,is_valid:boolean, comment:string )
{

//     const response = await AddResponseToTemporaryAdressesRequest(region, district, city, street, house, worker_id,is_valid, comment);
//     if(response.ok)
//     {
//     let data = await response.json();
//     return data; 
//     }else{
        
//         alert(response.status)
//         return [];
//     }

}