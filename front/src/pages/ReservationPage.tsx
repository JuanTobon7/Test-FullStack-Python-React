import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { RestaurantType } from "../types/restaurant";
import type { ReservationType } from "../types/reservation";
import { api, ResponseStatus, type ApiResponse } from "../api";

async function getReservations(restaurant: RestaurantType): Promise<ReservationType[]> {
  try {
    const date = new Date().toISOString().split("T")[0];
    const res = await api.get<ApiResponse<ReservationType[]>>(
      `/admin/restaurant/${restaurant.id}/reservations/${date}`
    );
    if (res.data.status !== ResponseStatus.SUCCESS) return [];
    return res.data.data;
  } catch (error) {
    console.log(error)
    return []
  }
}

export  function ReservaPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const MIN_LOADING_TIME = 2000;
      const startTime = Date.now();

      const data = location.state?.restaurant as RestaurantType | undefined;
      if (!data) {
        navigate("/restaurantes/admin", { replace: true });
        return;
      }

      setRestaurant(data);
      const res = await getReservations(data);
      setReservations(res);

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    load();
  }, [location.state, navigate]);

  if (loading || !restaurant) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Cargando reservas...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Reservas para {restaurant.name}
      </h2>
      <p className="text-center text-sm text-gray-500">
        {restaurant.address} - {restaurant.city.name}, {restaurant.city.deptName}
      </p>

      {reservations.length > 0 ? (
        <ul className="grid gap-4">
          {reservations.map((r) => (
            <li
              key={r.id}
              className="border border-gray-200 shadow rounded-lg p-4"
            >
              <p><strong>Mesa:</strong> {r.table}</p>
              <p><strong>Fecha:</strong> {new Date(r.date).toLocaleString()}</p>
              <p><strong>Restaurante:</strong> {restaurant.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No hay reservas aún.</p>
      )}
    </div>
  );
}
