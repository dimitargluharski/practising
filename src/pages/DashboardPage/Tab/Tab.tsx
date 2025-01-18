import { ReactNode } from "react"

type TabType = {
  children: ReactNode;
  className: string;
}

export const Tab = ({ children, className }: TabType) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}