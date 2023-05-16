import React, {useMemo, useState} from "react";
import {streets, streetModel} from "../../imports_for_output/streets_array";
import Dropdown_street from "./street_dropdown";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface Opened{
    inputStreet: string
    setInputStreet: React.Dispatch<React.SetStateAction<string>>
    mainObj_which : mainObj_typeAddress
    streetDisabled: boolean
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
// Функция для реализации следующего функционала: при вводе каких-либо символов в строку поиска, выпадающий список
// динамически меняется предлагая только те варианты, которые содержат в себе введенные символы
// (пример: введено "Min" - выпадающий список будет содержать поля "Minsk", "Minnesota" и т.д)
function filterList(items: streetModel[], text: string, selected: streetModel | null): streetModel[] {
    return items.filter((item) => {
        if (selected && item.street.toLowerCase() === selected.street.toLowerCase()) {
            return true;
        }
        return item.street.toLowerCase().includes(text.toLowerCase());
    });
}

// Выбранный элемент хранится в selectedItem
// Функция создания поля "Район". Привязанный к ней выпадающий список находится в файле "dropdown_district.ts".
// При выборе поля в выпадающем списке, его данные (id, если имеется, и главная информация (в данном случае район))
// передаются в состояние selectedItem.
export default function Street({inputStreet, setInputStreet, mainObj_which, streetDisabled, open, setOpen}: Opened){
    const [selectedItem, setSelectedItem] = useState<streetModel | null>(null)

    const filteredList = useMemo(() =>
        filterList(streets, inputStreet, selectedItem), [streets, inputStreet, selectedItem])

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
                        onClick={(event) => {
                            event.preventDefault();
                            setOpen(true);
                            setInputStreet("");
                        }
                        }
                        style={{pointerEvents : streetDisabled ? 'none' : 'inherit'}}
                    >
                    </input>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_street
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