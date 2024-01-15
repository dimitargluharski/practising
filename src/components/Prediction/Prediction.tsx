import { useState, useEffect } from 'react';
import * as footballService from '../../services/football.js';

interface PredictionProp {
    fixture: number;
}

type MatchData = {
    predictions: Winner;
    teams: Teams;
}[];

type Winner = {
    comment: string;
    id: number;
    name: string;
}

type Teams = {
    home: Home;
    away: Away;
}

type Home = {
    id: number;
    name: string;
    logo: string;
    form: string;
}

type Away = {
    id: number;
    name: string;
    logo: string;
    form: string;
}

const Prediction = ({ fixture }: PredictionProp) => {
    const [match, setMatch] = useState<MatchData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        footballService.getMatchPrediction(fixture).then((data: any) => {
            // console.log(data);
            setMatch(data);
            setLoading(false);
        }).catch((err) => {
            console.log('err', err)
        })
    }, [fixture]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {match && match.length > 0 && match[0].predictions?.winner?.name} -
            {match && match.length > 0 && match[0].predictions?.winner?.comment !== null ? match[0].predictions?.winner?.comment : ' N/A'}
        </div>
    )
}

export default Prediction;