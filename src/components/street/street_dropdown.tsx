import React from 'react'
import {streetModel} from "../../imports_for_output/streets_array";
import {mainObj_address, mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface listProps{
    mainObj_which: mainObj_typeAddress
    filteredList: streetModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<streetModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_street({mainObj_which, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: string, id: number) => {
        mainObj_which.street = input;
        mainObj_which.id = id;
    }

    // Формирование выпадающего списка из передаваемого из файла "district.tsx" отсортированного массива объектов в
    // зависимости от введенного input.
    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
            setSelectedItem(elem)                  // При нажатии на кнопку, выбранный объект передается в selectedItem,
            setInput(elem.street)                // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)           // список закрывается,
            setMainObject(elem.street, elem.id)  // данные передаются в финальный объект, в данном случае есть id, так как тут district - минимальная единица адреса
        }
        }>
            {elem.street}
        </li>
    ));

    // Возвращение отсортированного списка объектов.
    return (
        <ul className="list">
            {listItems}
        </ul>
    );
}