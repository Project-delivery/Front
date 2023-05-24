import React from 'react'
import {streetModel} from "../../imports_for_output/streets_array";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";

interface listProps{
    setHouseDisabled ?: React.Dispatch<React.SetStateAction<boolean>>
    mainObj_which: mainObj_typeAddress | mainObj_typeSearch
    filteredList: streetModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<streetModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_street({setHouseDisabled, mainObj_which, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: streetModel) => {
        mainObj_which.street = input.name;
        mainObj_which.idStreet = input.id;
        console.log(input)
    }

    // Формирование выпадающего списка из передаваемого из файла "district.tsx" отсортированного массива объектов в
    // зависимости от введенного input.
    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
            setSelectedItem(elem)                  // При нажатии на кнопку, выбранный объект передается в selectedItem,
            setInput(elem.name)                // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)           // список закрывается,
            if(setHouseDisabled != undefined){
                setHouseDisabled(false)
            }
            setMainObject(elem)  // данные передаются в финальный объект, в данном случае есть id, так как тут district - минимальная единица адреса
        }
        }>
            {elem.name}
        </li>
    ));

    // Возвращение отсортированного списка объектов.
    return (
        <ul className="list">
            {listItems}
        </ul>
    );
}