import { ReactNode } from "react"

type SidebarTypes = {
  children: ReactNode;
  className?: string;
}

export const Sidebar = ({ children, className }: SidebarTypes) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}