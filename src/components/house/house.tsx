import React, {useMemo, useState} from "react";
import {houseModel, houses} from "../../imports_for_output/houses_array";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
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

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
        }
        }>
            <div className="label_field">
                <label className="label">
                    Дом
                    <span
                        className="selectField_1"
                        placeholder="Выберите дом"
                        style={{
                            color: inputHouse.length > 0 ? "black" : "gray",
                            border: inputHouse.length > 0 ? "2px black solid" : "1px black solid",
                            cursor: houseDisabled ? "default" : "pointer"
                        }}
                        onClick={houseDisabled ? undefined : (event) => handleClick(event)}
                    >
                        {inputHouse.length == 0 ? "Выберите дом" : inputHouse}
                        <FontAwesomeIcon className={`icon ${open ? "open" : "closed"}`} icon={faChevronDown} />
                    </span>
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