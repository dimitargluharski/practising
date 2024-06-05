type InputTextProps = {
    handleChangeText: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string
}

export const InputText = ({ handleChangeText, value }: InputTextProps) => {
    return (
        <input type="text" className="p-1 w-[768px] rounded-md outline-gray-600" value={value} onChange={handleChangeText} />
    )
}