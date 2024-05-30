import { useCancha, useUser } from "../../hooks"
import { Button } from "../button/Button"

export const FormCancha = () => {

  const {usuarioToken} = useUser()
  const {handleSubmit} = useCancha()

  return (
    <div className="h-screen rounded-md bg-bg-100 space-y-5 p-10">
        <h1 className="font-semibold text-text-100 text-5xl">El Complejo</h1>
        <p className="text-text-200 font-semibold ">Administra tus Canchas</p>
        <div className="flex flex-col w-full bg-bg-200 rounded-md p-5 h-fit justify-center space-y-10 items-center">
            <form onSubmit={(e)=> handleSubmit(e,usuarioToken)} className="flex flex-col gap-4 justify-center w-full ">
                <input
                    type="text"
                    name="cancha_nombre"
                    placeholder="Nombre de Cancha"
                    className="p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
                />
                <textarea
                    name="cancha_detalle"
                    placeholder="Detalle de cancha"
                    cols={30}
                    rows={5}
                    style={{resize: "none"}}
                    className="p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
                />
                <div className="flex gap-4 mt-5 flex-col sm:flex-row">
                    <Button type='submit' mode='accent' text='Agregar Cancha'/>
                    <Button type='button' mode='' text='Borrar Formulario'/>
                </div>
            </form>
        </div>
    </div>
  )
}
