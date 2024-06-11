export const LeagueDetails = ({ dataObject }: any) => {
  const { league: { id, logo, name, round } } = dataObject;

  return (
    <div key={id}>
      <div className="flex items-center gap-x-2">
        <div className="h-14 w-14 p-2">
        <img src={logo} className="h-full w-full" />
        </div>

        <div className="flex flex-col">
          <div>
            {name}
          </div>
          <div>
            {round}
          </div>
        </div>
      </div>
    </div>
  )
}