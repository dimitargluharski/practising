interface BadgeProps {
    styles: string
    text: string
    children?: React.ReactNode
}

export const Badge = ({ styles, text }: BadgeProps) => {
    return (
        <div className={styles}>
            {text}
        </div>
    )
}