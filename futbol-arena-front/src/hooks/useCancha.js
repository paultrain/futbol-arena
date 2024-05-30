import { useContext } from 'react'
import { CanchaContext } from '../context/CanchaContext'
import { toast } from 'sonner'
import { UserContext } from '../context'
import { useNavigate } from 'react-router-dom'

export const useCancha = () => {
  const navigate = useNavigate()
    const { listaCanchas, horarios, handleTime, reservation, setReservation, addReservation, crearCancha, eliminarCancha, getCanchas, consultaApi } = useContext(CanchaContext)
    const {getUserData} = useContext(UserContext)

    const cancelReservation = () => {
      setReservation({
        ...reservation,
        reservation_time:''
      })
    }
    const sendReservation = async (data) => {
      toast.promise(addReservation(data),{
        loading: 'Reservando...',
        success: 'Reserva creada',
        error: 'Ocurrió un error'
      })
      setReservation({
        ...reservation,
        reservation_time:'',
        reservation_time_id:'',
        reservation_field_id:'',
        reservation_field_name:'',
      })
      await getUserData(reservation.user_id)
    }
    const handleSubmit = async (e, token) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const nuevaCancha = {
        cancha_nombre: formData.get('cancha_nombre'),
        cancha_detalle: formData.get('cancha_detalle'),
      }
      await crearCancha(nuevaCancha, token)
      await getCanchas()
      toast.success('Cancha agregada')
      navigate('/dashboard/listaCanchas')
    }

    const handleDelete = async(id,user) => {
      const { isAdmin } = user
      const respuesta = await eliminarCancha(id, isAdmin)
      toast.success(respuesta.message)
    }

  return {
    listaCanchas,
    horarios,
    handleTime,
    reservation,
    eliminarCancha,
    consultaApi,
    setReservation,
    cancelReservation,
    handleDelete,
    handleSubmit,
    sendReservation
  }
}
