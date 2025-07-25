import { useEffect, useState } from "react";
import type { ReservationType } from "../types/reservation";
import type { RestaurantType } from "../types/restaurant";

interface ReservationRestaurantProps extends RestaurantType {
  action: (id: string, reservation: ReservationType) => Promise<ReservationType|null>;
  date: string
  reservationBank: ReservationType[];
}

const generateTableLabels = () => {
  const letters = ['A', 'B', 'C', 'D'];
  const maxTables = 15;
  const table: string[] = [];
  let count = 0;

  for (const letter of letters) {
    for (let i = 0; i < 4; i++) {
      if (count >= maxTables) break;
      table.push(`${letter}${i}`);
      count++;
    }
    if (count >= maxTables) break;
  }

  return table;
};

export function ReservationRestaurant({
  id,
  name,
  address,
  city,
  description,
  date,
  reservationBank,
  action,
}: ReservationRestaurantProps) {
  const table = generateTableLabels();
  const available = 'bg-green-700 hover:bg-green-800 text-white';
  const notAvailable = 'bg-gray-400 text-white cursor-not-allowed';

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [ reservation, setReservation] = useState<ReservationType| null>(null)

  const isAvailable = (label: string) => {
    if (!Array.isArray(reservationBank)) return true;
    return !reservationBank.some((item) => item?.table === label);
  };

  const handleClick = (label: string) => {
    if (!isAvailable(label)) return;
    setSelectedTable(label);
    setModalOpen(true);
  };

  useEffect(()=>{
    const newReservation: ReservationType = {
      id: "",
      table: selectedTable??"",
      date: date,
      restaurantId: id
    };
    setReservation(newReservation);
  },[selectedTable,date,id])

  const handleSubmit = () => {
    if (!selectedTable || !reservation || !reservation?.table ) return;
    
    action(id, reservation);
    setModalOpen(false);
    setSelectedTable(null);
  };

  return (
    <section className="flex flex-col items-center justify-center w-full gap-6 p-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-600">{address}</p>
        <p className="text-gray-600">{city.name} - {city.deptName}</p>
        <p className="text-gray-600">{description}</p>
      </div>

      <span className="text-left text-sm text-gray-600 w-full md:w-1/2">
        Haz click para reservar la mesa deseada para la fecha {date}
      </span>

      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 w-full lg:w-1/2">
        {table?.map((label) => (
          <div
            key={label}
            onClick={() => handleClick(label)}
            className={
              (isAvailable(label) ? available : notAvailable) +
              ' font-bold flex flex-col items-center justify-center aspect-square text-4xl rounded-lg shadow-md w-full transition cursor-pointer'
            }
          >
            <span style={{ fontSize: '70px' }} className="material-symbols-outlined">
              table_restaurant
            </span>
            {label}
          </div>
        ))}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">Reservar mesa {selectedTable}</h3>
            <p>Restaurante: {name}</p>
            <p>Direccion: {address}</p>
            <p>Ciudad: {city.name} - {city.deptName}</p>
            <p>Fecha: {date}</p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setSelectedTable(null);
                }}
                className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded bg-green-700 hover:bg-green-800 text-white cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
