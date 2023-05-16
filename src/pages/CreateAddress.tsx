import React, {useState} from "react";
import Region from "../components/region/region";
import District from "../components/district/district";
import City from "../components/city/city";
import Street from "../components/street/street";
import {infoJSON} from "./ValidatorWindow";
import {mainObj_address} from "../MainObject/mainObj_address";

export function CreateAddress(){

    // Состояния, определеяющие, открыт ли выпадающий список для того или иного поля
    const [openRegion, setOpenRegion] = useState(false)

    const [openDistrict, setOpenDistrict] = useState(false)

    const [openCity, setOpenCity] = useState(false)

    const [openStreet, setOpenStreet] = useState(false)

    // Состояния, определяющие, разблокировать то или иное поле или нет( сделано таким образом что поле разблокируется только при наличии информации в предыдущем)
    const [regionDisabled, setRegionDisabled] = useState(false)

    const [afterRegionDisabled, setAfterRegionDisabled] = useState(true)

    const [afterDistrictDisabled, setAfterDistrictDisabled] = useState(true)

    const [streetDisabled, setStreetDisabled] = useState(true)

    // Вместо простого alert, здесь должна быть функция отправки формы на бэк
    const handleSubmit = () => {
        infoJSON.id = mainObj_address.id
        infoJSON.street = mainObj_address.street
        infoJSON.city = mainObj_address.city
        infoJSON.region = mainObj_address.region
        infoJSON.district = mainObj_address.district
        alert(JSON.stringify(mainObj_address))
        console.log(JSON.stringify(mainObj_address))
    }

    // Определяет наличие валидных данных в логине и пароле, позволяя разблоикровать кнопку для отправки формы
    function isValid(input_1: boolean, input_2: boolean){
        if(input_1 && input_2){
            return true;
        }
        else {
            return false
        }
    }

    const [inputRegion, setInputRegion] = useState("")

    const [inputDistrict, setInputDistrict] = useState("")

    const [inputCity, setInputCity] = useState("")

    const [inputStreet, setInputStreet] = useState("")

    return(
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div onClick={() => {        // При нажатии на задний фон, выпадающие списки закрываются
                setOpenRegion(false)
                setOpenDistrict(false)
                setOpenCity(false)
            }}  className="background"
            />
            <div className="window">
                <Region
                    inputRegion={inputRegion}
                    setInputRegion={setInputRegion}
                    setInputDistrict={setInputDistrict}
                    setInputCity={setInputCity}
                    setInputStreet={setInputStreet}
                    setStreetDisabled={setStreetDisabled}
                    setAfterDistrictDisabled={setAfterDistrictDisabled}
                    mainObj_which={mainObj_address}
                    open={openRegion}
                    setOpen={setOpenRegion}
                    regionDisabled={regionDisabled}
                    setAfterRegionDisabled={setAfterRegionDisabled}
                />
                <District
                    inputDistrict={inputDistrict}
                    setInputDistrict={setInputDistrict}
                    setStreetDisabled={setStreetDisabled}
                    mainObj_which={mainObj_address}
                    open={openDistrict}
                    setOpen={setOpenDistrict}
                    afterRegionDisabled={afterRegionDisabled}
                    setAfterDistrictDisabled={setAfterDistrictDisabled}
                />
                <City
                    inputCity={inputCity}
                    setInputCity={setInputCity}
                    mainObj_which={mainObj_address}
                    open={openCity}
                    setOpen={setOpenCity}
                    cityDisabled={afterDistrictDisabled}
                    setStreetDisabled={setStreetDisabled}
                />
                <Street
                    inputStreet={inputStreet}
                    setInputStreet={setInputStreet}
                    mainObj_which={mainObj_address}
                    open={openStreet}
                    setOpen={setOpenStreet}
                    streetDisabled={streetDisabled}
                />
                <button
                    disabled={regionDisabled
                        || afterRegionDisabled
                        || afterDistrictDisabled
                        || streetDisabled
                        || inputStreet.length == 0}
                    className="button_submit"
                    onClick={() => handleSubmit()}
                >
                    Готово
                </button>
            </div>
        </form>
    )
}