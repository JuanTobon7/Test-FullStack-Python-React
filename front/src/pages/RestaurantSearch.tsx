import { useEffect, useState } from "react";
import SideBarSearch from "../components/SideBarSearch";
import type { LabelSearch } from "../components/SideBarSearch";
import { RestaurantCard } from "../components/RestaurantCard";
import { ReservationRestaurant } from "../components/ReservationRestaurant";
import type { RestaurantType } from "../types/restaurant";
import { api, ResponseStatus, type ApiResponse } from "../api";
import type { ReservationType } from "../types/reservation";
import type { CityType } from "../types/geo";
import { useDebounce } from "../hooks/useDebounceLabels";
import { AxiosError, isAxiosError } from "axios";
import { NotFoundAnimation } from "../animation/errorAnimation";

async function getRestaurants(label: LabelSearch|null): Promise<RestaurantType[]> {
  const params = new URLSearchParams();

  if(label?.date !== undefined && label.date != null){
    const formatedDate = new Date(label.date).toISOString().split("T")[0];
    params.append("date",formatedDate);
  }

  if (label?.startWith) {
    params.append("startWith", label.startWith);
  }

  if (label?.aviability !== undefined || label?.aviability == 0) {
    params.append("aviability", String(label.aviability));
  }

  
  if (label?.cityId !== undefined && label?.cityId != null) {
    params.append("cityId", String(label.cityId));
    }

  const stringUrl = `/admin/restaurant?${params.toString()}`;

  const res = await api.get<ApiResponse<RestaurantType[]>>(stringUrl);

  if (res instanceof AxiosError) {
    return [];
  }

  return res.data.data;
}
async function getReservations(restaurant:RestaurantType,date: string): Promise<ReservationType[]> {
  const res = await api.get<ApiResponse<ReservationType[]>>(`/admin/restaurant/${restaurant.id}/reservations?date=${date}`);
  if (res.data.status !== ResponseStatus.SUCCESS) {
    return []
  }
  return res.data.data;
}

async function getDeptCities(): Promise<CityType[]> {
  try {
    const res = await api.get<ApiResponse<CityType[]>>("/cities");
    return res.data.data;
  } catch (error) {
    console.error(error)
    return []  
  }
}

async function createReservation(id: string, reservation: ReservationType,): Promise<ReservationType | null> {
  try {
    const res = await api.post<ApiResponse<ReservationType>>(`/admin/restaurant/${id}/reservations`, reservation);
    console.log(res)
    if (res.data.status !== ResponseStatus.SUCCESS) {
      return null;
    }
    return res.data.data;
  } catch (error) {
    if(isAxiosError(error)){
      alert(error.response?.data.data)
    }
    return null
  }
}

export function ListRestaurants() {
  const [restaurant, setRestaurant] = useState<RestaurantType|null>(null);
  const [restaurantsBank, setRestaurantsBank] = useState<RestaurantType[]|null>([]);
  const [reservationBank, setReservationBank] = useState<ReservationType[]>([])
  const [cities, setCities ] = useState<CityType[]>([])
  const [loadingBank, setLoadingBank] = useState<boolean>(true)
  const [label, setLabels] = useState<LabelSearch | null>(null)
  const debounceSearch = useDebounce(label,400)
  const handleBack = () => {
    setRestaurant(null);
  };

    useEffect(() => {
        console.log(debounceSearch)
        if (!debounceSearch || !debounceSearch.date ) return;

         const fetchRestaurants = async () => {
            try {            
                const response = await getRestaurants(debounceSearch);
                setRestaurantsBank(response);
            } catch (error) {
                console.error(error)
                setLabels(null)
                setRestaurantsBank(null)
            }
        };
        fetchRestaurants()
    }, [debounceSearch]);



  useEffect(() => {
    const fetchCities = async () => {
        const response = await getDeptCities()
        
        setCities(response)
    }
    fetchCities()
  }, []);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        setLoadingBank(false)
      if (!restaurant || !label?.date) return;
      const response = await getReservations(restaurant,label.date);      
      setReservationBank(response);
      } catch (error) {
        console.error(error)
      setReservationBank([])        
      }finally{
        setLoadingBank(true)
      }
    };
    fetchReservation();
  }, [restaurant,label]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-2">
      <aside className="md:col-span-2 lg:col-span-1">
        <SideBarSearch client={true} setCtrlCrtUpdtRestaurant={()=>{return}} cities={cities} availabilityButton={!restaurant} setLabels={setLabels}/>
      </aside>

      <section className="col-span-1 md:col-span-4 lg:col-span-5">
          {!restaurantsBank && (
                  <NotFoundAnimation/>
                )}
        {!restaurant && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full">
            {restaurantsBank?.map((item) => (
              <RestaurantCard
                action={setRestaurant}
                deleteAction={()=>{}}
                key={item.id}
                {...item}
                client={true}
              />
            ))}
          </div>
        )}
          { restaurant && loadingBank && (
          <div className="relative container mx-auto flex flex-col gap-4 items-center">
            <button
              onClick={handleBack}
              className="absolute left-2 top-4 text-blue-600 hover:text-blue-800 cursor-pointer"
            >
              Volver
            </button>
            <ReservationRestaurant {...restaurant} date={label?.date ?? ""} action={createReservation} reservationBank={reservationBank}/>
          </div>
        )}
      </section>
    </div>
  );
}
