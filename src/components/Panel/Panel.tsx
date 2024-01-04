type PanelProps = {
    title: string;
    children?: any
    button?: string
}

const Panel = ({ title, children }: PanelProps) => {
    return (
        <div className="w-[300px] m-2 rounded-md">
            <div className="bg-slate-400 p-2">
                <span>
                    {title}
                </span>
            </div>

            <div className="bg-slate-50">
                {children}
            </div>
        </div>
    )
}

export default Panel;