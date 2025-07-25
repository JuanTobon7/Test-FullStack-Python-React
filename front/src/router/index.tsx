import { Route, Routes } from "react-router-dom";
import { ListRestaurants } from "../pages/RestaurantSearch";
import { AdminRestaurants } from "../pages/RestaurantAdmin";
import { ReservaPage } from "../pages/ReservationPage";

function Router(){
    return (
        <Routes>
            <Route path="/restaurantes" element={<ListRestaurants/>} />
            <Route path="/restaurantes/admin" element={<AdminRestaurants/>}/>
            <Route path="/reservas/:id"  element={<ReservaPage />} />

        </Routes>
    )
}

export default Router;