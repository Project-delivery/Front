import React from 'react'
import {districtModel} from "../../imports_for_output/districts_array";
import {mainObj_typeCreate} from "../../MainObject/main_obj";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface listProps{
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress | mainObj_typeCreate
    setField4and5Disabled: React.Dispatch<React.SetStateAction<boolean>> | undefined
    filteredList: districtModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<districtModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_district({ mainObj_which, setField4and5Disabled, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: string, id: number) => {
        mainObj_which.district = input;
        mainObj_which.id = id;
    }

    // Формирование выпадающего списка из передаваемого из файла "district.tsx" отсортированного массива объектов в
    // зависимости от введенного input.
    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
            setSelectedItem(elem)                  // При нажатии на кнопку, выбранный объект передается в selectedItem,
            setInput(elem.district)                // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)           // список закрывается,
            setMainObject(elem.district, elem.id)  // данные передаются в финальный объект, в данном случае есть id, так как тут district - минимальная единица адреса
            if(setField4and5Disabled){
                setField4and5Disabled(false) // разблокировка следующих полей ("Логин" и "Пароль")
            }
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