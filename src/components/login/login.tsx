import React, {useState} from 'react'
import {mainObj_typeCreate, mainObject} from "../../MainObject/main_obj";
import {useForm} from "react-hook-form";
import {banSymbols} from "../checkValid";

interface disabled{
    exportedLogin: string
    setInputLogin: React.Dispatch<React.SetStateAction<string>>
    setValid: React.Dispatch<React.SetStateAction<boolean>>
    field4and5Disabled: boolean
}

// Поле для ввода логина, возможно, потом станет полуавтоматической на подобие пароля. Сейчас функционал
// полей логина и пароля разный в том, что логин вводить нужно самому, и в нем есть проверка на валидность:
// запрет на использование некоторых символов, минимальная длина - 5б максимальная - 20. Запрещенные символы
// можно посмотреть в функции banSymbols, которая проверяет ввод на отсутствие этих символов.
export default function Login({exportedLogin, setInputLogin, setValid, field4and5Disabled}: disabled){

    const {
        register,
        formState:{errors, isValid},
    } = useForm<mainObj_typeCreate>({
        mode: "onBlur"
    })

    const setMainObject = (login: string) => {
        mainObject.login = login
    }

    function Validation(input: string){
        if(input.length < 5 || input.length > 20 || banSymbols(input)){
            return false;
        }
        else {
            return true;
        }
    }

    return (
        <div className="label_field">
            <label className="label">
                Логин
                <input
                    {...register('login', {
                        required: "Поле не должно быть пустым",
                        maxLength: {
                            value: 20,
                            message: "Логин не должен быть длиннее 20 символов"
                        },
                        minLength: {
                            value: 5,
                            message: "Логин не должен быть короче 5 символов"
                        },
                        validate: {
                            message: banSymbols,
                        },
                    })}
                    disabled={field4and5Disabled}
                    type="text"
                    className="selectField_1"
                    value={field4and5Disabled ? "Введите логин" : exportedLogin}
                    style={{
                        border: exportedLogin.length > 0 ? "2px black solid" : "1px black solid",
                        color: field4and5Disabled ? "gray" : "black"
                    }}
                    placeholder="Введите логин"
                    onChange={(event) => {
                        setMainObject(event.target.value)
                        setValid(Validation(event.target.value))
                        setInputLogin(event.target.value)
                    }}
                />
                <div
                    className="error"
                >
                    {errors?.login && <p>{errors?.login?.message?.toString() || "Ошибка!"}</p>}
                </div>
            </label>
        </div>
    )
}
