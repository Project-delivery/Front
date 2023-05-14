import React from "react";
import {Link} from "react-router-dom";
export function WorkerWindow(){

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
            </div>
        </>
    )
}