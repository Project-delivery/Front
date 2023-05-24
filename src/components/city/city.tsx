import Dropdown_city from "./city_dropdown";
import { cityModel} from "../../imports_for_output/cities_array";
import React, {useEffect, useMemo, useState} from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_address, mainObj_typeAddress} from "../../MainObject/mainObj_address";
import { GetCitiesById } from "../../services/AddressService";

interface Opened{
    setDropdownStreetOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDropdownHouseOpen ?: React.Dispatch<React.SetStateAction<boolean>>
    setInputStreet: React.Dispatch<React.SetStateAction<string>>
    setInputHouse?: React.Dispatch<React.SetStateAction<string>>
    setHouseDisabled?: React.Dispatch<React.SetStateAction<boolean>>
    inputCity: string
    setInputCity: React.Dispatch<React.SetStateAction<string>>
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress
    cityDisabled: boolean
    setStreetDisabled: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
// Функция для реализации следующего функционала: при вводе каких-либо символов в строку поиска, выпадающий список
// динамически меняется предлагая только те варианты, которые содержат в себе введенные символы
// (пример: введено "Min" - выпадающий список будет содержать поля "Minsk", "Minnesota" и т.д)
function filterList(items: cityModel[], text: string, selected: cityModel | null): cityModel[] {
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
export default function City(
    {setDropdownStreetOpen, setDropdownHouseOpen, setInputStreet, setInputHouse, setHouseDisabled, inputCity, setInputCity, mainObj_which, open, setOpen, cityDisabled, setStreetDisabled}: Opened){
    const [selectedItem, setSelectedItem] = useState<cityModel | null>(null)
    const [cities,setCities] = useState<cityModel[]>([]); 

    const getCities = async ()=>{
        const data = await GetCitiesById(mainObj_which.idDistrict);
        console.log(mainObj_which.idDistrict);
        setCities(data);
        console.log(data);
    }
    const filteredList = useMemo(() =>
    filterList(cities,inputCity,selectedItem), [cities, inputCity, selectedItem])
     
     
        useEffect(() => {
            if (!mainObj_address.city) {
                setInputCity('');
            }
        });
    
        useEffect(() => {
            setInputCity(inputCity);
        });
    const handleClick = (event: any) => {
        event.preventDefault();
        getCities()
        setOpen(true);
        setInputCity("");
        setStreetDisabled(true)
        setInputStreet("")
        if(setDropdownStreetOpen != undefined){
            setDropdownStreetOpen(false)
        }
        if(setDropdownHouseOpen != undefined){
            setDropdownHouseOpen(false)
        }
        if(setInputHouse != undefined){
            setInputHouse("")
        }
        if(setHouseDisabled != undefined){
            setHouseDisabled(true)
        }
    }

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div className="label_field">
                <label className="label">
                    Город
                    <input
                        disabled={cityDisabled}
                        type="text"
                        className="selectField_1"
                        placeholder="Выберите город"
                        value={cityDisabled ? "" : inputCity}
                        onChange={(event) => {
                            setInputCity(event.target.value)
                            setOpen(true)
                        }}
                        onClick={(event) => handleClick(event)}
                        style={{
                            pointerEvents : cityDisabled ? 'none' : 'inherit',
                            border: inputCity.length > 0 ? "2px black solid" : "1px black solid"}}
                    >
                    </input>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_city
                            mainObj_which={mainObj_which}
                            setStreetDisabled={setStreetDisabled}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInputCity}
                            setDropdownOpen={setOpen} />
                    </div>}
            </div>
        </form>
    )
}