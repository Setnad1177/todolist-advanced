import {ChangeEvent, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

type PropsType = {
    value: string
}

export const EditableSpan = ({ value }: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(true)
    }

    const deactivateEditModeHandler = () => {
        setEditMode(false)
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    return (
        <>
            {editMode ? (
                <input value={title}
                       onChange={changeTitleHandler}
                       onBlur={deactivateEditModeHandler}
                       autoFocus />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
}