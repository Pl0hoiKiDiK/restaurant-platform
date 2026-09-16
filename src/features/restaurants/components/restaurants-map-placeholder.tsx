import { Icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

import pinIcon from "@/assets/icons/pin-icon.svg";
import pinRedIcon from "@/assets/icons/pin-red-icon.svg";
import type { Restaurant } from "@/features/restaurants/types/restaurant.types";

interface RestaurantsMapProps {
  restaurants: Restaurant[];
}

const mapCenter: [number, number] = [40.7282, -74.0479];

const defaultPinIcon = new Icon({
  iconUrl: pinIcon,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -22],
});

const activePinIcon = new Icon({
  iconUrl: pinRedIcon,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -22],
});

export function RestaurantsMapPlaceholder({
  restaurants,
}: RestaurantsMapProps) {
  return (
    <section className="h-full w-full overflow-hidden rounded-[4px] border border-black/10">
      <MapContainer
        center={mapCenter}
        className="h-full w-full"
        scrollWheelZoom
        zoom={11}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/attribution/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={20}
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />

        {restaurants.map((restaurant, index) => {
          const isHighlighted = index === 2;

          return (
            <Marker
              icon={isHighlighted ? activePinIcon : defaultPinIcon}
              key={restaurant.id}
              position={[
                restaurant.coordinates.latitude,
                restaurant.coordinates.longitude,
              ]}
            >
              <Tooltip direction="bottom" permanent>
                <span className="whitespace-nowrap font-['Inter'] text-[13px] font-bold leading-3 text-[#222222]">
                  {restaurant.name}
                </span>
              </Tooltip>

              <Popup>
                <div className="min-w-40 py-1">
                  <p className="text-sm font-bold text-[#222222]">
                    {restaurant.name}
                  </p>

                  <p className="mt-1 text-xs text-[#222222]/60">
                    {restaurant.city} · {restaurant.cuisines.join(", ")} ·{" "}
                    {restaurant.priceLevel}
                  </p>

                  <p className="mt-2 text-xs font-medium text-[#F34336]">
                    {restaurant.distance} away
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </section>
  );
}
