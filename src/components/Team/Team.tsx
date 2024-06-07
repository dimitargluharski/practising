import { Logo } from "../Logo/Logo"

interface TeamProps {
  name: string
  logo: string
}

export const Team = ({ name, logo }: TeamProps) => {
  return (
    <div className="flex items-center gap-x-2 ">
      <Logo src={logo} />
      <div className="truncate">
        {name}
      </div>
    </div>
  )
}