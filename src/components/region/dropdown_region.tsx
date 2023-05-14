import React from 'react'
import {regionModel} from "../../imports_for_output/regions_array";
import {mainObj_typeCreate} from "../../MainObject/main_obj";
import {mainObj_typeSearch} from "../../MainObject/mainObj_search";
import {mainObj_typeAddress} from "../../MainObject/mainObj_address";

interface listProps{
    mainObj_which: mainObj_typeSearch | mainObj_typeAddress | mainObj_typeCreate
    setField3Disabled: React.Dispatch<React.SetStateAction<boolean>>
    filteredList: regionModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<regionModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_region({ mainObj_which, setField3Disabled, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: string) => {
        mainObj_which.region = input;
    }

    // Формирование выпадающего списка из передаваемого из файла "region.tsx" отсортированного массива объектов в
    // зависимости от введенного input.
    const listItems = filteredList.map((elem) => (
        <li key={elem.id} onClick={() => {
                setSelectedItem(elem)           // При нажатии на кнопку, выбранный объект передается в selectedItem,
                setInput(elem.region)           // input(то есть значение в поле для ввода) устанавливается на значение компонента,
            setDropdownOpen(false)        // список закрывается,
                setMainObject(elem.region)      // данные передаются в финальный объект, в данном случае нет id, так как тут region - не минимальная единица адреса
                setField3Disabled(false)  // разблокировка следующего поля ("Район")
            }
        }>
            {elem.region}
        </li>
    ));

    // Возвращение отсортированного списка объектов.
    return (
        <ul className="list">
            {listItems}
        </ul>
    );
}