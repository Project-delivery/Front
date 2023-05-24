import React, {useState} from 'react'
import {banSymbols} from "./checkValid";
import {userModel} from "../MainObject/UserDescription";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import { HashPassword } from '../services/PasswordHashing';
import Login from './login/login';
import { LoginUser } from '../services/AuthServices';


// Объект, хранящий в себе валидные логин и пароль пользователя
let user: userModel = {
    login: '',
    password: ''
}

//Окно авторизации
//При нажатии кнопки "Next" указанные логин и пароль передаются объекту users
//Ввод проверяется на наличие символов, пустая строка спровоцирует ошибку
export function ModalAuth(): JSX.Element{
    const onSubmit = async (login: string, password: string, event: any) => {
        event.preventDefault()
        user.login = login
        user.password = password
        console.log('Login: ')
        console.log(user.login)
        console.log('Password: ')
        console.log(user.password)
        console.log(HashPassword(user.password))
         
        if(await LoginUser(user.login, HashPassword(user.password)))
        {
         if(sessionStorage.getItem("role") == "admin"){
            { 
                navigate("/admin_window")
            }
         }else if(sessionStorage.getItem("role") == "worker"){
           {    
             navigate("/worker_window")
            }
         }else if(sessionStorage.getItem("role") == "validator"){
            { 
                navigate("/validator_window")
            }
         }else if(sessionStorage.getItem("role") == "notAuthorized"){
            alert("Авторизация провалилась. Попробуйте снова или обратитесь к администратору.")
         }
        }
    }

    const [login, setLogin] = useState('')

    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const checkValidLogin = (Login: string) => {
        if(banSymbols(Login)){
            return banSymbols(Login)
        }
        else {
            return true
        }
    }

    const checkValidPassword = (Password: string) => {
        if(banSymbols(Password)){
            return banSymbols(Password)
        }
        else {
            return true
        }
    }

    const [eyeChecked, setEyeChecked] = useState(false)

    const eyeHandler = () => {
        setEyeChecked(prev => !prev)
    }

    const resetEye = (input: string) => {
        if(input.length == 0){
            setEyeChecked(false)
        }
    }

    return (
        <form>
            <div
                className="background_authorize"
            />
                <div
                    className="window_authorize"
                >
                    <h1 className="title_authorize">Войти</h1>
                    <label className="label_authorize">
                        Логин
                        <input
                            type="text"
                            className="input_authorize"
                            placeholder="Введите логин..."
                            onChange={(event) => setLogin(event.target.value)}
                        />
                    </label>
                    <div
                        className="error_authorize"
                    >
                        {checkValidLogin(login)}
                    </div>
                    <label className="label_authorize">
                        Пароль
                        <input
                            type={eyeChecked ? "text" : "password"}
                            className="input_authorize"
                            placeholder="Введите пароль..."
                            onChange={(event) => {
                                setPassword(event.target.value)
                                resetEye(event.target.value)
                            }}
                        />
                        {password &&
                            <FontAwesomeIcon style={{color: eyeChecked ? "black" : "gray"}} className="eye" icon={faEye} onClick={() => eyeHandler()}/>
                        }
                        </label>
                    <div
                        className="error_authorize"
                    >
                        {checkValidPassword(password)}
                    </div>
                    <button
                        className="button_submit"
                        style={{width: 100, marginLeft: 201}}
                        onClick={(event) => onSubmit(login, password, event)}
                    >
                        Подтвердить
                    </button>
                </div>
        </form>
    )
}