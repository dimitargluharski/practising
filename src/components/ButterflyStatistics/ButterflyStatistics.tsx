// import { useEffect, useState } from "react";

// import * as footbalService from '../../services/football';

// export const ButterflyStatistics = ({ id }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     footbalService.getButterflyStatistics(id)
//       .then(data => setData(data)).catch((err) => console.log(err));
//   }, [id]);

//   const homeTeam = data[0];
//   const awayTeam = data[1];

//   return (
//     <div className="flex gap-x-5 ">
//       <div className="flex flex-col">
//         {homeTeam?.statistics.map((s) => (
//           <div className="flex justify-center px-2">
//             {s.value}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col justify-center">
//         {homeTeam?.statistics.map((s) => (
//           <div className="flex justify-center px-2">
//             {s.type}
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col">
//         {awayTeam?.statistics.map((s) => (
//           <div className="flex justify-center px-2">
//             {s.value}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }