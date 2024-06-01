import { ReactNode } from "react"

interface PanelProps {
  title: string
  body: ReactNode
  styles: string
}

export const Panel = ({ title, body, styles }: PanelProps) => {
  return (
    <div>
      <h2 className={styles}>{title}</h2>
      <body className={styles}>
        {body}
      </body>
    </div>
  )
}