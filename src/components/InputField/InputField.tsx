interface InputFieldProps {
    onSearchTermChange: (searchTerm: string) => void;
}

const InputField = ({ onSearchTermChange }: InputFieldProps) => {
    // @ts-ignore
    let timerId: NodeJS.Timeout | null = null;

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            onSearchTermChange(event.target.value);
        }, 500);
    }

    return (
        <input name="searchTerm" onChange={onChange} className="p-2 mt-2 mb-1 shadow-sm rounded-md focus:shadow-xl focus:scale-105 transition-all ease- outline-none" placeholder="Search..." />
    )
}

export default InputField;