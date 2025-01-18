import { ReactNode } from "react"

type LayoutTypes = {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutTypes) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}