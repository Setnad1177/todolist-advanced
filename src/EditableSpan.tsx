import {useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type PropsType = {
    value: string
}

export const EditableSpan = ({ value }: PropsType) => {
    const [editMode, setEditMode] = useState(false)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    return (
        <>
            {editMode ? (
                <input value={value} autoFocus />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}