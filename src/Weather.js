import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Toronto');  // Default city
    const [loading, setLoading] = useState(true);

    // Directly using your API key
    const API_KEY = '286f9d403d8f5f626db9992211e74780';  // Your new API key

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                setWeatherData(null);  // Ensure we show no data when there's an error
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city]);  // Fetch weather data whenever the city changes

    return (
        <div className="weather-container">
            <h1>Weather App</h1>

            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}  // Update city when input changes
                placeholder="Enter city"
            />

            {loading ? (
                <p className="loading">Loading...</p>
            ) : weatherData ? (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>{weatherData.weather[0].description}</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                    />
                </div>
            ) : (
                <p className="no-data">No data found for the city</p>
            )}
        </div>
    );
};

export default Weather;
