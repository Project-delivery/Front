import { API_URL } from "../psevdoEnv";

export async function LoginUser(login:string, password:string):Promise<boolean> {
    
    const formData = new FormData();
    formData.append("name", login);
    formData.append("password", password);

    const response = await fetch(`${API_URL}/Account/Login` , {
        method: "POST",
        headers: {"Accept": "application/json"},
        body: formData,
        mode: "cors"
    });


    //console.log(response);
    const data = await response.json();
    // если запрос прошел нормально
    if (response.ok === true) 
    {
        console.log(data)
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("role", data.role);
        console.log(sessionStorage.getItem("access_token"));
        console.log("Role")
        console.log(sessionStorage.getItem("role"))
        return true;
    }else{
        sessionStorage.setItem("role", "notAuthorized");
        return false;
    }
}    

