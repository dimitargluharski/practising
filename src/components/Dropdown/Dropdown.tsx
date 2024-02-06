interface DropdownProps {
    sortLiveMatchesByTime: () => void;
}

const MatchFilterPanel = ({ sortLiveMatchesByTime }: DropdownProps) => {
    return (
        <button onClick={sortLiveMatchesByTime} className="rounded-md bg-green-600 p-1 px-2 my-1 text-white hover:bg-green-700 transition 0.3s">
            Live
        </button>
    )
}
export default MatchFilterPanel;