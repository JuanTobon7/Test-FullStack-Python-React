import { useState, memo } from "react";
import type { RestaurantType } from "../types/restaurant";
import type { CityType } from "../types/geo";

interface RestaurantFormProps {
  onSubmit: (data: Omit<RestaurantType, "id" | "city"> & { cityId: number }) => void;
  restaurantProp?: RestaurantType | null;
  cities: CityType[];
}

export const RestaurantForm = memo(function RestaurantForm({
  onSubmit,
  restaurantProp,
  cities,
}: RestaurantFormProps) {
  const [newRestaurant, setNewRestaurant] = useState({
    name: restaurantProp?.name ?? "",
    address: restaurantProp?.address ?? "",
    cityId: restaurantProp?.city?.id ?? 0,
    description: restaurantProp?.description ?? "",
    photoUrl: restaurantProp?.photoUrl ?? ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, address, cityId, description,photoUrl } = newRestaurant;
    if (!name || !address || !cityId || !description) {
      alert("Todos los campos son requeridos");
      return;
    }
    onSubmit({ name, address, cityId, description,photoUrl });
    setNewRestaurant({
        name: "",
        address: "",
        cityId: 0,
        description: "",
        photoUrl: ""
    })
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {restaurantProp ? "Editar Restaurante" : "Crear Restaurante"}
      </h2>
      <div className="flex items-center justify-center">
        {newRestaurant && newRestaurant.photoUrl ?(
          <img src={newRestaurant.photoUrl} className="w-40 h-40 roundend-md" />
        ):(
          <span style={{ fontSize: "8rem" }} className="material-symbols-outlined text-blue-500">
                  restaurant
              </span>
        )}
      </div>
      <div className="grid gap-1">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          value={newRestaurant.name}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, name: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: La Hamburguesería"
        />
      </div>

      <div className="grid gap-1">
        <label htmlFor="address">Dirección</label>
        <input
          id="address"
          value={newRestaurant.address}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, address: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Calle 123 #45-67"
        />
      </div>

      <div className="grid gap-1">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={newRestaurant.description}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, description: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Restaurante de hamburguesas artesanales"
        />
      </div>

      <div className="grid gap-1">
        <label htmlFor="city">Ciudad</label>
        <select
          id="city"
          value={newRestaurant.cityId}
          onChange={(e) =>
            setNewRestaurant({ ...newRestaurant, cityId: Number(e.target.value) })
          }
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona una ciudad</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name} - {city.deptName}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <label htmlFor="photo">Url de la Foto</label>
        <input
          id="description"
          value={newRestaurant.photoUrl}
          onChange={(e) => setNewRestaurant({ ...newRestaurant, photoUrl: e.target.value })}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ej: Restaurante de hamburguesas artesanales"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {restaurantProp ? "Guardar Cambios" : "Crear Restaurante"}
      </button>
    </form>
  );
});
