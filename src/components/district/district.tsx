import Dropdown_district from "./dropdown_district";
import {districts, districtModel} from "../../imports_for_output/districts_array";
import React, {useMemo, useState} from "react";

interface Opened{
    field3Disabled: boolean
    setField4and5Disabled: React.Dispatch<React.SetStateAction<boolean>>
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
export default function District({ setField4and5Disabled, field3Disabled, open, setOpen}: Opened){
    const [input, setInput] = useState('')

    const [selectedItem, setSelectedItem] = useState<districtModel | null>(null)

    const filteredList = useMemo(() =>
        filterList(districts, input, selectedItem), [districts, input, selectedItem])

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div className="label_field">
                <label className="label">
                    Район
                    <input
                        disabled={field3Disabled}
                        type="text"
                        className="selectField_1"
                        placeholder="Выберите район"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onClick={(event) => {
                            event.preventDefault();
                            setOpen(true);
                            setInput("");
                        }
                    }
                    >
                    </input>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_district
                            setField4and5Disabled={setField4and5Disabled}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInput}
                            setDropdownOpen={setOpen} />
                    </div>}
            </div>
        </form>
    )
}