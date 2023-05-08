import React from 'react'
import {districtModel} from "../../imports_for_output/districts_array";
import {mainObject} from "../../MainObject/main_obj";

interface listProps{
    setField4and5Disabled: React.Dispatch<React.SetStateAction<boolean>>
    filteredList: districtModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<districtModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_district({ setField4and5Disabled, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: string, id: number) => {
        mainObject.district = input;
        mainObject.id = id;
    }

    // Формирование выпадающего списка из передаваемого из файла "district.tsx" отсортированного массива объектов в
    // зависимости от введенного input.
    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
            setSelectedItem(elem)                  // При нажатии на кнопку, выбранный объект передается в selectedItem,
            setInput(elem.district)                // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)           // список закрывается,
            setMainObject(elem.district, elem.id)  // данные передаются в финальный объект, в данном случае есть id, так как тут district - минимальная единица адреса
            setField4and5Disabled(false)     // разблокировка следующих полей ("Логин" и "Пароль")
        }
        }>
            {elem.district}
        </li>
    ));

    // Возвращение отсортированного списка объектов.
    return (
        <ul className="list">
            {listItems}
        </ul>
    );
}