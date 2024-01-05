import { createContext, ReactNode } from "react";

type Name = {
    first: string;
    last: string;
}

export const MatchContext = createContext<Name | null>(null);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
    const value: Name = {
        first: '',
        last: ''
    }

    return (
        <MatchContext.Provider value={value}>
            {children}
        </MatchContext.Provider>
    )
}