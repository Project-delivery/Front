import React from 'react'
import {regionModel} from "../../imports_for_output/regions_array";
import {mainObject} from "../../MainObject/main_obj";

interface listProps{
    setField3Disabled: React.Dispatch<React.SetStateAction<boolean>>
    filteredList: regionModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<regionModel | null>>
    setInput: React.Dispatch<React.SetStateAction<string>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_region({ setField3Disabled, filteredList, setInput, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка выбранной информации в основной объект (финальный), который в конце будет отправлен на бэк.
    const setMainObject = (input: string) => {
        mainObject.region = input;
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