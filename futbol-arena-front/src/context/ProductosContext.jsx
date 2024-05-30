/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const ProductosContext = createContext()

const renderApi = 'https://futbol-arena-back.onrender.com/api/products'

export const ProductosProvider = ({children}) => {
    const [productos, setProductos] = useState([])
    const [carrito, setCarrito] = useState([])

    const agregarProducto = async (producto, token) =>{
        try {
            const response = await fetch(renderApi,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(producto)
            })
            if(!response.ok) throw new Error(response.statusText)
            const result = await response.json()
            return result
        } catch (error) {
            throw new Error(error)
        }
    }
    const eliminarProducto = async (prod_id, token) =>{
        try {
            const response = await fetch(`${renderApi}/${prod_id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            const result = await response.json()
            await obtenerProductos()
            return result
        } catch (error) {
            throw new Error(error)
        }
    }
    const editarProducto = async(token, producto) => {
        const response = await fetch(`${renderApi}/${producto.producto_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(producto)
        })
        const result = await response.json()
        return result
    }
    const obtenerProductos = async () =>{
        const response = await axios.get(renderApi)
        setProductos(response.data)
    }

    const agregarCarrito = (producto) => {
        const productoIdx = carrito.findIndex(item => item.producto_id === producto.producto_id)
        toast.success('Producto Agregado...')
        if(productoIdx >= 0){
            const newCarrito = structuredClone(carrito)
            newCarrito[productoIdx].cantidad++
            setCarrito(newCarrito)
        }else{
            producto.cantidad = 1
            setCarrito([
                ...carrito,
                producto
            ])
        }
    }
    const eliminarCarrito = (producto_id) => {
        const newCarrito = carrito.filter(item => item.producto_id !== producto_id)
        toast.error('Producto eliminado')
        setCarrito(newCarrito)
    }
    
    
    useEffect(()=>{
      obtenerProductos()
    },[])

    return (
        <ProductosContext.Provider value={{
            agregarProducto,
            eliminarProducto,
            editarProducto,
            agregarCarrito,
            eliminarCarrito,
            obtenerProductos,
            setCarrito,
            carrito,
            productos,
        }}>
            {children}
        </ProductosContext.Provider>
    )
}