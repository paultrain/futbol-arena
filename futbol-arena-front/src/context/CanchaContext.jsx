/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const CanchaContext = createContext(null)

const apiRenderReservas = 'https://futbol-arena-back.onrender.com/api/reservations'

export const CanchaProvider = ({children}) => {
    const [horarios, setHorarios] = useState([])

    const [listaCanchas, setListaCanchas] = useState([])

    const [reservation, setReservation] = useState({
        reservation_date: '',
        reservation_time: '',
        reservation_field_id: '',
        user_id: ''
    })

    const getCanchas = async() => {
        const response = await fetch('https://futbol-arena-back.onrender.com/api/canchas/lista')
        const result = await response.json()
        setListaCanchas(result)
    }

    useEffect(()=>{
        getCanchas()
    },[])

    const consultaApi = async(reservation) =>{
        const {reservation_date, reservation_field_id} = reservation
        if(reservation_date != '' && reservation_field_id != ''){
            const responseTurnos = await fetch(`https://futbol-arena-back.onrender.com/api/canchas?fecha_buscada=${reservation_date}&cancha_id=${reservation_field_id}`)
            const resultTurnos = await responseTurnos.json()
            
            setHorarios(resultTurnos)
        }
    }

    const addReservation = async (reservation) => {
        const newReservation = {
            reservation_date: reservation.reservation_date,
            reservation_field_id: reservation.reservation_field_id,
            reservation_time_id: reservation.reservation_time.turnoId,
            reservation_time: reservation.reservation_time.hora,
            user_id: reservation.user_id
        }
        try{
            const response = await fetch(apiRenderReservas, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newReservation)
            })
            if(!response.ok) {
                const result = await response.json()
                throw new Error(result.message)
            }
            const result = await response.json()
            await consultaApi(reservation)
            return result
        }catch(error){
            throw new Error(error)
        }
    }

    const crearCancha = async(cancha, token) =>{
        try{
            const response = await fetch('https://futbol-arena-back.onrender.com/api/canchas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(cancha)
            })
            const result = await response.json()
            console.log(result)
        }catch(error){
            throw new Error(error)
        }
    }

    const eliminarCancha = async(cancha_id, isAdmin) => {
        try{
            const response = await fetch(`https://futbol-arena-back.onrender.com/api/canchas/${cancha_id}`,{
                method:'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"isAdmin":isAdmin})
            })
            const result = await response.json()
            await getCanchas()
            return result
        }catch(error){
            throw new Error(error)
        }
    }

    return (
        <CanchaContext.Provider
            value={{
                listaCanchas,
                horarios,
                reservation,
                setReservation,
                consultaApi,
                addReservation,
                crearCancha,
                eliminarCancha,
                getCanchas
            }}>
            {children}
        </CanchaContext.Provider>
    )
}