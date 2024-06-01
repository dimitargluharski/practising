interface TimeProps {
  time: string
}

export const Time = ({ time }: TimeProps) => {
  return (
    <div>
      {time}'
    </div>
  )
}