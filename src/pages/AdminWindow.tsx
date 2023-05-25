import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { AddAddress } from "../services/ValidatorRequests";
import BackUpDataBase from "../services/BackUpRequests";
import GetRegionsRequest from "../services/AddressesServiceRequest";
export function AdminWindow(){
    const navigate = useNavigate()
   
        async function backUpValidDataBase()
        {
           const response = await BackUpDataBase(true);
           console.log(response);
         
           if(response.status == 200)
           {
           const fileBlob = await response.blob();
           const fileURL = URL.createObjectURL(fileBlob);
   
           const downloadLink = document.createElement('a')
          
           downloadLink.href = fileURL;
           downloadLink.download = 'BackUpedDB.json'
   
           document.body.appendChild(downloadLink);
           downloadLink.click();
           downloadLink.remove();
        }else if(response.status == 401)
        {
          
            const exit = () => {
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("role")
                console.log(sessionStorage.getItem("access_token"))
                navigate("/")
            }
            exit();
        }
      
        }
    

    async function backUpTempDataBase()
        {
           const response = await BackUpDataBase(false);
           console.log(response);
           if(response.status == 200)
           {
           const fileBlob = await response.blob();
           const fileURL = URL.createObjectURL(fileBlob);
   
           const downloadLink = document.createElement('a')
          
           downloadLink.href = fileURL;
           downloadLink.download = 'BackUpedDB.json'
           
           document.body.appendChild(downloadLink);
           downloadLink.click();
           downloadLink.remove();
           
        }else if(response.status == 401)
        {
          
            const exit = () => {
                sessionStorage.removeItem("access_token");
                sessionStorage.removeItem("role")
                console.log(sessionStorage.getItem("access_token"))
                navigate("/")
            }
            exit();
        }
    }

    useEffect(()=>{
        async function regionsInit(){
            const data = await GetRegionsRequest();
            if(data.status == 401)
            {
                navigate("/")
                sessionStorage.removeItem("role")
            }
        }
        regionsInit();
    },[]);

    const exit = () => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("role")
        navigate("/")
    }
   
    function handleClick(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <div
                className="background_authorize"
            />
            <div className="window_authorize">
                <button className="btn_exit"
                        onClick={() => exit()}
                >
                    Выйти
                </button>
                <Link to="/search" className="link">
                    Поиск
                </Link>
                <Link to="/create_address" className="link">
                    Добавить адрес
                </Link>
                <Link to={"/create_user"} className="link">
                    Добавить пользователя
                </Link>
                <button
                    className="btn_backup"
                    onClick={() =>  backUpValidDataBase()}
                >
                    Backup отвалидированной базы данных
                </button>
                <button
                    className="btn_backup"
                    onClick={() => backUpTempDataBase()}
                >
                    Backup временной базы данных
                </button>
            </div>
        </>
    )
}