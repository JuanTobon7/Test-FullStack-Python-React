import type { CityType } from "./geo"

export type RestaurantType  = {
    id: string
    name: string
    address: string
    city: CityType
    description: string
    photoUrl: string
}