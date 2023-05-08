import Dropdown_region from "./dropdown_region";
import {list_of_cities, regionModel} from "../../imports_for_output/regions_array";
import React, {useMemo, useState} from "react";

interface Opened{
    field2Disabled: boolean
    setField3Disabled: React.Dispatch<React.SetStateAction<boolean>>
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
export default function Region({ setField3Disabled, field2Disabled, open, setOpen}: Opened){

    const [input, setInput] = useState('')

    const [selectedItem, setSelectedItem] = useState<regionModel | null>(null)

    const filteredList = useMemo(() =>
        filterList(list_of_cities, input, selectedItem), [list_of_cities, input, selectedItem])

    const handleInputBlur = () => {
        setOpen(false)
    }

    return (
        <div>
            <div className="label_field">
                <label className="label">
                    Область
                    <input
                        disabled={field2Disabled}
                        type="text"
                        className="selectField_1"
                        placeholder="Выберите область"
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        onClick={(event) => {
                            event.preventDefault();
                            setOpen(true);
                            setInput("")
                        }
                    }
                    >
                    </input>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_region
                            setField3Disabled={setField3Disabled}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInput}
                            setDropdownOpen={setOpen} />
                    </div>}
            </div>
        </div>
    )
}