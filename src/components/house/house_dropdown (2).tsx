import React from "react";
import {houseModel} from "../../imports_for_output/houses_array";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface listProps{
    filteredList: houseModel[]
    mainObj_which: mainObj_typeAddress
    setSelectedItem: React.Dispatch<React.SetStateAction<houseModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function Dropdown_house({filteredList, mainObj_which, setDropdownOpen, setSelectedItem, setInput}: listProps){

    const listItems = filteredList.map((elem) => (
        <li key={elem.id}>
            {elem.name}
        </li>
    ));

    return (
        <ul className="list">
            {listItems}
        </ul>
    )
}