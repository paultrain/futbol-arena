import { useEffect } from "react";
import { useUser } from "../../hooks";
import { toast } from "sonner";

export const FieldComps = ({setReservation, reservation, consultaApi, listaCanchas}) => {
  const {usuario} = useUser()

  const handleField = (ev) => {  
    setReservation({
        ...reservation,
        reservation_field_id: ev.target.id,
        user_id: usuario.user_id
    })
  }
  useEffect(()=>{
    if(reservation.reservation_field_id != '' && reservation.reservation_date != ''){
      toast.promise(consultaApi(reservation),{
          loading: 'Cargando reservas...'
        }
      )
    }
  },[reservation])

  return (
      <section className="w-full max-w-sm p-4 bg-bg-300 rounded-lg shadow sm:p-6">
        <h2 className="mb-3 text-base font-bold text-text-200">
          Selecciona tu cancha
        </h2>
            {
              reservation?.reservation_date != ''
              ?
                <ul className="my-4 space-y-3">
                  {
                    listaCanchas?.map(cancha => (
                    <li className="flex items-center p-3 text-base font-bold rounded-lg bg-primary-100 text-text-100 hover:bg-accent-100 active:bg-arena-green-100 group hover:shadow cursor-pointer"
                      key={cancha.cancha_id}
                      id={cancha.cancha_id}
                      onClick={handleField}>
                      {cancha.cancha_nombre}
                    </li>

                    ))
                  }
                </ul>
              : <p className="font-bold text-text-200">Debe seleccionar una fecha</p>
            }
      </section>
  );
};
