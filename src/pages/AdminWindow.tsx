import React from "react";
import {Link} from "react-router-dom";
import BackUpValidDataBase from "../services/BackUpRequests";
export function AdminWindow(){

    const handleClick = () => {
        //здесь должен быть какой-то запрос
    }

    // function backUpValidDataBase
    //  {
    //     BackUpValidDataBase()

    //     const jsonData = JSON.stringify(data);
    //     const downloadLink = document.createElement('a')
    //     const fileBlob = new Blob([jsonData], {type:'application/json'})
    //     const fileURL = URL.createObjectURL(fileBlob);

    //     downloadLink.href = fileURL;
    //     downloadLink.download = 'data.json'

    //     document.body.appendChild(downloadLink);
    //     downloadLink.click();

    //     document.body.removeChild(downloadLink);
    //  })
    //  .catch(error=>{
    //     convertCompilerOptionsFromJson.log
    //  })
    // } 
    return (
        <>
            <div
                className="background_authorize"
            />
            <div className="window_authorize">
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
                    onClick={() => handleClick()}
                >
                    Backup отвалидированной базы данных
                </button>
                <button
                    className="btn_backup"
                    onClick={() => handleClick()}
                >
                    Backup временной базы данных
                </button>
            </div>
        </>
    )
}