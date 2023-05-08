import React, {useState} from 'react'
import {roles, roleModel} from "../../imports_for_output/roles_array";
import Dropdown_role from "./dropdown_role";

interface Opened{
    setField2Disabled: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Поле для открытия списка из трех роле("Admin", "Worker", "Validator")
export default function Role({ setField2Disabled, open, setOpen}: Opened){
    const [selectedItem, setSelectedItem] = useState<roleModel | null>(null)

    return (
        <div className="label_field">
            <label className="label">
                Роль
                <span
                    className="selectField_1"
                    defaultValue="Выберите роль..."
                    onClick={(event) => {
                        event.preventDefault()
                        setOpen(true)
                    }}
                    style={{color: selectedItem?.role ? "black" : "gray"}}
                >
                {selectedItem?.role ? selectedItem.role : "Выберите роль"}
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