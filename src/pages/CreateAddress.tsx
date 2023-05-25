import  {useState} from "react";
import Region from "../components/region/region";
import District from "../components/district/district";
import City from "../components/city/city";
import Street from "../components/street/street";
import {infoJSON} from "./ValidatorWindow";
import {mainObj_address} from "../MainObject/mainObj_address";

import { RegisterUser } from "../services/RegisterUserService";
import { AddAddress } from "../services/ValidatorRequests";
import { House } from "../components/house/house";

export function CreateAddress(){

    // Состояния, определеяющие, открыт ли выпадающий список для того или иного поля
    const [openRegion, setOpenRegion] = useState(false)

    const [openDistrict, setOpenDistrict] = useState(false)

    const [openCity, setOpenCity] = useState(false)

    const [openStreet, setOpenStreet] = useState(false)

    const [openHouse, setOpenHouse] = useState(false)

    // Состояния, определяющие, разблокировать то или иное поле или нет( сделано таким образом что поле разблокируется только при наличии информации в предыдущем)
    const [regionDisabled, setRegionDisabled] = useState(false)

    const [afterRegionDisabled, setAfterRegionDisabled] = useState(true)

    const [afterDistrictDisabled, setAfterDistrictDisabled] = useState(true)

    const [streetDisabled, setStreetDisabled] = useState(true)

    const [houseDisabled, setHouseDisabled] = useState(true)

    // Вместо простого alert, здесь должна быть функция отправки формы на бэк
    const handleSubmit = async () => {
        infoJSON.id = mainObj_address.id
        infoJSON.street = mainObj_address.street
        infoJSON.city = mainObj_address.city
        infoJSON.region = mainObj_address.region
        infoJSON.district = mainObj_address.district
        console.log(mainObj_address)
        let add:string = "add"
        let f:boolean = false
         if( await AddAddress(mainObj_address.region, mainObj_address.district, mainObj_address.city, mainObj_address.street, mainObj_address.house, mainObj_address.idStreet, f, add))
         {
            alert("Адресс отправлен во временную базу данных")    
         }else{
            alert("ЧТо-то пошло не так :(")
         }         
        console.log(JSON.stringify(mainObj_address))
        setInputRegion("")
        setInputDistrict("")
        setInputCity("")
        setInputStreet("")
        setInputHouses("")
        setAfterRegionDisabled(true)
        setAfterDistrictDisabled(true)
        setStreetDisabled(true)
        setHouseDisabled(true)
    }

    const [inputRegion, setInputRegion] = useState("")

    const [inputDistrict, setInputDistrict] = useState("")

    const [inputCity, setInputCity] = useState("")

    const [inputStreet, setInputStreet] = useState("")

    const [inputHouses, setInputHouses] = useState("")

    return(
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div onClick={() => {        // При нажатии на задний фон, выпадающие списки закрываются
                setOpenRegion(false)
                setOpenDistrict(false)
                setOpenCity(false)
                setOpenStreet(false)
                setOpenHouse(false)
            }}  className="background"
            />
            <div className="window" style={{height: 330}}>
                <Region
                    setDropdownDistrictOpen={setOpenDistrict}
                    setDropdownStreetOpen={setOpenStreet}
                    setDropdownCityOpen={setOpenCity}
                    setDropdownHouseOpen={setOpenHouse}
                    setHouseDisabled={setHouseDisabled}
                    setInputHouse={setInputHouses}
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
                    //setCityDisabled - решить вопрос и сделать код чище
                    setDropdownHouseOpen={setOpenHouse}
                    setDropdownCityOpen={setOpenCity}
                    setDropdownStreetOpen={setOpenStreet}
                    setHouseDisabled={setHouseDisabled}
                    setInputHouse={setInputHouses}
                    setInputCity={setInputCity}
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
                    setDropdownStreetOpen={setOpenStreet}
                    setDropdownHouseOpen={setOpenHouse}
                    setInputStreet={setInputStreet}
                    setInputHouse={setInputHouses}
                    setHouseDisabled={setHouseDisabled}
                    inputCity={inputCity}
                    setInputCity={setInputCity}
                    mainObj_which={mainObj_address}
                    open={openCity}
                    setOpen={setOpenCity}
                    cityDisabled={afterDistrictDisabled}
                    setStreetDisabled={setStreetDisabled}
                />
                <Street
                    setDropdownHouseOpen={setOpenHouse}
                    setHouseDisabled={setHouseDisabled}
                    setInputHouse={setInputHouses}
                    inputStreet={inputStreet}
                    setInputStreet={setInputStreet}
                    mainObj_which={mainObj_address}
                    open={openStreet}
                    setOpen={setOpenStreet}
                    streetDisabled={streetDisabled}
                />
                <House
                    open={openHouse}
                    setOpen={setOpenHouse}
                    setInputHouse={setInputHouses}
                    houseDisabled={houseDisabled}
                    inputHouse={inputHouses}
                    mainObj_which={mainObj_address}
                />
                <button
                    disabled={regionDisabled
                        || afterRegionDisabled
                        || afterDistrictDisabled
                        || streetDisabled
                        || houseDisabled
                        || inputHouses.length == 0}
                    className="button_submit"
                    onClick={() => handleSubmit()}
                >
                    Готово
                </button>
            </div>
        </form>
    )
}