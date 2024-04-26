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
        <input name="searchTerm" onChange={onChange} className="m-2 p-3 w-[960px] shadow-sm rounded-md focus:shadow-md transition-all ease- outline-none" placeholder="Search..." />
    )
}

export default InputField;