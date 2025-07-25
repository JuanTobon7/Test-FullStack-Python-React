// pages/ListRestaurants.tsx
import SideBarSearch, { type LabelSearch } from "../components/SideBarSearch";
import type { RestaurantType } from "../types/restaurant";
import { RestaurantCard } from "../components/RestaurantCard";
import { useCallback, useEffect, useState } from "react";
import { RestaurantForm } from "../components/CreateUpdateRestaurant";
import { api } from "../api";
import { ResponseStatus, type ApiResponse } from '../api';
import type { CityType } from "../types/geo";
import { useDebounce } from "../hooks/useDebounceLabels";
import { NotFoundAnimation } from "../animation/errorAnimation";

type RestaurantFormData = Omit<RestaurantType, "id" | "city"> & { cityId: number };

async function getRestaurants(label: LabelSearch | null): Promise<RestaurantType[]> {
    try {
    const params = new URLSearchParams();

    if (label?.startWith) {
        params.append("startWith", label.startWith);
    }

    if (label?.cityId !== undefined && label.cityId != null) {
        params.append("cityId", String(label.cityId));
    }

    const stringUrl = `/admin/restaurant?${params.toString()}`;
    const res = await api.get<ApiResponse<RestaurantType[]>>(stringUrl);

    return res.data.data;
   } catch (error) {
    console.error(error)
        return []
    }
}

async function getDeptCities(): Promise<CityType[]> {
  const res = await api.get<ApiResponse<CityType[]>>("/cities");
  if (res.data.status !== ResponseStatus.SUCCESS) {
    throw new Error(res.data.message);
  }
  return res.data.data;
}

async function updateRestaurant(restaurantId: string, data: Partial<RestaurantType>) {
  const response = await api.put<ApiResponse<RestaurantType>>(`/admin/restaurant/${restaurantId}`, data);
  return response.data.data;
}

async function createRestaurant(data: RestaurantFormData) {
  const response = await api.post<ApiResponse<RestaurantType>>('/admin/restaurant', data);
  return response.data.data;
}

async function deleteRestaurant(id: string) {
  const response = await api.delete<ApiResponse>(`/admin/restaurant/${id}`);
  return response.data.data;
}

function DeleteModal({
  data,
  onCancel,
  onConfirm
}: {
  data: RestaurantType;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-red-700">¿Eliminar restaurante?</h2>
        <p className="text-sm text-gray-700">Nombre: <strong>{data.name}</strong></p>
        <p className="text-sm text-gray-700">Dirección: {data.address}</p>
        <p className="text-sm text-gray-700">Ciudad: {data.city.name} - {data.city.deptName}</p>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}


export function AdminRestaurants() {
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [restaurantsBank, setRestaurantsBank] = useState<RestaurantType[]|null>();
  const [cities, setCities] = useState<CityType[]>([]);
  const [ctrlCrtUpdtRestaurant, setCtrlCrtUpdtRestaurant] = useState<boolean>(false);
  const [label, setLabels] = useState<LabelSearch | null>(null);
  const [deleteCtrl, setDeleteCtrl] = useState<RestaurantType | null>(null);

  const debounceSearch = useDebounce(label, 400);

  const handleClose = () => {
    setCtrlCrtUpdtRestaurant(false);
    setRestaurant(null);
  };

  const reloadData = useCallback(async () => {
        if (!debounceSearch) return;
        try {
        const response = await getRestaurants(debounceSearch);
        if(response.length == 0) throw new Error('No hay restauranes registrados')
        setRestaurantsBank(response);
        } catch (error) {
        console.error(error);
        setLabels(null);
        setRestaurantsBank([]);
        }
  },[debounceSearch])

  useEffect(() => {
    if (!debounceSearch) return;
    reloadData();
  }, [debounceSearch,reloadData]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const citiesRes = await getDeptCities();        
        setCities(citiesRes);
        const restaurantes = await getRestaurants(null)
        setRestaurantsBank(restaurantes)
      } catch (e) {
        console.error("Failed to fetch:", e);
        setRestaurantsBank(null);
      }
    };
    fetchAll();
  }, []);

 
  const handleSubmit = async (data: RestaurantFormData) => {
    if (restaurant) {
      await updateRestaurant(restaurant.id, data);
    } else {
      await createRestaurant(data);
    }
    setCtrlCrtUpdtRestaurant(false);
    setRestaurant(null);
    reloadData();
  };

  const handleDelete = async () => {
    if (deleteCtrl) {
      await deleteRestaurant(deleteCtrl.id);
      setDeleteCtrl(null);
      reloadData();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-2">
      <aside className="md:col-span-2 lg:col-span-1">
        <SideBarSearch
          client={false}
          cities={cities}
          setLabels={setLabels}
          availabilityButton={!ctrlCrtUpdtRestaurant}
          setCtrlCrtUpdtRestaurant={() => setCtrlCrtUpdtRestaurant(true)}
        />
      </aside>

      <section className="col-span-1 md:col-span-4 lg:col-span-5">
        {!restaurantsBank && (
            <NotFoundAnimation/>
        )}
        {!ctrlCrtUpdtRestaurant && !restaurant && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
            {restaurantsBank?.map((item) => (
              <RestaurantCard
                key={item.id}
                {...item}
                client={false}
                deleteAction={() => setDeleteCtrl(item)}
                action={setRestaurant}
              />
            ))}
          </div>
        )} 
        { (ctrlCrtUpdtRestaurant &&  !deleteCtrl || restaurant ) &&(
          <div className="relative container mx-auto flex items-center">
            <button
              onClick={handleClose}
              className="absolute left-2 top-4 text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Volver
            </button>
            <RestaurantForm
              cities={cities}
              onSubmit={handleSubmit}
              restaurantProp={restaurant}
            />
          </div>
        )}       
      </section>

      {deleteCtrl && (
        <>
        <DeleteModal
          data={deleteCtrl}
          onCancel={() => setDeleteCtrl(null)}
          onConfirm={handleDelete}
          />
          </>        
      )}      
    </div>
  );
}
