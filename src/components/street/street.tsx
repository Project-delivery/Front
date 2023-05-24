import React, {useEffect, useMemo, useState} from "react";
import { streetModel} from "../../imports_for_output/streets_array";
import Dropdown_street from "./street_dropdown";
import {mainObj_address, mainObj_typeAddress} from "../../MainObject/mainObj_address";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import { GetStreetsById } from "../../services/AddressService";

interface Opened{
    setDropdownHouseOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    inputStreet: string
    setInputHouse?: React.Dispatch<React.SetStateAction<string>>
    setHouseDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    setInputStreet: React.Dispatch<React.SetStateAction<string>>
    mainObj_which : mainObj_typeAddress | mainObj_typeSearch
    streetDisabled: boolean
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
// Функция для реализации следующего функционала: при вводе каких-либо символов в строку поиска, выпадающий список
// динамически меняется предлагая только те варианты, которые содержат в себе введенные символы
// (пример: введено "Min" - выпадающий список будет содержать поля "Minsk", "Minnesota" и т.д)
function filterList(items: streetModel[], text: string, selected: streetModel | null): streetModel[] {
    return items.filter((item) => {
        if (selected && item.name.toLowerCase() === selected.name.toLowerCase()) {
            return true;
        }
        return item.name.toLowerCase().includes(text.toLowerCase());
    });
}

// Выбранный элемент хранится в selectedItem
// Функция создания поля "Район". Привязанный к ней выпадающий список находится в файле "dropdown_district.ts".
// При выборе поля в выпадающем списке, его данные (id, если имеется, и главная информация (в данном случае район))
// передаются в состояние selectedItem.
export default function Street({setDropdownHouseOpen, setHouseDisabled, setInputHouse, inputStreet, setInputStreet, mainObj_which, streetDisabled, open, setOpen}: Opened){
    const [selectedItem, setSelectedItem] = useState<streetModel | null>(null)
    const [streets,setStreets] = useState<streetModel[]>([]); 

    
    const getStreets = async ()=>{
        const data = await GetStreetsById(mainObj_which.idCity);
        console.log(mainObj_which.idCity);
        setStreets(data);
        console.log(data);
    }

    const filteredList = useMemo(() =>
        filterList(streets, inputStreet, selectedItem), [streets, inputStreet, selectedItem])

        useEffect(() => {
            if (!mainObj_address.city) {
                setInputStreet('');
            }
        });
    
        useEffect(() => {
            setInputStreet(inputStreet);
        });
    const handleClick = (event: any) => {
        event.preventDefault();
        getStreets();
        setOpen(true);
        if(setInputHouse != undefined){
            setInputHouse("")
        }
        if(setDropdownHouseOpen != undefined){
            setDropdownHouseOpen(false)
        }
        if(setHouseDisabled != undefined){
            setHouseDisabled(true)
        }
        setInputStreet("");
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div className="label_field">
                <label className="label">
                    Улица
                    <input
                        disabled={streetDisabled}
                        type="text"
                        className="selectField_1"
                        placeholder="Введите улицу"
                        value={streetDisabled ? "" : inputStreet}
                        onChange={(event) => {
                            setInputStreet(event.target.value)
                            setOpen(true)
                        }}
                        onClick={(event) => handleClick(event)}
                        style={{
                            pointerEvents : streetDisabled ? 'none' : 'inherit',
                            border: inputStreet.length > 0 ? "2px black solid" : "1px black solid"
                    }}
                    >
                    </input>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_street
                            setHouseDisabled={setHouseDisabled}
                            mainObj_which={mainObj_which}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInputStreet}
                            setDropdownOpen={setOpen} />
                    </div>}
            </div>
        </form>
    )
}