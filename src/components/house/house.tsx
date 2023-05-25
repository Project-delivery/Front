import React, {useMemo, useState} from "react";
import {houseModel, houses} from "../../imports_for_output/houses_array";
import {Dropdown_house} from "./house_dropdown";
import {mainObj_address, mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface Opened{
    inputHouse: string
    setInputHouse: React.Dispatch<React.SetStateAction<string>>
    mainObj_which : mainObj_typeAddress
    houseDisabled: boolean
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function House({inputHouse, setInputHouse, mainObj_which, houseDisabled, setOpen, open}: Opened){
    const [selectedItem, setSelectedItem] = useState<houseModel | null>(null)

    function filterList(items: houseModel[], text: string, selected: houseModel | null): houseModel[] {
        return items.filter((item) => {
            if (selected && item.name.toLowerCase() === selected.name.toLowerCase()) {
                return true;
            }

            return item.name.toLowerCase().includes(text.toLowerCase());
        });
    }

    const filteredList = useMemo(() =>
        filterList(houses, inputHouse, selectedItem), [houses, inputHouse, selectedItem])

    const handleClick = (event: any) => {
        event.preventDefault();
        setOpen(true);
        setInputHouse("");
    }
// <<<<<<< HEAD

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setOpen(false)
            setInputHouse(inputHouse)
            event.currentTarget.blur();
        }
    };

// =======
// const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter') {
//             event.currentTarget.blur();
//         }
//     };
// >>>>>>> 7d402c6 (final)
    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div className="label_field">
                <label className="label">
                    Дом
                    <input
/*<<<<<<< HEAD*/
                        disabled={houseDisabled}
                        type="text"
                        className="selectField_1"
                        placeholder="Выберите город"
                        value={houseDisabled ? "" : inputHouse}
                        onChange={(event) => {
                            mainObj_address.house = event.target.value
                            setInputHouse(event.target.value)
                            setOpen(true)
                        }}
                        onKeyDown={handleKeyPress}
/*=======*/
                        // onKeyDown={handleKeyPress}
                        // disabled={houseDisabled}
                        // type="number"
                        // className="selectField_1"
                        // placeholder="Введите дом"
                        // value={houseDisabled ? "" : inputHouse}
                        // onChange={(event) => {
                        //     mainObj_address.house = event.target.value;
                        //     setInputHouse(event.target.value)
                        //     setOpen(true)
                        // }}
/*>>>>>>> 7d402c6 (final)*/
                        onClick={(event) => handleClick(event)}
                        style={{
                            pointerEvents : houseDisabled ? 'none' : 'inherit',
                            border: inputHouse.length > 0 ? "2px black solid" : "1px black solid"}}
                    >
                    </input>
                </label>
            </div>
            <div>
                {open &&
                    <div className="dropdown">
                        <Dropdown_house
                            mainObj_which={mainObj_address}
                            filteredList={filteredList}
                            setSelectedItem={setSelectedItem}
                            setInput={setInputHouse}
                            setDropdownOpen={setOpen}
                        />
                    </div>}
            </div>
        </form>
    )
}