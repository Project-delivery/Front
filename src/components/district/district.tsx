import Dropdown_district from "./dropdown_district";
import {districts, districtModel} from "../../imports_for_output/districts_array";
import React, {useEffect, useMemo, useState} from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_address, mainObj_typeAddress} from "../../MainObject/mainObj_address";
import {mainObj_typeCreate} from "../../MainObject/main_obj";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Opened{
    inputDistrict: string
    setInputDistrict: React.Dispatch<React.SetStateAction<string>>
    setInputCity ?: React.Dispatch<React.SetStateAction<string>>
    setCityDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
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
function filterList(items: districtModel[], text: string, selected: districtModel | null): districtModel[] {
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
export default function District({ setCityDisabled, setInputCity, inputDistrict, setInputDistrict, setStreetDisabled, mainObj_which, setAfterDistrictDisabled, afterRegionDisabled, open, setOpen}: Opened){
    const [selectedItem, setSelectedItem] = useState<districtModel | null>(null)

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
        if(setCityDisabled != undefined){
            setCityDisabled(true)
        }
        if(setInputCity){
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
                        style={{color: inputDistrict.length > 0 ? "black" : "gray"}}
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