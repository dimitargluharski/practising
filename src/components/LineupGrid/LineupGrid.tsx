import { FaTshirt } from 'react-icons/fa';

interface Player {
    player: {
        number: number;
        name: string;
        position: string;
        team: {
            id: number;
            name: string;
        };
    };
}

interface TeamColors {
    player: {
        primary: string;
        number: string;
        border: string;
    };
    goalkeeper: {
        primary: string;
        number: string;
        border: string;
    };
}

interface Coach {
    name: string;
}

interface Lineups {
    startXI: Player[];
    substitutes: Player[];
    formation: string;
    coach: Coach;
    team: {
        id: number;
        name: string;
        colors: TeamColors;
    };
}

const LineupGrid = ({ lineups }: { lineups: Lineups[] }) => {
    const generateFormation = (formation: string, players: Player[], teamColors: TeamColors) => {
        let formationArray = ('1-' + formation).split('-').map(Number);
        let playerIndex = 0;
        return formationArray.map((line, i) => {
            let linePlayers = players.slice(playerIndex, playerIndex + line);
            playerIndex += line;
            return (
                <div key={i} className="flex justify-around w-full">
                    {linePlayers.map((player, playerIndex) => (
                        <div key={playerIndex} className="relative group m-2">
                            <FaTshirt style={{
                                color: teamColors?.player?.primary ? `#${teamColors.player.primary}` : '#000',
                                position: 'relative',
                                zIndex: 1,
                                fontSize: '40px'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '35%',
                                left: '49%',
                                transform: 'translate(-50%, -50%)',
                                zIndex: 2,
                                color: teamColors?.player?.number ? `#${teamColors.player.number}` : '#000'
                            }}>
                                {player.player.number}
                            </div>
                            <div className="flex justify-center">
                                <div className="w-8 text-xs text-center mt-1">{player.player.name.split(' ').pop()}</div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        });
    };

    return (
        <div className="flex justify-between" style={{
            background: 'linear-gradient(to right, #98FB98, #32CD32)',
            maxHeight: '100vh',
            overflowY: 'auto'
        }}>
            {lineups.map((lineup, index) => {
                const goalkeeper = lineup.startXI.find(player => player.player.position === 'GK');
                const outfieldPlayers = lineup.startXI.filter(player => player.player.position !== 'GK');
                return (
                    <div key={index} className="flex-1 mx-2" style={{ height: '500px' }}>
                        <h2 className="font-bold">Coach: {lineup.coach.name}</h2>
                        <p>Formation: {lineup.formation}</p>
                        <h3 className="font-semibold">Starting XI:</h3>
                        <div className="flex flex-col items-center">
                            {goalkeeper && (
                                <div className="relative group m-2">
                                    <FaTshirt style={{
                                        color: lineup.team.colors?.goalkeeper?.primary ? `#${lineup.team.colors.goalkeeper.primary}` : '#000',
                                        position: 'relative',
                                        zIndex: 1,
                                        fontSize: '30px'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 2,
                                        color: lineup.team.colors?.goalkeeper?.number ? `#${lineup.team.colors.goalkeeper.number}` : '#000'
                                    }}>
                                        {goalkeeper.player.number}
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="w-8 text-xs text-center mt-1">{goalkeeper.player.name.split(' ').pop()}</div>
                                    </div>
                                </div>
                            )}
                            {generateFormation(lineup.formation, outfieldPlayers, lineup.team.colors)}
                        </div>
                        <div>
                            <h3 className="font-semibold">Substitutes:</h3>
                            {lineup.substitutes.map((player, playerIndex) => (
                                <p key={playerIndex} className="text-sm">{player.player.number}. {player.player.name}</p>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default LineupGrid;