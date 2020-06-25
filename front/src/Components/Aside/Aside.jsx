// Dependencias
import React from 'react'
import Days from './Components/Days'
import { getNowYYYMMDD } from '../../Utils/Date'

// Estilo
import './scss/styles.scss'

/**
 * Renderizador de la cabecera.
 */
const Aside = ({ forecast }) => {
  const { city, weather } = forecast
  const { list } = weather

  const days = list ? getNextDays(list) : []

  return (
    <div className="card mt-5" id="aside">
      <div className="card-body">
        <h4 className="card-title text-center mb-5">Pronostico extendido de {city}</h4>

        {days.length > 0 && <Days days={days} />}
      </div>
    </div>
  )
}

function getNextDays(list) {
  const now = getNowYYYMMDD()
  const days = []

  list.map(value => {
    const day = value.dt_txt.substring(0, 10).replace(/-/g, '')
    const time = value.dt_txt.substring(11, 13)

    if (days[day] === undefined) {
      days[day] = []
    }

    if (day !== now && (time == '12' || time == '18' || time == '21')) {
      console.log(day, now, day !== now)

      days[day].push(value)
    }
  })

  return days.filter(day => day.length >= 3)
}

export default Aside
