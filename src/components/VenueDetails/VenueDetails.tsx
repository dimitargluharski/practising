import { MdOutlineStadium } from "react-icons/md";

export const VenueDetails = ({ venue }: any) => {
  // const id = venue?.fixtures?.venue?.id;
  const name = venue?.fixtures?.venue?.name;
  // const city = venue?.fixtures?.venue?.city;

  return (
    <div className="flex items-center gap-x-2">
      <MdOutlineStadium className="h-14 w-14 p-1" />
      {name || "N/A"}
    </div>
  );
}