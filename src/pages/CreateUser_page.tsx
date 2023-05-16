import React, {useState} from "react";
import {mainObject} from "../MainObject/main_obj";
import Role from "../components/role/Role";
import Region from "../components/region/region";
import District from "../components/district/district";
import Login from "../components/login/login";
import Password from "../components/password/password";

export function CreateUserPage() {

    // Состояния, определеяющие, открыт ли выпадающий список для того или иного поля
    const [openRegion, setOpenRegion] = useState(false)

    const [openDistrict, setOpenDistrict] = useState(false)

    const [openRole, setOpenRole] = useState(false)

    // Состояния, определяющие, разблокировать то или иное поле или нет( сделано таким образом что поле разблокируется только при наличии информации в предыдущем)
    const [regionDisabled, setRegionDisabled] = useState(true)

    const [districtDisabled, setDistrictDisabled] = useState(true)

    const [LogAndPasDisabled, setLogAndPasDisabled] = useState(true)

    const [valid_password, setValid_password] = useState(false)

    const [valid_login, setValid_Login] = useState(false)

    // Вместо простого alert, здесь должна быть функция отправки формы на бэк
    const handleSubmit = () => {
        alert(JSON.stringify(mainObject))
        console.log(JSON.stringify(mainObject))
        setInputRole("")
        setInputRegion("")
        setInputDistrict("")
        setInputLogin("")
        setInputPassword("")
        setDistrictDisabled(true)
        setLogAndPasDisabled(true)
        setShowPassword(false)
    }

    const [inputRole, setInputRole] = useState("")

    const [inputRegion, setInputRegion] = useState("")

    const [inputDistrict, setInputDistrict] = useState("")

    const [inputLogin, setInputLogin] = useState("")

    const [inputPassword, setInputPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    return (
        <form onSubmit={(event) => {
            event.preventDefault()
        }
        }>
            <div onClick={() => {        // При нажатии на задний фон, выпадающие списки закрываются
                setOpenRegion(false)
                setOpenDistrict(false)
                setOpenRole(false)
            }} className="background"
            />
            <div className="window">
                <Role
                    inputRole={inputRole}
                    setInputRole={setInputRole}
                    open={openRole}
                    setOpen={setOpenRole}
                    setField2Disabled={setRegionDisabled}
                />
                <Region
                    setDropdownDistrictOpen={setOpenDistrict}
                    inputRegion={inputRegion}
                    setInputRegion={setInputRegion}
                    setInputDistrict={setInputDistrict}
                    mainObj_which={mainObject}
                    open={openRegion}
                    setOpen={setOpenRegion}
                    regionDisabled={regionDisabled}
                    setAfterRegionDisabled={setDistrictDisabled}
                />
                <District
                    inputDistrict={inputDistrict}
                    setInputDistrict={setInputDistrict}
                    mainObj_which={mainObject}
                    open={openDistrict}
                    setOpen={setOpenDistrict}
                    afterRegionDisabled={districtDisabled}
                    setAfterDistrictDisabled={setLogAndPasDisabled}
                />
                <Login
                    exportedLogin={inputLogin}
                    setInputLogin={setInputLogin}
                    field4and5Disabled={LogAndPasDisabled}
                    setValid={setValid_Login}
                />
                <Password
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    exportedPassword={inputPassword}
                    setInputPassword={setInputPassword}
                    field4and5Disabled={LogAndPasDisabled}
                    setValid={setValid_password}
                />
                <button
                    disabled={regionDisabled
                        || districtDisabled
                        || LogAndPasDisabled
                        || !valid_login
                        || !valid_password
                        || inputDistrict.length == 0
                        || inputRegion.length == 0}
                    className="button_submit"
                    onClick={(event) => {
                        handleSubmit()
                    }}
                >
                    Готово
                </button>
            </div>
        </form>
    )
}