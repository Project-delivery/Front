import React from 'react'
import {cityModel} from "../../imports_for_output/cities_array";
import {mainObj_search, mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface listProps{
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress
    setStreetDisabled: React.Dispatch<React.SetStateAction<boolean>>
    filteredList: cityModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<cityModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_city({mainObj_which, setStreetDisabled, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: string, id: number) => {
        mainObj_which.city = input;
        mainObj_which.id = id;
    }

    // Формирование выпадающего списка из передаваемого из файла "district.tsx" отсортированного массива объектов в
    // зависимости от введенного input.
    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
            setSelectedItem(elem)                  // При нажатии на кнопку, выбранный объект передается в selectedItem,
            setInput(elem.city)                // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)           // список закрывается,
            setStreetDisabled(false)
            setMainObject(elem.city, elem.id)  // данные передаются в финальный объект, в данном случае есть id, так как тут district - минимальная единица адреса
        }
        }>
            {elem.city}
        </li>
    ));

    // Возвращение отсортированного списка объектов.
    return (
        <ul className="list">
            {listItems}
        </ul>
    );
}