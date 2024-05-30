import { Datepicker } from "flowbite-react";
import { theme } from "./pickerTheme";
import { convertDate } from "../../utils/convertDate";
export const DatePicker = ({reservation, setReservation}) => {

  
  const handleDate = (date) => {
    const newDate = convertDate(date)
    setReservation({
        ...reservation,
        reservation_date: newDate
    })
  }

  return (
    <section className="w-full max-w-sm p-4 bg-bg-300 rounded-lg shadow sm:p-6">
      <h2 className="text-text-200 font-bold text-center">Selecciona una fecha</h2>
        <Datepicker 
          id='date'
          theme={theme}
          className="flex justify-center items-center"
          language="es-AR"
          labelTodayButton="Hoy"
          minDate={new Date(Date.now())}
          showClearButton={false}
          onSelectedDateChanged={handleDate}
          inline />
    </section>
  );
};
