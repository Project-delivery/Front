import React, {useState} from 'react'
import Region from "../components/region/region";
import District from "../components/district/district";
import City from "../components/city/city";
import {mainObj_search} from "../MainObject/mainObj_search";

export function Search_page() {

    // Состояния, определеяющие, открыт ли выпадающий список для того или иного поля
    const [openRegion, setOpenRegion] = useState(false)

    const [openDistrict, setOpenDistrict] = useState(false)

    const [openCity, setOpenCity] = useState(false)

    // Состояния, определяющие, разблокировать то или иное поле или нет( сделано таким образом что поле разблокируется только при наличии информации в предыдущем)
    const [regionDisabled, setRegionDisabled] = useState(false)

    const [afterRegionDisabled, setAfterRegionDisabled] = useState(true)

    const [afterDistrictDisabled, setAfterDistrictDisabled] = useState(true)

    const [cityDisabled, setCityDisabled] = useState(true)

    const [streetDisabled, setStreetDisabled] = useState(true)

    // Вместо простого alert, здесь должна быть функция отправки формы на бэк
    const handleSubmit = () => {
        alert(JSON.stringify(mainObj_search))
        console.log(JSON.stringify(mainObj_search))
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
                    mainObj_which={mainObj_search}
                    open={openRegion}
                    setOpen={setOpenRegion}
                    regionDisabled={regionDisabled}
                    setAfterRegionDisabled={setAfterRegionDisabled}
                />
                <District
                    inputDistrict={inputDistrict}
                    setInputDistrict={setInputDistrict}
                    setInputCity={setInputCity}
                    setCityDisabled={setCityDisabled}
                    mainObj_which={mainObj_search}
                    open={openDistrict}
                    setOpen={setOpenDistrict}
                    afterRegionDisabled={afterRegionDisabled}
                    setAfterDistrictDisabled={setAfterDistrictDisabled}
                />
                <City
                    inputCity={inputCity}
                    setInputCity={setInputCity}
                    mainObj_which={mainObj_search}
                    open={openCity}
                    setOpen={setOpenCity}
                    cityDisabled={afterDistrictDisabled}
                    setStreetDisabled={setStreetDisabled}
                />
                <button
                    disabled={afterRegionDisabled
                        || inputCity.length == 0
                        || inputCity != mainObj_search.city}
                    className="button_submit"
                    onClick={() => handleSubmit()}
                >
                    Готово
                </button>
            </div>
        </form>
    )
}