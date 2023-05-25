import { API_URL } from "../psevdoEnv";

export async function RegisterUserRequest(login:string, password:string, role:string, idDistrict:number ): Promise<Response>
{
  const formData = new FormData();

  formData.append("Login", login);
  formData.append("Password", password);
  formData.append("Role", role);
  formData.append("Adress", JSON.stringify(idDistrict));

        //console.log(formData);
        const response = await fetch(`${API_URL}/Account/Register` , {
          method: "POST",
          headers: {"Accept": "application/json",
          'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`},
          body: formData,
          mode: "cors"
        });
        return response;
} 
export async function RegisterUser(login:string, password:string, role:string, idDistrict:number)
{
        const response = await RegisterUserRequest(login, password, role, idDistrict);
        if(response.ok)
        {
          const data = await response.json()
          console.log(data);
          if(data == true)
          {
          alert(`User ${login} успешно создан`);
          }else{
            
          alert(`User ${login} не был создан`);
          }
  
        }else{
          alert(`Ошибка запроса`);
        }
} 