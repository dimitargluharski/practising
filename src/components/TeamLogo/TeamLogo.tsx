interface TeamLogoProps {
    logoUrl: string;
}

const TeamLogo = ({ logoUrl }: TeamLogoProps) => {
    return (
        <div className="w-[25px] h-[25px]">
            <img src={logoUrl} alt="" className="w-full h-full" />
        </div>
    );
}

export default TeamLogo;