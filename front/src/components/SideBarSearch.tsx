import { useEffect, useState } from "react";
import type { CityType } from "../types/geo";
import { useDebounce } from "../hooks/useDebounceLabels";

export type LabelSearch = {
  startWith: string;
  aviability: number;
  cityId: number|null;
  date: string|null
};

interface SideBarSearchProps {
  client: boolean;
  setCtrlCrtUpdtRestaurant: () => void;
  availabilityButton?: boolean;
  cities: CityType[];
  setLabels: React.Dispatch<React.SetStateAction<LabelSearch | null>>;
}

function SideBarSearch({
  client = true,
  setCtrlCrtUpdtRestaurant,
  availabilityButton = false,
  cities,
  setLabels,
}: SideBarSearchProps) {
  const [availability, setAvailability] = useState<number>(15);
  const [startWith, setStartWith] = useState<string>("");
  const [cityId, setCityId] = useState<number | null>(null);
  const[date, setDate] = useState<string | null>(null)

  const debouncedStartWith = useDebounce(startWith, 300);
  const debouncedAvailability = useDebounce(availability, 300);
  const debouncedCityId = useDebounce(cityId, 300);
  const deboundeDate = useDebounce(date,300);

  const cleanFilter = ()=>{
    setAvailability(15)
    setStartWith('')
    setCityId(0)
    setDate(new Date().toISOString().split("T")[0])
  }

  useEffect(()=>{
    setDate(new Date().toISOString().split("T")[0])
  },[])

  useEffect(() => {      
      setLabels({
        startWith: debouncedStartWith,
        aviability: debouncedAvailability,
        cityId: debouncedCityId,
        date: deboundeDate
      })
  }, [debouncedStartWith, debouncedAvailability, debouncedCityId,setLabels,deboundeDate]);

  return (
    <aside
      className={`
        lg:sticky lg:top-0 lg:left-0
        w-full lg:w-auto
        bg-white shadow-md shadow-gray-500
        p-4
      `}
    >
      <nav className="md:h-screen w-full overflow-hidden">
        <header className="flex flex-col items-center justify-center gap-2 mb-4">
          <span
            style={{ fontSize: "3rem" }}
            className="material-symbols-outlined text-blue-500"
          >
            restaurant
          </span>
          <h2 className="text-blue-600 text-2xl lg:text-3xl font-bold">
            Panel de Búsqueda
          </h2>
        </header>

        <div className="grid gap-1 mb-4">
          <label htmlFor="search-by-name">Buscar Por Nombre</label>
          <input
            id="search-by-name"
            type="text"
            disabled={!availabilityButton}
            placeholder="Ej: El amarradero del Mico"
            value={startWith}
            onChange={(e) => setStartWith(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:border-blue-700 focus:outline-none"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="city">Ciudad</label>
          <select
            id="city"
            disabled={!availabilityButton}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={(e) => setCityId(Number(e.target.value))}
          >
            <option value="">Selecciona una ciudad</option>
            {cities?.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name} - {city.deptName}
              </option>
            ))}
          </select>
        </div>

        

        {client && (
          <>
            <div className="grid gap-1 mb-4">
          <label htmlFor="search-by-date">Buscar disponibilidad por Fecha</label>
          <input
            id="search-by-date"
            type="date"
            value={date ?? ""}
            onChange={(e)=> setDate(e.target.value)}
            disabled={!availabilityButton}
            className="border border-gray-300 rounded px-2 py-1 focus:border-blue-700 focus:outline-none cursor-pointer"
          />
        </div>
          <div className="grid gap-2 mb-4">
            <label htmlFor="availability-range">
              Buscar por rango de disponibilidad de mesa
            </label>
            <div className="flex items-center gap-2">
              <input
                id="availability-range"
                type="range"
                min="0"
                max="15"
                step="3"
                list="values"
                value={availability}
                onChange={(e) => setAvailability(Number(e.target.value))}
                className="flex-1 cursor-pointer"
              />
              <span className="text-sm text-gray-600">{availability}</span>
            </div>
            <datalist id="values">
              <option value="0" label="0" />
              <option value="3" label="3" />
              <option value="6" label="6" />
              <option value="9" label="9" />
              <option value="12" label="12" />
              <option value="15" label="15" />
            </datalist>
          </div>
          </>
        )}

        <div className="flex flex-col items-center h-1/5 justify-between py-2">
          <button
              onClick={cleanFilter}
              className="text-white px-3 py-2 rounded bg-gray-500 hover:bg-gray-600 cursor-pointer w-full lg:w-auto"
            >
              Limpiear Filtros
          </button>
          {!client && (
            <div className="grid items-center">
              <p className="text-sm mb-1">
                Si no encontraste el restaurante puedes agregarlo
              </p>
              <button
                onClick={setCtrlCrtUpdtRestaurant}
                className="text-white px-3 py-2 rounded bg-green-500 hover:bg-green-600 cursor-pointer w-full lg:w-auto"
              >
                Agregar Restaurante
              </button>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}

export default SideBarSearch;
