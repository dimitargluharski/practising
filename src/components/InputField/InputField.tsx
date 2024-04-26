import { FiSearch } from 'react-icons/fi';

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
        <div className="relative m-2">
            <FiSearch className="absolute top-4 left-3" />
            <input name="searchTerm" onChange={onChange} className="pl-10 p-3 w-[960px] shadow-sm rounded-md focus:shadow-md transition-all ease- outline-none" placeholder="Search..." />
        </div>
    )
}

export default InputField;