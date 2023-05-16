import React from 'react'
import {roleModel} from "../../imports_for_output/roles_array";
import {mainObject} from "../../MainObject/main_obj";

interface listProps{
    setInputRole: React.Dispatch<React.SetStateAction<string>>
    setField2Disabled: React.Dispatch<React.SetStateAction<boolean>>
    list : roleModel[]
    setSelectedItem: React.Dispatch<React.SetStateAction<roleModel | null>>
    setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export default function Dropdown_role({ setInputRole, setField2Disabled, list, setSelectedItem, setDropdownOpen }: listProps) {

    // Отправка данных в финальный объект, которй в конце передеается на бэк
    const setMainObject = (input: string) => {
        mainObject.role = input;
    }

    // Вывод 3 ролей ("Admin", "Worker", "Validator")
    const listItems = list.map((elem) => (
        <li key={elem.id} onClick={() => {    // При клике:
            setDropdownOpen(false)      // Закрытие списка
            setSelectedItem(elem)             // Передача информации о выбранном компоненте в selectedItem,
            setMainObject(elem.role)          // Отправка данных в финальный объект
            setInputRole(elem.role)
            setField2Disabled(false)    // Разблокировка следующего поля("Область")
        }
        }
        >
            {elem.role}
        </li>
    ))

    // Возврат списка из трех ролей
    return (
        <ul className="list">
            {listItems}
        </ul>
    );
}