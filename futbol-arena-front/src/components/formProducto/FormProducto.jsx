import { useProductoImg, useProductos } from "../../hooks";
import { Button } from "../button/Button";

export const FormProducto = () => {
  const { productoBlob, productoCloudData, handleProductoFile } =
    useProductoImg();
  const { handleSubmit, error, setProductoData, productoData } = useProductos();
  
  const handleChange = (e) => {
    setProductoData({
      ...productoData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="h-full rounded-md bg-bg-100 space-y-5 p-3 py-10 md:p-10">
      <h1 className="font-semibold text-text-100 text-5xl">El Complejo</h1>
      <p className="text-text-200 font-semibold ">Administra tus Productos</p>
      <div className="flex flex-col w-full bg-bg-200 rounded-md p-5 h-fit justify-center space-y-10 items-center">
        <form
          onSubmit={(e)=>handleSubmit(e, productoCloudData)}
          className="flex flex-col items-center gap-4 justify-center w-full"
        >
          {error && (
            <p className="bg-red-400 font-semibold p-5 rounded-md">
              Todos los campos son obligatorios
            </p>
          )}
          <article className="w-full flex justify-center gap-5 items-center flex-col sm:flex-row">
            <label
              htmlFor="producto"
              className="text-text-100 font-semibold sm:w-1/6"
            >
              Producto
            </label>
            <input
              type="text"
              name="producto"
              placeholder="Producto"
              onChange={handleChange}
              maxLength={30}
              value={productoData.producto}
              className="sm:w-5/6 w-full sm:ms-5 p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
            />
          </article>
          <article className=" w-full flex justify-center gap-5 items-center flex-col sm:flex-row">
            <label
              htmlFor="detalle"
              className="text-text-100 font-semibold sm:w-1/6"
            >
              Detalle
            </label>
            <input
              name="detalle"
              placeholder="Detalle de producto"
              onChange={handleChange}
              value={productoData.detalle}
              maxLength={30}
              cols={30}
              rows={5}
              style={{ resize: "none" }}
              className="sm:w-5/6 w-full sm:ms-5 p-3 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
            />
          </article>
          <article className="w-full flex flex-col md:flex-row justify-center gap-1 items-center">
            <div className="w-full sm:w-1/2 flex justify-center gap-1 items-center flex-col sm:flex-row">
              <label
                htmlFor="categoria"
                className="text-text-100 font-semibold sm:w-1/6"
              >
                Categoria
              </label>
              <input
                type="text"
                name="categoria"
                placeholder="Categoria"
                value={productoData.categoria}
                maxLength={15}
                onChange={handleChange}
                className="sm:w-5/6 p-3 w-full sm:ms-5 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md"
              />
            </div>
            <div className="w-full sm:w-1/2 flex justify-center gap-1 items-center flex-col sm:flex-row">
              <label
                className="text-text-100 font-semibold sm:w-1/6"
                htmlFor="precio"
              >
                Precio
              </label>
              <input
                type="number"
                name="precio"
                onChange={handleChange}
                value={productoData.precio}
                max={20000}
                placeholder="$2000"
                className="sm:w-5/6 w-full p-3 focus:outline-arena-green-400 outline-none text-gray-700 sm:ms-5 rounded-md"
              />
            </div>
          </article>
          <div className=" w-full flex justify-center gap-5 items-center flex-col">
            <label
              htmlFor="imagen"
              className="py-2 px-8 inline-block cursor-pointer rounded-md bg-bg-200 font-bold text-text-200 shadow-md"
            >
              Agregar Imagen
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/png image/jpg image/jpeg"
              placeholder="Imagen"
              className="w-0 h-0 opacity-0 focus:outline-arena-green-400 outline-none text-gray-700 rounded-md hidden"
              onChange={handleProductoFile}
            />
            {productoBlob ? (
              <figure className="w-1/3 mx-auto min-h-20">
                <img
                  src={productoBlob}
                  alt="producto imagen"
                  className="drop-shadow-lg"
                />
              </figure>
            ) : (
              <p className="text-arena-green-950">
                Agregue una imagen para el producto
              </p>
            )}
          </div>
          <div className="flex gap-4 mt-5">
            <Button type="submit" mode="accent" text="Agregar Producto" />
            <Button type="reset" mode="" text="Borrar Formulario" />
          </div>
        </form>
      </div>
    </div>
  );
};
