export const InputText = ({ handleChangeText, text }: any) => {
    return (
        <input type="text" className="p-1 w-[768px] rounded-md outline-gray-600" value={text} onChange={handleChangeText} />
    )
}