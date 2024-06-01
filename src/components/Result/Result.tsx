interface ResultProps {
  goals: {
    home: string,
    away: string
  }
}

export const Result = ({ goals }: ResultProps) => {
  const { home, away } = goals;

  return (
    <div className="flex flex-col">
      <div>
        {home}
      </div>
      <div>
        {away}
      </div>
    </div>
  )
}