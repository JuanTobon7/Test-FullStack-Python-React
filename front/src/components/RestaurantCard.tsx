import type React from "react";
import type { RestaurantType } from "../types/restaurant";
import { Link } from "react-router-dom";
interface RestaurantCardProps extends RestaurantType {
  client: boolean;
  action: React.Dispatch<React.SetStateAction<RestaurantType | null>>
  deleteAction: React.Dispatch<React.SetStateAction<boolean>>
}
export function RestaurantCard({ id, name, address, city,description,photoUrl, client, action,deleteAction}: RestaurantCardProps) {
  const hanldeSetRestaurant = () => {
    const data : RestaurantType = {
      id: id,
      name: name,
      address:address,
      city: city,      
      description: description,
      photoUrl: photoUrl
    }
    action(data)
  }

  const handleDelete = () => {
      hanldeSetRestaurant()
      deleteAction(true)
  }
  
  return (
    <article
      key={id}
      className="ring ring-gray-200 rounded-lg shadow shadow-gray-400 p-4 flex flex-col gap-2 hover:shadow-md transition-shadow duration-100 ease-in w-full h-full"
    >
      <header className="relative">
        <div className="flex flex-col justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            {photoUrl?(
              <img src={photoUrl} className="w-20 h-20" />
            ):(
              <span style={{ fontSize: "3rem" }} className="material-symbols-outlined text-blue-500">
                restaurant
              </span>
            )}
        </div>
        {!client&&(
            <div className="absolute top-0 right-0 grid gap-2">
            <button onClick={handleDelete} className="material-symbols-outlined text-red-500 border border-red-500 p-1 rounded-full hover:bg-red-100 cursor-pointer transition">
                delete
            </button>
            <button onClick={hanldeSetRestaurant} className="material-symbols-outlined text-orange-500 border border-orange-500 p-1 rounded-full hover:bg-orange-100 cursor-pointer transition">
                edit
            </button>
        </div>
        )}
        
      </header>

      <section className="text-sm text-gray-600">
        <p>
          <strong>Dirección:</strong> {address}
        </p>
        <p>
          <strong>Ciudad:</strong> {city?.name ?? "N/A"} - {city?.deptName ?? "N/A"}
        </p>
        <p>
          <strong>Descripcion: </strong> {description}
        </p>
      </section>

      <footer className="flex items-center justify-center">
        {client?(
          <button onClick={hanldeSetRestaurant} className="flex items-center justify-between bg-green-500 text-white px-2 py-1 rounded-md gap-2 hover:bg-green-600 cursor-pointer">
              Reservar
            <span className="material-symbols-outlined">{client?'check':'visibility'}</span>
          </button>
        ):(
           <Link
              to={`/reservas/${id}`}
              state={{ restaurant: { id, name, city, address, description } }}
              className="flex items-center justify-between bg-green-500 text-white px-2 py-1 rounded-md gap-2 hover:bg-green-600 cursor-pointer"
            >
              Mirar Reservas
              <span className="material-symbols-outlined">
                visibility
              </span>
            </Link>
        )}      
        </footer>
    </article>
  );
}
