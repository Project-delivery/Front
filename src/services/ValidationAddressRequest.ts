import { API_URL } from "../psevdoEnv";


 async function ValidateAddressRequest(idStreet:number,  name:string, id:number): Promise<Response>
{
    const formData = new FormData();
    formData.append("Id_street", idStreet.toString());
    formData.append("Name", name);
    formData.append("Id", id.toString());
    console.log(formData);

        const response = await fetch(`${API_URL}/Validator/AddNewAdress` , {
            method: "POST",
            headers: {
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            body: formData,
            mode: "cors"
        });
        return response;
} 

export async function ValidateAddress(idStreet:number,  name:string, id:number)
{
    const response = await ValidateAddressRequest(idStreet, name, id);
    if(response.ok)
    {
        
    return true; 
    }else{
        
        alert(response.status)
        return false;
    }
}