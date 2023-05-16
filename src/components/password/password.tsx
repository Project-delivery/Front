import React, {useState} from 'react'
import {mainObject} from "../../MainObject/main_obj";

interface disabled {
    showPassword: boolean
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
    exportedPassword: string
    setInputPassword: React.Dispatch<React.SetStateAction<string>>
    setValid: React.Dispatch<React.SetStateAction<boolean>>
    field4and5Disabled: boolean
}
// Поле с паролем и кнопкой, при нажатии которой генерируется случайный пароль. Кнопка заблоикрована, пока не выбраны
// поля "Роль", "Область" и "Район". Вместо функции генерации пароля здесь должен будет быть запрос на бэк для
// получения сгенерированного пароля. Поле ввода неизменяемо, в него нельзя вводить символы самостоятельно,
// значение в поле для ввода меняется только по нажатию кнопки. Принимает в себя два состояния:
// setValid - состояние, которое передается из App.tsx для установки значения на true и последующей разблокировки кнопки
// "Готово", которая отправляет форму на бэк(для этого тоже нужен будет запрос), и состояние field4and5Disabled -
// определяет, заблокированы ли поля "Логин" и "Пароль" для взаимодействия с ними.

export default function Password({showPassword, setShowPassword, exportedPassword, setInputPassword, setValid, field4and5Disabled}: disabled){

    function generateRandomPassword() {
        const length = 25
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        let password = ""
        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n))
        }
        setValid(true)
        return password
    }

    const setMainObject = (password: string) => {
        mainObject.password = password
    }

    const setPassword = () => {
        const password = generateRandomPassword()
        setMainObject(password)
        setInputPassword(password)
        setShowPassword(true)
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const inputType = showPassword ? 'text' : 'password'
    const buttonText = showPassword ? 'Скрыть пароль' : 'Сгенерировать пароль'

    return (
        <div className="label_field">
            <label className="label">
                Пароль
                <input
                    type={inputType}
                    className="selectField_1"
                    placeholder="Пароль"
                    value={exportedPassword}
                    style={{border: exportedPassword.length > 0 ? "2px black solid" : "1px black solid"}}
                    readOnly={showPassword}
                    disabled={true}
                />
                <button
                    className="button_generate"
                    style={showPassword ? {color: "white"} : {color: "lightblue"}}
                    onClick={showPassword ? toggleShowPassword : setPassword}
                    disabled={field4and5Disabled}
                >
                    {buttonText}
                </button>
            </label>
        </div>
    )
}
