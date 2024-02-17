interface InputFieldProps {
    onSearchTermChange: (searchTerm: string) => void;
    placeholder?: string;
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
        <input name="searchTerm" onChange={onChange} className="p-2 w-[960px] shadow-sm rounded-md focus:shadow-xl transition-all ease- outline-none" placeholder="Search..." />
    )
}

export default InputField;