import React, {useEffect, useState} from 'react'
import Region from "../components/region/region";
import District from "../components/district/district";
import City from "../components/city/city";
import {mainObj_search} from "../MainObject/mainObj_search";
import Street from "../components/street/street";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export function Search_page() {

    // Состояния, определеяющие, открыт ли выпадающий список для того или иного поля
    const [openRegion, setOpenRegion] = useState(false)

    const [openDistrict, setOpenDistrict] = useState(false)

    const [openCity, setOpenCity] = useState(false)

    const [openStreet, setOpenStreet] = useState(false)

    // Состояния, определяющие, разблокировать то или иное поле или нет( сделано таким образом что поле разблокируется только при наличии информации в предыдущем)
    const [regionDisabled, setRegionDisabled] = useState(false)

    const [afterRegionDisabled, setAfterRegionDisabled] = useState(true)

    const [afterDistrictDisabled, setAfterDistrictDisabled] = useState(true)

    const [cityDisabled, setCityDisabled] = useState(true)

    const [streetDisabled, setStreetDisabled] = useState(true)


    // Вместо простого alert, здесь должна быть функция отправки формы на бэк
    const handleSubmit = () => {
        setInputRegion("")
        setInputDistrict("")
        setInputCity("")
        setInputStreet("")
        setAfterRegionDisabled(true)
        setAfterDistrictDisabled(true)
        setStreetDisabled(true)
    }

    useEffect(()=>{
        if(sessionStorage.getItem("role") === "admin"){
            setWhereTo("/admin_window")
        }
        else if(sessionStorage.getItem("role") === "worker"){
            setWhereTo("/worker_window")
        }
        else {
            setWhereTo("/validator_window")
        }
    },[]);

    const [whereTo, setWhereTo] = useState("")

    const [inputRegion, setInputRegion] = useState("")

    const [inputDistrict, setInputDistrict] = useState("")

    const [inputCity, setInputCity] = useState("")

    const [inputStreet, setInputStreet] = useState("")

    return(
        <form onSubmit={(event) => {
            event.preventDefault()
        }
        }>
            <div onClick={() => {        // При нажатии на задний фон, выпадающие списки закрываются
                setOpenRegion(false)
                setOpenDistrict(false)
                setOpenCity(false)
                setOpenStreet(false)
            }}  className="background"
            />
            <div className="window" style={{height: 275}}>
                <Link to={whereTo} className="link_back">
                    <FontAwesomeIcon icon={faCircleArrowLeft} />
                </Link>
                <Region
                    setDropdownDistrictOpen={setOpenDistrict}
                    setDropdownCityOpen={setOpenCity}
                    setDropdownStreetOpen={setOpenStreet}
                    inputRegion={inputRegion}
                    setInputRegion={setInputRegion}
                    setInputDistrict={setInputDistrict}
                    setInputCity={setInputCity}
                    setInputStreet={setInputStreet}
                    mainObj_which={mainObj_search}
                    open={openRegion}
                    setOpen={setOpenRegion}
                    regionDisabled={regionDisabled}
                    setAfterRegionDisabled={setAfterRegionDisabled}
                    setStreetDisabled={setStreetDisabled}
                    setAfterDistrictDisabled={setAfterDistrictDisabled}
                />
                <District
                    setDropdownStreetOpen={setOpenStreet}
                    setDropdownCityOpen={setOpenCity}
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
                    setDropdownStreetOpen={setOpenStreet}
                    setInputStreet={setInputStreet}
                    inputCity={inputCity}
                    setInputCity={setInputCity}
                    mainObj_which={mainObj_search}
                    open={openCity}
                    setOpen={setOpenCity}
                    cityDisabled={afterDistrictDisabled}
                    setStreetDisabled={setStreetDisabled}
                />
                <Street
                    inputStreet={inputStreet}
                    setInputStreet={setInputStreet}
                    mainObj_which={mainObj_search}
                    streetDisabled={streetDisabled}
                    open={openStreet}
                    setOpen={setOpenStreet}
                />
                <button
                    disabled={regionDisabled
                        || afterRegionDisabled
                        || afterDistrictDisabled
                        || streetDisabled
                        || inputStreet.length == 0
                        || inputStreet !== mainObj_search.street}
                    className="button_submit"
                    onClick={() => handleSubmit()}
                >
                    Готово
                </button>
            </div>
        </form>
    )
}