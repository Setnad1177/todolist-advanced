type ButtonPropsType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button = ({className, title, onClick}: ButtonPropsType) => {
    return <button
        className={className}
        onClick={onClick}
    >{title}</button>
}