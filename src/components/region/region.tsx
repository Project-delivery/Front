import Dropdown_region from "./dropdown_region";
import { regionModel} from "../../imports_for_output/regions_array";
import React, {useEffect, useMemo, useState} from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";
import {mainObj_typeCreate} from "../../MainObject/main_obj";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { GetRegions } from "../../services/AddressService";

interface Opened{
    setDropdownDistrictOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDropdownCityOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    setDropdownStreetOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    setDropdownHouseOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    inputRegion: string
    setInputDistrict: React.Dispatch<React.SetStateAction<string>>
    setInputCity ?: React.Dispatch<React.SetStateAction<string>>
    setInputStreet ?: React.Dispatch<React.SetStateAction<string>>
    setInputRegion: React.Dispatch<React.SetStateAction<string>>
    setInputHouse?: React.Dispatch<React.SetStateAction<string>>
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress | mainObj_typeCreate
    regionDisabled: boolean
    setAfterRegionDisabled: React.Dispatch<React.SetStateAction<boolean>>
    setAfterDistrictDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    setStreetDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    setHouseDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Функция для реализации следующего функционала: при вводе каких-либо символов в строку поиска, выпадающий список
// динамически меняется предлагая только те варианты, которые содержат в себе введенные символы
// (пример: введено "Min" - выпадающий список будет содержать поля "Minsk", "Minnesota" и т.д)
function filterList(items: regionModel[], text: string, selected: regionModel | null): regionModel[] {
    return items.filter((item) => {
        if (selected && item.region.toLowerCase() === selected.region.toLowerCase()) {
            return true;
        }
        return item.region.toLowerCase().includes(text.toLowerCase());
    });
}

//Выбранный элемент хранится в selectedItem
// Функция создания поля "Область". Привязанный к ней выпадающий список находится в файле "dropdown_region.ts".
// При выборе поля в выпадающем списке, его данные (id, если имеется, и главная информация (в данном случае область))
// передаются в состояние selectedItem.
export default function Region(
    {
        setDropdownDistrictOpen,
        setDropdownHouseOpen,
        setDropdownStreetOpen,
        setDropdownCityOpen,
        setHouseDisabled,
        setInputHouse,
        setInputStreet,
        setInputDistrict,
        setInputCity,
        inputRegion,
        setInputRegion,
        setAfterDistrictDisabled,
        setStreetDisabled,
        mainObj_which,
        setAfterRegionDisabled,
        regionDisabled,
        open,
        setOpen
    }: Opened){
    const [selectedItem, setSelectedItem] = useState<regionModel | null>(null)
    const [regions,setRegions] = useState<regionModel[]>([]); 
    useEffect(()=>{
        async function regionsInit(){
        const data = await GetRegions();
        setRegions(data);
        console.log(data);
        }
        regionsInit();
    },[]);
    const filteredList = useMemo(() =>
        filterList(regions, inputRegion, selectedItem), [regions, inputRegion, selectedItem])

    const handleClick = (event: any) => {
        event.preventDefault();
        setOpen(true);
        setInputRegion("")
        setAfterRegionDisabled(true)
        setDropdownDistrictOpen(false)
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
        if(setInputHouse != undefined){
            setInputHouse("")
        }
        if(setInputCity != undefined){
            setInputCity("")
        }
        if(setInputDistrict != undefined){
            setInputDistrict("")
        }
        if(setInputStreet != undefined){
            setInputStreet("")
        }
        if(setAfterDistrictDisabled != undefined){
            setAfterDistrictDisabled(true)
        }
        if(setStreetDisabled != undefined){
            setStreetDisabled(true)
        }
    }

    return (
        <div>
            <div className="label_field">
                <label className="label">
                    Область
                    <span
                        className="selectField_1"
                        placeholder="Выберите область"
                        defaultValue={""}
                        style={{
                            color: inputRegion.length > 0 ? "black" : "gray",
                            border: inputRegion.length > 0 ? "2px black solid" : "1px black solid",
                            cursor: regionDisabled ? "default" : "pointer"
                        }}
                        onClick={regionDisabled ? undefined : (event) => handleClick(event)}
                    >
                        {inputRegion.length == 0 ? "Выберите область" : inputRegion}
                        <FontAwesomeIcon className={`icon ${open ? "open" : "closed"}`} icon={faChevronDown} />
                    </span>
                </label>
            </div>
            <div>
                {open &&
                    <div className={`dropdown ${open ? "opened" : "closed"}`}>
                        <Dropdown_region
                            mainObj_which={mainObj_which}
                            setField3Disabled={setAfterRegionDisabled}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInputRegion}
                            setDropdownOpen={setOpen} />
                    </div>}
            </div>
        </div>
    )
}