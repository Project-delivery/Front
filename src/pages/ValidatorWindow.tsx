import React from "react";
import { useState } from "react";
import {mainObj_address} from "../MainObject/mainObj_address";
import {mainObj_typeAddress} from "../MainObject/mainObj_address";
import {Requests_for_validator} from "../components/requests_for_validator";
import {requests_for_validator} from "../imports_for_output/requests_for_validator";

const decision = {
    YorN: "",
    commentary: "",
    validatorID: 0
}

export const infoJSON : mainObj_typeAddress = {
    id: 0,
    region: "",
    district: "",
    city: "",
    street: ""
}

export function ValidatorWindow() {

    const [selectedOption, setSelectedOption] = useState("");

    const [comment, setComment] = useState("")

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const handleClick = (radio: string, comm: string) => {
        if(selectedOption === "option1"){
            decision.YorN = "Одобрено"
        }
        else {
            decision.YorN = "Отказано"
        }
        decision.commentary = comm
        decision.validatorID = 2
        alert(JSON.stringify(decision))
        alert(JSON.stringify(mainObj_address))
    }

    const [selectedItem, setSelectedItem] = useState<mainObj_typeAddress | null>(null)

    return (
        <>
            <div className="background"/>
            <div className="window_validator">
                <div className="radioBtn">
                    <label>
                        <input
                            type="radio"
                            value="option1"
                            checked={selectedOption === "option1"}
                            onChange={handleOptionChange}
                            name="options"
                        />
                        Да
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="option2"
                            checked={selectedOption === "option2"}
                            onChange={handleOptionChange}
                            name="options"
                        />
                        Нет
                    </label>
                </div>
                <button
                    className="button_save"
                    onClick={() => handleClick(selectedOption, comment)}
                >
                    Сохранить
                </button>
                <div className="get_infoJSON">
                    <Requests_for_validator selectedItem={selectedItem} setSelectedItem={setSelectedItem} list={requests_for_validator}/>
                </div>
                <textarea
                    className="commentary"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
            </div>
        </>
    );
}