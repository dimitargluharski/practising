export interface Fixture {
    id: number;
    date: string;
    periods: Periods; // ???
    referee: string;
    status: Status;
    timestamp: number;
    goals: Goals;
    venue: Venue;
    league: League;
    teams: Teams;
    timezone: string;
    fixture: Fixtures;
}

type Goals = {
    home: number;
    away: number;
};

type Periods = {
    first: number;
    second: number;
};

type Venue = {
    city?: string | null;
    id?: number | null;
    name?: string | null;
};

type League = {
    coutnry: string;
    flag: string;
    id: number;
    logo: string;
    name: string;
    season: number;
    round: string;
};

type Teams = {
    home: Home;
    away: Away;
};

type Home = {
    id: number;
    name: string;
    logo: string;
    winner: boolean; // this should be enum type
};

type Away = {
    id: number;
    name: string;
    logo: string;
    winner: boolean; // this should be enum type
};

type Status = {
    elapsed: number | null;
    long: string;
    short: string;
};

type Fixtures = {
    venue: any;
    id: number;
    date: string;
    timezone: string;
    status: Status;
};
