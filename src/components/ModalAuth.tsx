import React from 'react'
import {useForm} from "react-hook-form";
import {banSymbols} from "./checkValid";
import {userModel} from "../MainObject/UserDescription";
import {Link} from "react-router-dom";

// Объект, хранящий в себе валидные логин и пароль пользователя
let user: userModel = {
    login: '',
    password: ''
}

//Окно авторизации
//При нажатии кнопки "Next" указанные логин и пароль передаются объекту users
//Ввод проверяется на наличие символов, пустая строка спровоцирует ошибку
export function ModalAuth(){

    const {
        register,
        formState:{errors, isValid},
        handleSubmit,
        reset
    } = useForm<userModel>({
        mode: "onBlur"
    })
    const onSubmit = (data: userModel) => {
        alert(JSON.stringify(data))
        user = data
        reset()
        console.log('Login: ')
        console.log(user.login)
        console.log('Password: ')
        console.log(user.password)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div
                className="background_authorize"
            />
                <div
                    className="window_authorize"
                >
                    <h1 className="title_authorize">Sign in</h1>
                    <label className="label_authorize">
                        Логин
                        <input
                            {...register('login', {
                                required: "Поле не должно быть пустым",
                                maxLength: {
                                    value: 20,
                                    message: "Логин не должен включать больше 20 символов"
                                },
                                minLength: {
                                    value: 5,
                                    message: "Логин не должен включать меньше 5 символов"
                                },
                                validate: {
                                    message: banSymbols,
                                },
                            })}
                            type="text"
                            className="input_authorize"
                            placeholder="Введите логин..."
                        />
                    </label>
                    <div
                        className="error_authorize"
                    >
                        {errors?.login && <p>{errors?.login?.message?.toString() || "Error!"}</p>}
                    </div>
                    <label className="label_authorize">
                        Пароль
                        <input
                            {...register('password', {
                                required: "Поле не должно быть пустым",
                                maxLength: {
                                    value: 32,
                                    message: "Пароль должен включать не более 32 символов"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Пароль должен включать не менее 8 символов"
                                },
                                validate: {
                                    message: banSymbols
                                }
                            })}
                            type="password"
                            className="input_authorize"
                            placeholder="Введите пароль..."
                        />
                    </label>
                    <div
                        className="error_authorize"
                    >
                        {errors?.password && <p>{errors?.password?.message?.toString() || "Error!"}</p>}
                    </div>
                    <Link
                        to={isValid ? "/validator_window" : "#"}
                        className="link"
                        style={{height : 20, width : 100, marginLeft: 183, paddingBottom: 12}}
                    >
                        Подтвердить
                    </Link>
                </div>
        </form>
    )
}