import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import GetRegionsRequest from "../services/AddressesServiceRequest";
export function WorkerWindow(){

    const navigate = useNavigate()

    const exit = () => {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("role")
        navigate("/")
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
            </div>
        </>
    )
}