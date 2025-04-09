import { useState, useEffect } from 'react'
import axios from 'axios'

function WeatherWidget() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('Tentando usar a chave API:', import.meta.env.VITE_WEATHER_API_KEY);
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/weather',
          {
            params: {
              q: 'Limoeiro,BR',
              appid: import.meta.env.VITE_WEATHER_API_KEY,
              units: 'metric',
              lang: 'pt_br'
            }
          }
        )
        setWeather(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Erro detalhado ao buscar previsão do tempo:', err);
        setError('Não foi possível carregar a previsão do tempo')
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p>Carregando previsão do tempo...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-wine-900">
            {weather.name}, {weather.sys.country}
          </h3>
          <p className="text-gray-600">
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
        </div>
        <div className="text-4xl text-wine-900">
          {Math.round(weather.main.temp)}°C
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-16 h-16"
          />
          <div>
            <p className="text-lg capitalize">
              {weather.weather[0].description}
            </p>
            <p className="text-gray-600">
              Sensação térmica: {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-gray-600">Umidade</p>
            <p className="font-semibold">{weather.main.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-600">Vento</p>
            <p className="font-semibold">{weather.wind.speed} km/h</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget