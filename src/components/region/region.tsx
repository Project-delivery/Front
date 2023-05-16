import Dropdown_region from "./dropdown_region";
import {regions, regionModel} from "../../imports_for_output/regions_array";
import React, {useMemo, useState} from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";
import {mainObj_typeCreate} from "../../MainObject/main_obj";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Opened{
    inputRegion: string
    setInputDistrict: React.Dispatch<React.SetStateAction<string>>
    setInputCity ?: React.Dispatch<React.SetStateAction<string>>
    setInputStreet ?: React.Dispatch<React.SetStateAction<string>>
    setInputRegion: React.Dispatch<React.SetStateAction<string>>
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress | mainObj_typeCreate
    regionDisabled: boolean
    setAfterRegionDisabled: React.Dispatch<React.SetStateAction<boolean>>
    setAfterDistrictDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    setStreetDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
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
export default function Region({setInputStreet, setInputDistrict, setInputCity, inputRegion, setInputRegion, setAfterDistrictDisabled, setStreetDisabled, mainObj_which, setAfterRegionDisabled, regionDisabled, open, setOpen}: Opened){
    const [selectedItem, setSelectedItem] = useState<regionModel | null>(null)

    const filteredList = useMemo(() =>
        filterList(regions, inputRegion, selectedItem), [regions, inputRegion, selectedItem])

    const handleClick = (event: any) => {
        event.preventDefault();
        setOpen(true);
        setInputRegion("")
        setAfterRegionDisabled(true)
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
                        style={{color: inputRegion.length > 0 ? "black" : "gray"}}
                        onClick={regionDisabled ? undefined : (event) => handleClick(event)}
                    >
                        {inputRegion.length == 0 ? "Выберите область" : inputRegion}
                        <FontAwesomeIcon className={`icon ${open ? "open" : "closed"}`} icon={faChevronDown} />
                    </span>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
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