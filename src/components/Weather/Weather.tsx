import { useState, useEffect } from 'react';
import { TiWeatherCloudy } from "react-icons/ti";

// @ts-ignore
import * as WeatherService from '../../services/weather.js';

interface WeatherProps {
    location: LocationProps;
    current: Current;
    city: string;
}

type Current = {
    temp_c: string;
    temp_f: string;
    condition: Condition;
}

type Condition = {
    text: string;
    icon: string;
}

type LocationProps = {
    location: string;
    name: string;
}

const Weather = ({ city }: WeatherProps) => {
    const [weather, setWeather] = useState<WeatherProps>();

    useEffect(() => {
        WeatherService.getCurrentWeather(city).then((data: WeatherProps) => {
            setWeather(data);
        }).catch((err: any) => console.log(err));
    }, [city]);


    return (
        <div className='flex items-center'>
            <div className='mr-2'>
                {weather ? <TiWeatherCloudy /> : 'N/A'}
            </div>
            <div className='mr-2'>
                {weather ? weather.current.condition.text : 'Loading weather...'}
            </div>

            <div className='flex'>
                <div className='mr-1'>
                    {weather?.current.temp_c}C
                    /
                </div>
                <div>
                    {weather?.current.temp_f}F
                </div>
            </div>
        </div>
    );
}

export default Weather;
