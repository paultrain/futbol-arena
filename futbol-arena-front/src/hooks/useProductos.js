import { useContext, useState } from 'react'
import { ProductosContext } from '../context/ProductosContext'
import { UserContext } from '../context'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const useProductos = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const {productos, agregarCarrito, carrito, eliminarProducto, obtenerProductos, agregarProducto, editarProducto} = useContext(ProductosContext)
    const {usuarioToken} = useContext(UserContext)
    const [productoData, setProductoData] = useState({
        producto: "",
        detalle: "",
        categoria: "",
        imagen: "",
        precio: 0,
      });
    const handleDelete = async (id, token) => {
        toast.promise(eliminarProducto(id, token),{
            loading:'Eliminando',
            success: 'Producto Eliminado',
        })
        await obtenerProductos()
    }

    const handleSubmit = async (e, productoCloudData) => {
        e.preventDefault()
        const newProducto = {
            ...productoData,
            imagen: productoCloudData.url
        }
        const {producto, detalle, precio, categoria, imagen} = newProducto
        if(!producto || !detalle || !precio | !categoria || !imagen) {
            setError(true)
            setTimeout(()=>{
                setError(false)
            },1000)
            return 
        }
    
        try{
            await agregarProducto(newProducto, usuarioToken)
            await obtenerProductos()
            toast.success('Producto agregado')
            navigate('/dashboard/listaProductos')
        }catch(error){
            toast.error(error.message)
        }
    }

    const handleEditar = async (producto) => {
        try{
            await editarProducto(usuarioToken, producto)
            await obtenerProductos()
        }catch(error){
            throw new Error(error)
        }
    }
    return {
        productos,
        agregarCarrito,
        setProductoData,
        productoData,
        carrito,
        error,
        obtenerProductos,
        handleDelete,
        handleEditar,
        handleSubmit,
    }
}
