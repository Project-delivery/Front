import React from "react";
import { useState } from "react";
import {Requests_for_validator} from "../components/requests_for_validator";
import {mainObj_typeValidator, requests_for_validator} from "../imports_for_output/requests_for_validator";

const decision = {
    YorN: "",
    commentary: "",
    validatorID: 0,
    requestID: -1
}

export const infoJSON = {
    requestID: 0,
    id: 0,
    region: "",
    district: "",
    city: "",
    street: "",
    house: ""
}

export function ValidatorWindow() {

    const [selectedOption, setSelectedOption] = useState("");

    const [comment, setComment] = useState("")

    const [reqID, setReqID] = useState(-1)

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
        decision.validatorID = 999
        decision.requestID = reqID
        setSelectedOption("")
        setSelectedItem(null)
        setReqID(-1)
        setComment("")
        alert(JSON.stringify(decision))
    }

    const [selectedItem, setSelectedItem] = useState<mainObj_typeValidator | null>(null)

    return (
        <>
            <div className="background"/>
            <div className="window_validator">
                <div className="radioBtn">
                    <label className="radioLabel">
                        <input
                            className="btn_radio visually-hidden"
                            type="radio"
                            value="option1"
                            checked={selectedOption === "option1"}
                            onChange={handleOptionChange}
                            name="options"
                        />
                        <span className="customRadio"></span>
                        Да
                    </label>
                    <label className="radioLabel">
                        <input
                            className="btn_radio visually-hidden"
                            type="radio"
                            value="option2"
                            checked={selectedOption === "option2"}
                            onChange={handleOptionChange}
                            name="options"
                        />
                        <span className="customRadio"></span>
                        Нет
                    </label>
                </div>
                <button
                    disabled={selectedOption.length == 0 || reqID == -1}
                    className="button_save"
                    onClick={() => handleClick(selectedOption, comment)}
                >
                    Сохранить
                </button>
                <div className="get_infoJSON">
                    <Requests_for_validator
                        setRequestID={setReqID}
                        selectedItem={selectedItem}
                        setSelectedItem={setSelectedItem}
                        list={requests_for_validator}
                    />
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