interface TeamNameProps {
    name: string;
}

const TeamName = ({ name }: TeamNameProps) => {
    return (
        <div className="ml-1">
            {name}
        </div>
    );
}

export default TeamName;