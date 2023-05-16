import Dropdown_city from "./city_dropdown";
import {cities, cityModel} from "../../imports_for_output/cities_array";
import React, {useMemo, useState} from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface Opened{
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
        if (selected && item.city.toLowerCase() === selected.city.toLowerCase()) {
            return true;
        }
        return item.city.toLowerCase().includes(text.toLowerCase());
    });
}

// Выбранный элемент хранится в selectedItem
// Функция создания поля "Район". Привязанный к ней выпадающий список находится в файле "dropdown_district.ts".
// При выборе поля в выпадающем списке, его данные (id, если имеется, и главная информация (в данном случае район))
// передаются в состояние selectedItem.
export default function City({inputCity, setInputCity, mainObj_which, open, setOpen, cityDisabled, setStreetDisabled}: Opened){
    const [selectedItem, setSelectedItem] = useState<cityModel | null>(null)

    const filteredList = useMemo(() =>
        filterList(cities, inputCity, selectedItem), [cities, inputCity, selectedItem])

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
                        onClick={(event) => {
                            event.preventDefault();
                            setOpen(true);
                            setInputCity("");
                            setStreetDisabled(true)
                        }
                        }
                        style={{pointerEvents : cityDisabled ? 'none' : 'inherit'}}
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