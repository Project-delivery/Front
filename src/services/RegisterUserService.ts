
export async function RegisterUserRequest(login:string, password:string, role:string, idDistrict:number ): Promise<Response>
{
  const formData = new FormData();

  formData.append("Login", login);
  formData.append("Password", password);
  formData.append("Role", role);
  formData.append("District", JSON.stringify(idDistrict));

        //console.log(formData);
        const response = await fetch(`${process.env.API_URL}/Account/Register` , {
            method: "POST",
            headers: { 
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',//не помню мб можно убрать
          //'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
            },
            mode: "cors",
            body:formData
        });
        return response;
} 
export async function RegisterUser(login:string, password:string, role:string, idDistrict:number)
{
        const response = await RegisterUserRequest(login, password, role, idDistrict);
        if(response.ok)
        {
          alert(`User ${login} успешно создан`);
  
        }else{
          alert(`User ${login} не был создан`);
        }
} 