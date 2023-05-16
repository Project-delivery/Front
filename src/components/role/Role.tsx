import React, {useState} from 'react'
import {roles, roleModel} from "../../imports_for_output/roles_array";
import Dropdown_role from "./dropdown_role";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Opened{
    setField2Disabled: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Поле для открытия списка из трех роле("Admin", "Worker", "Validator")
export default function Role({ setField2Disabled, open, setOpen}: Opened){
    const [selectedItem, setSelectedItem] = useState<roleModel | null>(null)

    const handleClick = (event: any) => {
        event.preventDefault()
        setOpen(prev => !prev)
    }

    return (
        <div className="label_field">
            <label className="label">
                Роль
                <span
                    className="selectField_1"
                    defaultValue="Выберите роль..."
                    style={{color: selectedItem?.role ? "black" : "gray"}}
                    onClick={(event) => handleClick(event)}
                >
                    {selectedItem?.role ? selectedItem.role : "Выберите роль"}
                    <FontAwesomeIcon className={`icon ${open ? "open" : "closed"}`} icon={faChevronDown} />
                </span>
            </label>
            {open &&
                <div className="dropdown">
                    <Dropdown_role
                        setField2Disabled={setField2Disabled}
                        list={roles}
                        setSelectedItem={setSelectedItem}
                        setDropdownOpen={setOpen}
                    />
                </div>
            }
        </div>
    )
}