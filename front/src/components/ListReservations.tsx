import type { ReservationType } from "../types/reservation";

interface ReservationListProps {
  reservations: ReservationType[];
  restaurantName: string;
}

export function ReservationList({
  reservations,
  restaurantName,
}: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md shadow">
        No reservations found for <strong>{restaurantName}</strong>.
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-md shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Reservations for {restaurantName}
      </h2>

      <ul className="space-y-2">
        {reservations.map((reservation) => (
          <li
            key={reservation.id ?? Math.random()}
            className="border border-gray-200 rounded p-3"
          >
            <p><strong>Table:</strong> {reservation.table}</p>
            <p><strong>Date:</strong> {reservation.date}</p>
            <p><strong>Reservation ID:</strong> {reservation.id ?? "N/A"}</p>
            <p className="text-sm text-gray-500">
              <strong>Restaurant ID:</strong> {reservation.restaurantId}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
