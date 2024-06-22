import { IoFootball } from "react-icons/io5";
import { GiCardPlay } from "react-icons/gi";
import { FaArrowsRotate } from "react-icons/fa6";

export const MatchTimeline = ({ dataObject }: any) => {
  const hasEvents = dataObject.events.length > 0 ? false : true;

  console.log('dataObject', dataObject);

  return (
    <div className="w-full flex">
      {
        hasEvents ? 'There are no information about events in this match' : (
          <div className="flex">
            <div className="w-2 bg-green-700 mr-1 rounded-md animate-pulse" title="LIVE"></div>
            {
              dataObject.events.map((event: any, index: any) => {
                if (event.type === 'Goal') {
                  return (
                    <div
                      key={index}
                      className="h-8 w-8"
                      title={`${event.type} by ${event.player.name} at ${event.time.elapsed}min. Assisted by ${event.assist != null ? event.assist.name : 'unknown assist'}.`}
                    >
                      <IoFootball className="h-full w-full" />
                    </div>
                  );
                } else if (event.type === 'Card') {
                  return (
                    <div
                      key={index + 1}
                      className={`h-8 w-8 transform rotate-(-180deg) ${event.detail === 'Red Card' ? 'text-red-700' : 'text-yellow-500'}`}
                      title={`${event.detail} for ${event.player.name != null ? event.player.name : 'unknown player'} at ${event.time.elapsed}min.`}
                    // style={{ transform: `translateX(${event.time.elapsed * 2}%)` }}
                    >
                      <GiCardPlay className="h-full w-full" />
                    </div>
                  );
                } else if (event.type === 'subst') {
                  return (
                    <div
                      key={index + 2}
                      className="w-8 h-8"
                      title={`${event.player.name} substituted at ${event.time.elapsed}min.`}
                      // style={{ transform: `translateX(${event.time.elapsed * 2}%)` }}
                    >
                      <FaArrowsRotate className="h-full w-full" />
                      {/* <span>
                        Substitution: {event.player.name} substituted {event.detail} at {event.time.elapsed}min.
                      </span> */}
                    </div>
                  );
                } 
                // else {
                //   return (
                //     <div
                //       key={index + 3}
                //       className="w-2 bg-gray-500 border"
                //       style={{ transform: `translateX(${event.time.elapsed * 2}%)` }}
                //     >
                //       {/* <span>
                //         {event.type} at {event.time.elapsed}min.
                //       </span> */}
                //     </div>
                //   );
                // }
              })
            }
          </div>
        )
      }
    </div>
  )
}