import Dropdown_district from "./dropdown_district";
import { districtModel} from "../../imports_for_output/districts_array";
import React, {useEffect, useMemo, useState} from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_address, mainObj_typeAddress} from "../../MainObject/mainObj_address";
import {mainObj_typeCreate} from "../../MainObject/main_obj";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { GetDistrictsById } from "../../services/AddressService";

interface Opened{
    setDropdownCityOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    setDropdownStreetOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    setDropdownHouseOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    setHouseDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    inputDistrict: string
    setInputDistrict: React.Dispatch<React.SetStateAction<string>>
    setInputCity?: React.Dispatch<React.SetStateAction<string>>
    setCityDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    setInputHouse?: React.Dispatch<React.SetStateAction<string>>
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress | mainObj_typeCreate
    afterRegionDisabled: boolean
    setAfterDistrictDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    setStreetDisabled ? : React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
// Функция для реализации следующего функционала: при вводе каких-либо символов в строку поиска, выпадающий список
// динамически меняется предлагая только те варианты, которые содержат в себе введенные символы
// (пример: введено "Min" - выпадающий список будет содержать поля "Minsk", "Minnesota" и т.д)

/*Посмотреть нужна ли*/function filterList(items: districtModel[], text: string, selected: districtModel | null): districtModel[] {
    return items.filter((item) => {
        if (selected && item.district.toLowerCase() === selected.district.toLowerCase()) {
            return true;
        }
        return item.district.toLowerCase().includes(text.toLowerCase());
    });
}

// Выбранный элемент хранится в selectedItem
// Функция создания поля "Район". Привязанный к ней выпадающий список находится в файле "dropdown_district.ts".
// При выборе поля в выпадающем списке, его данные (id, если имеется, и главная информация (в данном случае район))
// передаются в состояние selectedItem.
export default function District(
    {
        setDropdownStreetOpen,
        setDropdownCityOpen,
        setDropdownHouseOpen,
        setHouseDisabled,
        setInputHouse,
        setCityDisabled,
        setInputCity,
        inputDistrict,
        setInputDistrict,
        setStreetDisabled,
        mainObj_which,
        setAfterDistrictDisabled,
        afterRegionDisabled,
        open,
        setOpen
    }: Opened){
    const [selectedItem, setSelectedItem] = useState<districtModel | null>(null)
    const [districts,setDistricts] = useState<districtModel[]>([]); 

    //молимся чтобы useEffect убрал ошибку бесконечного рендеринга
    useEffect(()=>{
        async function districtsInit(){
        const data = await GetDistrictsById(mainObj_which.idRegion);
        setDistricts(data);
        console.log(data);
        }
        districtsInit();
    },[]);
    const filteredList = useMemo(() =>
        filterList(districts, inputDistrict, selectedItem), [districts, inputDistrict, selectedItem])

    useEffect(() => {
        if (!mainObj_address.region) {
            setInputDistrict('');
        }
    });

    useEffect(() => {
        setInputDistrict(inputDistrict);
    });

    const handleClick = (event: any) => {
        event.preventDefault();
        setOpen(true);
        setInputDistrict("")
        if(setDropdownCityOpen != undefined){
            setDropdownCityOpen(false)
        }
        if(setDropdownStreetOpen != undefined){
            setDropdownStreetOpen(false)
        }
        if(setDropdownHouseOpen != undefined){
            setDropdownHouseOpen(false)
        }
        if(setHouseDisabled != undefined){
            setHouseDisabled(true)
        }
        if(setCityDisabled != undefined){
            setCityDisabled(true)
        }
        if(setInputHouse != undefined){
            setInputHouse("")
        }
        if(setInputCity != undefined){
            setInputCity("")
        }
        if(setAfterDistrictDisabled != undefined){
            setAfterDistrictDisabled(true)
        }
        if(setStreetDisabled != undefined){
            setStreetDisabled(true)
        }
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div className="label_field">
                <label className="label">
                    Район
                    <span
                        className="selectField_1"
                        placeholder="Выберите район"
                        style={{
                            color: inputDistrict.length > 0 ? "black" : "gray",
                            border: inputDistrict.length > 0 ? "2px black solid" : "1px black solid",
                            cursor: afterRegionDisabled ? "default" : "pointer"
                        }}
                        onClick={afterRegionDisabled ? undefined : (event) => handleClick(event)}
                    >
                        {inputDistrict.length == 0 ? "Выберите район" : inputDistrict}
                        <FontAwesomeIcon className={`icon ${open ? "open" : "closed"}`} icon={faChevronDown} />
                    </span>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_district
                            mainObj_which={mainObj_which}
                            setField4and5Disabled={setAfterDistrictDisabled}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInputDistrict}
                            setDropdownOpen={setOpen} />
                    </div>}
            </div>
        </form>
    )
}