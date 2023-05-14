import React from "react";
import {Link} from "react-router-dom";
export function AdminWindow(){

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
            </div>
        </>
    )
}