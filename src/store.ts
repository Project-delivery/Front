import { makeAutoObservable } from "mobx";
import AuthService from "./services/AuthServices";

export default class Store{
  
  name = "";
  isAuth = false;

  constructor()
  {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean){
    this.isAuth = bool;
  }

  setName(name: string){
    this.name = name;
  }
 

 async login(login:string, password:string)
 {
    try{
        const response = await AuthService.login(login, password);
        //след строка выводит ответ сервера без подключения ничегг не будет
       console.log(response);
       const data = await response.json();
        // если запрос прошел нормально
        if (response.ok === true) 
        {
          sessionStorage.setItem("auth", "true");
            sessionStorage.setItem("access_token", data.access_token);
            console.log(sessionStorage.getItem("access_token"));
            
        } else {
            // если произошла ошибка, из errorText получаем текст ошибки
            throw new Error(data.errorText)
        }
      


    }catch(e){
        //тут пока так но в гайде что я смотрел было console.log(e.response?.data?.message) но пока нету связи с контроллером будет так   
        console.log(e);
    }
 }

}