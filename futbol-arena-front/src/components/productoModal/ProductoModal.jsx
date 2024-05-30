import { createPortal } from "react-dom";
import { useProductoImg, useProductos } from "../../hooks";
import { toast } from "sonner";

export const ProductoModal = ({ producto, closeModal, setProducto }) => {
  const {handleEditar} = useProductos();
  const {handleProductoFile, productoCloudData, productoBlob} = useProductoImg()

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    })
  }
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    const nuevosDatos = {...producto, imagen: productoCloudData.url != '' ? productoCloudData.url : producto.imagen}
    toast.promise(handleEditar(nuevosDatos),{
        loading: 'Actualizando.. 🕐',
        success: 'Listo!! ⚽',
        error: 'Falta Juez! ❌, ocurrió un error!'
    })
    closeModal()
  };

  return (
    <>
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bg-black/30 left-0 top-0 flex h-screen w-screen items-center justify-center overflow-hidden z-[99999]"
        >
          <div className="relative flex max-w-md w-5/6 min-h-[400px] max-h-[600px] flex-col items-center justify-between rounded-md  bg-gray-300 font-bold shadow-md transition-all duration-300 overflow-hidden">
            <button
              onClick={closeModal}
              className="ms-auto me-5 mt-5 bg-text-200 text-white rounded-sm h-7 w-7 flex items-center justify-center "
            >
                X
            </button>
            <section className="w-full flex items-center justify-start gap-3 flex-col h-full">
              <form
                  onSubmit={handleModalSubmit}
                  className="flex flex-col items-center justify-center w-full mx-auto p-5 space-y-2"
              >
                  
                  <article className="w-full flex justify-center items-center flex-col">
                      <label
                          htmlFor="producto"
                          className="text-text-100 font-semibold"
                      >
                          Producto
                      </label>
                      <input
                          type="text"
                          name="producto"
                          placeholder={producto.producto}
                          onChange={handleChange}
                          value={producto.producto}
                          className="font-normal w-full p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
                      />
                  </article>
                  <article className=" w-full flex justify-center items-center flex-col">
                  <label
                      htmlFor="detalle"
                      className="text-text-100 font-semibold"
                  >
                      Detalle
                  </label>
                  <input
                      name="detalle"
                      placeholder={producto.detalle}
                      value={producto.detalle}
                      onChange={handleChange}
                      cols={30}
                      rows={5}
                      style={{ resize: "none" }}
                      className="font-normal w-full p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
                  />
                  </article>
                  <article className="w-full flex flex-col md:flex-row justify-center gap-1 items-center">
                  <div className="w-full sm:w-1/2 flex justify-center gap-1 items-center flex-col">
                      <label
                      htmlFor="categoria"
                      className="text-text-100 font-semibold"
                      >
                      Categoria
                      </label>
                      <input
                      type="text"
                      name="categoria"
                      placeholder={producto.categoria}
                      value={producto.categoria}
                      onChange={handleChange}
                      className="uppercase font-normal p-3 w-full focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
                      />
                  </div>
                  <div className="w-full sm:w-1/2 flex justify-center gap-1 items-center flex-col">
                      <label
                      className="text-text-100 font-semibold"
                      htmlFor="precio"
                      >
                      Precio
                      </label>
                      <input
                      type="number"
                      name="precio"
                      placeholder={`$${producto.precio}`}
                      value={producto.precio}
                      onChange={handleChange}
                      className="font-normal w-full p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
                      />
                  </div>
                  </article>
                  <div className=" w-full flex justify-center items-center flex-col">
                  <label htmlFor="imagen" className="py-2 px-8 inline-block cursor-pointer rounded-md bg-bg-200 font-bold text-text-200 shadow-md">Cambiar Imagen</label>
                  <input
                      type="file"
                      id="imagen"
                      name="imagen"
                      accept="image/png image/jpg image/jpeg"
                      className="w-0 h-0 opacity-0 outline-none text-gray-700 rounded-md my-2"
                      onChange={handleProductoFile}
                  />
                  <figure className="drop-shadow-md w-1/3 mx-auto min-h-20">
                      <img src={productoBlob ? productoBlob : producto.imagen} alt="producto imagen" />
                  </figure>
                  
                  </div>
                  {/* Botones */}
                  <div className="flex gap-4 mt-5">
                  <button
                      type="submit"
                      className="bg-accent-100 hover:bg-arena-green-500 text-white p-1 shadow-lg flex-1"
                  >
                      Guardar Cambios
                  </button>
                  <button
                      type="button"
                      onClick={closeModal}
                      className="bg-gray-400 shadow-md hover:bg-white hover:text-black text-white p-1 flex-1"
                  >
                      Cancelar
                  </button>
                  </div>
              </form>
            </section>
          </div>
        </div>,
        document.getElementById("modal")
      )}
    </>
  );
};
