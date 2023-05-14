import React from "react";
import { useState } from "react";
import {mainObj_address} from "../MainObject/mainObj_address";
import {mainObj_typeAddress} from "../MainObject/mainObj_address";

const decision = {
    YorN: "",
    commentary: ""
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
        alert(JSON.stringify(decision))
        alert(JSON.stringify(mainObj_address))
    }

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
                <div
                    className="get_infoJSON"
                    defaultValue={JSON.stringify(mainObj_address)}
                >
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