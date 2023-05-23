import React from "react";
import {Link} from "react-router-dom";
export function AdminWindow(){

    const handleClick = () => {
        //здесь должен быть какой-то запрос
    }

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
                    Backup базы данных
                </button>
                <button
                    className="btn_backup"
                    onClick={() => handleClick()}
                >
                    Backup базы данных
                </button>
            </div>
        </>
    )
}