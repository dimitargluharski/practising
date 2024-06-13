import { getEventDetail } from "../../utils/eventUtils";

export const MatchEvents = ({ match }: any) => {

    if (!match) return null;

    return (
        <>
            {
                match.events.map((x: any) => (
                    <div className="flex items-center gap-x-2 p-2">
                        <div className="h-10 w-10">
                            <img src={x.team.logo} alt={x.team.name} className="h-10 w-10" />
                        </div>
                        <div>
                            {x.time.elapsed}'
                        </div>
                        <div>
                            {x.player.name}
                        </div>
                        <div>
                            {getEventDetail(x)}
                        </div>
                    </div>
                ))
            }
        </>
    )

};