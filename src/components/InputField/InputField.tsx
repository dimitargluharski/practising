interface InputFieldProps {
    onSearchTermChange: (searchTerm: string) => void;
}

const InputField = ({ onSearchTermChange }: InputFieldProps) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchTermChange(event.target.value);
    }

    return (
        <input name="searchTerm" onChange={onChange} className="p-2 mt-2 mb-1 shadow-md rounded-md" placeholder="Search..." />
    )
}

export default InputField;