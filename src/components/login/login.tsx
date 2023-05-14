import React, {useState} from 'react'
import {mainObj_typeCreate, mainObject} from "../../MainObject/main_obj";
import {useForm} from "react-hook-form";
import {banSymbols} from "../checkValid";

interface disabled{
    setValid: React.Dispatch<React.SetStateAction<boolean>>
    field4and5Disabled: boolean
}

// Поле для ввода логина, возможно, потом станет полуавтоматической на подобие пароля. Сейчас функционал
// полей логина и пароля разный в том, что логин вводить нужно самому, и в нем есть проверка на валидность:
// запрет на использование некоторых символов, минимальная длина - 5б максимальная - 20. Запрещенные символы
// можно посмотреть в функции banSymbols, которая проверяет ввод на отсутствие этих символов.
export default function Login({setValid, field4and5Disabled}: disabled){

    const {
        register,
        formState:{errors, isValid},
        watch
    } = useForm<mainObj_typeCreate>({
        mode: "onBlur"
    })

    const login = watch('login') as string

    const [input, setInput] = useState('')
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
                    placeholder="Введите логин"
                    onChange={(event) => {
                        setInput(event.target.value)
                        setMainObject(event.target.value)
                        setValid(Validation(event.target.value))
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
