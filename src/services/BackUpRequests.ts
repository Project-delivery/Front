import { API_URL } from "../psevdoEnv";


export default async function BackUpDataBase(valid:boolean): Promise<Response> {
  let response;
  if(valid === true)
  {
     response = await fetch(`${API_URL}/Backup/AdressBackup`, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json/blob',
  
        //'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
      },
      mode: "cors"
    });
  }else{
    response = await fetch(`${API_URL}/Backup/TempAdressBackup`, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
  
        //'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
      },
      mode: "cors"
    });
  }
  return response;

}

