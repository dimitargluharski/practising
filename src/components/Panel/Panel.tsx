interface PanelProps {
    title: string;
    children?: any
    button?: string
}

const Panel = ({ title, children }: PanelProps) => {
    return (
        <div className="m-2 rounded-md bg-red">
            <div className="bg-slate-400 p-2 text-slate-50">
                <span className="uppercase">
                    {title}
                </span>
            </div>

            <div className="bg-slate-50 p-2">
                {children}
            </div>
        </div>
    )
}

export default Panel;