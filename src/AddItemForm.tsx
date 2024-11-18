//import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

type PropsType = {
    addItem: (title:string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            <TextField
                label="Task title"
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={title}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button variant="contained" onClick={addItemHandler}>
                +
            </Button>

        </div>
    )
}


