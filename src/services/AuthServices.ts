
export async function Login(login:string, password:string) {
    
    const formData = new FormData();
    formData.append("name", login);
    formData.append("password", password);

    const response = await fetch(`${process.env.API_URL}/Account/Login` , {
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
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("role", data.role);
        console.log(sessionStorage.getItem("access_token"));
    }else{
        sessionStorage.setItem("role", "notAuthorized");
    }
}    

