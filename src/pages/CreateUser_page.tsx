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
    }

    // Определяет наличие валидных данных в логине и пароле, позволяя разблоикровать кнопку для отправки формы
    function isValid(input_1: boolean, input_2: boolean) {
        if (input_1 && input_2) {
            return true;
        } else {
            return false
        }
    }

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
                <Role open={openRole} setOpen={setOpenRole} setField2Disabled={setRegionDisabled}/>
                <Region mainObj_which={mainObject} open={openRegion} setOpen={setOpenRegion} regionDisabled={regionDisabled}
                        setAfterRegionDisabled={setDistrictDisabled}/>
                <District mainObj_which={mainObject} open={openDistrict} setOpen={setOpenDistrict} afterRegionDisabled={districtDisabled}
                          setAfterDistrictDisabled={setLogAndPasDisabled}/>
                <Login field4and5Disabled={LogAndPasDisabled} setValid={setValid_Login}/>
                <Password field4and5Disabled={LogAndPasDisabled} setValid={setValid_password}/>
                <button
                    disabled={!isValid(valid_password, valid_login)}
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