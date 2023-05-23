import React from "react";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
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
    const setMainObject = (input: houseModel) => {
        mainObj_which.house = input.house
        mainObj_which.idHouse = input.id
        console.log(input)
        
    }

    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
            setSelectedItem(elem)           // При нажатии на кнопку, выбранный объект передается в selectedItem,
            setInput(elem.house)           // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)        // список закрывается,
            setMainObject(elem)      // данные передаются в финальный объект, в данном случае нет id, так как тут region - не минимальная единица адреса
        }
        }>
            {elem.house}
        </li>
    ));

    return (
        <ul className="list">
            {listItems}
        </ul>
    )
}