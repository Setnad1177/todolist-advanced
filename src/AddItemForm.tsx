import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { Button } from './Button'

type PropsType = {
    addItem: (title: string) => void // Callback для добавления элемента (задачи или тудулиста)
}

export const AddItemForm = ({ addItem }: PropsType) => {
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
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addItemHandler} />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}