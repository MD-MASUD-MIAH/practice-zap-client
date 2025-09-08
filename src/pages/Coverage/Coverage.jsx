/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";

// ✅ Tailwind + DaisyUI assumed configured in your project
// ✅ React Router: add this component to your routes
// ✅ Dependencies: `npm i react-leaflet leaflet framer-motion`

// --- Fix default Leaflet marker icons (Vite/CRA safe) ---
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import marker1x from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: marker1x,
  iconRetinaUrl: marker2x,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

// Small hook to fly/zoom when a coordinate is picked
function MapFlyTo({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 0.8 });
  }, [center, zoom, map]);
  return null;
}

// Hash a string to a soft blue/green hue for district fills
function softHue(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  // Blend between teal(170) and blue(210)
  const hue = 170 + (h % 40);
  return `hsl(${hue}, 60%, 70%)`;
}

export default function CoveragePage({
  geoJsonUrl = "/data/bd-districts.geo.json", // GeoJSON file path
  geoJsonData = null, // Optional: Pass GeoJSON data directly
  districtNameProp = "name", // Configurable property name for district names
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [geoData, setGeoData] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [flyTarget, setFlyTarget] = useState({ center: [23.685, 90.3563], zoom: 7 });
  const [bangladeshDistricts, setBangladeshDistricts] = useState([]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Load warehouse data
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => setBangladeshDistricts(data))
      .catch((err) => console.error("Error loading districts:", err));
  }, []);

  console.log(bangladeshDistricts);
  
  // Load GeoJSON
  useEffect(() => {
    if (geoJsonData) {
      setGeoData(geoJsonData);
      return;
    }
    const controller = new AbortController();
    setIsLoadingGeo(true);
    (async () => {
      try {
        const res = await fetch(geoJsonUrl, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to load GeoJSON");
        const data = await res.json();
        setGeoData(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          setGeoError("Failed to load map data. Please try again later.");
          console.error("GeoJSON load error:", e.message);
        }
      } finally {
        setIsLoadingGeo(false);
      }
    })();
    return () => controller.abort();
  }, [geoJsonUrl, geoJsonData]);

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return bangladeshDistricts;
    const q = debouncedQuery.trim().toLowerCase();
    return bangladeshDistricts?.filter(
      (d) =>
        d.district.toLowerCase().includes(q) ||
        d.covered_area.some((a) => a.toLowerCase().includes(q))
    );
  }, [debouncedQuery, bangladeshDistricts]);

  const handlePick = (d) => {
    setQuery(d.district);
    setFlyTarget({ center: [d.latitude, d.longitude], zoom: 9 });
  };

  // Styles for district polygons
  const districtStyle = (feature) => {
    const name = feature?.properties?.[districtNameProp] || "Unknown District";
    const isHover = hoveredId && hoveredId === (feature.id ?? name);
    const zoomLevel = flyTarget.zoom;
    // Skip rendering complex polygons at low zoom levels
    if (zoomLevel < 8 && feature.geometry.coordinates.length > 1000) {
      return null;
    }
    return {
      color: isHover ? "#0369a1" : "#93c5fd",
      weight: isHover ? 2.5 : 1,
      opacity: 1,
      fillColor: isHover ? "#67e8f9" : softHue(name),
      fillOpacity: isHover ? 0.55 : 0.35,
    };
  };

  const onEachDistrict = (feature, layer) => {
    const name = feature?.properties?.[districtNameProp] || "District";
    const id = feature.id ?? name;

    layer.bindPopup(`<div style="font-family: Inter, ui-sans-serif;">
      <div style="font-weight:600; font-size:14px; margin-bottom:4px;">${name}</div>
      <div style="font-size:12px; opacity:.8;">Boundary</div>
    </div>`);

    layer.on({
      mouseover: () => setHoveredId(id),
      mouseout: () => setHoveredId(null),
      click: () => {
        try {
          const b = layer.getBounds();
          const center = b.getCenter();
          setFlyTarget({ center: [center.lat, center.lng], zoom: 9 });
        } catch (e) {
          console.warn(`Failed to calculate bounds for district ${name}:`, e.message);
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center text-3xl md:text-5xl font-extrabold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
            We are available in 64 districts
          </span>
        </motion.h1>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-6"
        >
          <div className="relative">
            <input
              type="text"
              id="district-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search district or covered area..."
              aria-label="Search for a district or covered area"
              className="input input-bordered w-full rounded-2xl shadow-sm focus:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 ring-sky-300/70"
            />
            {/* Suggestion list */}
            {query && (
              <div className="absolute z-[5000] mt-2 w-full rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden">
                {filtered?.length === 0 && (
                  <div className="px-4 py-3 text-slate-500">No matches</div>
                )}
                {filtered?.slice(0, 8).map((d) => (
                  <button
                    key={d.district}
                    onClick={() => handlePick(d)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 focus:bg-slate-50 transition"
                  >
                    <div className="font-semibold text-slate-800">{d.district}</div>
                    <div className="text-xs text-slate-500 truncate">
                      Covered: {d.covered_area.join(", ")}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Map Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow bg-white"
        >
          <div className="w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
            {geoError ? (
              <div className="h-full flex items-center justify-center text-red-600">
                {geoError}
              </div>
            ) : isLoadingGeo ? (
              <div className="h-full flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
              </div>
            ) : (
              <MapContainer
                center={flyTarget.center}
                zoom={flyTarget.zoom}
                scrollWheelZoom={true}
                className="h-full w-full"
              >
                <MapFlyTo center={flyTarget.center} zoom={flyTarget.zoom} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {geoData && (
                  <GeoJSON
                    data={geoData}
                    style={districtStyle}
                    onEachFeature={onEachDistrict}
                  />
                )}
                {filtered.map((district) => (
                  <Marker
                    key={district.district}
                    position={[district.latitude, district.longitude]}
                    icon={DefaultIcon}
                  >
                    <Popup>
                      <div className="prose prose-sm max-w-none">
                        <h3 className="font-bold m-0">{district.district}</h3>
                        <p className="m-0">
                          <span className="font-semibold">Covered Areas:</span>{" "}
                          {district.covered_area.join(", ")}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </motion.div>

        {/* Legend/Helper */}
        <div className="mt-4 text-center text-sm text-slate-500">
          Tip: Hover districts to highlight. Click a district or pick from search to zoom.
        </div>
      </div>

      {/* Footer band */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="rounded-xl bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-sky-600/10 p-4 text-center text-slate-600">
            Delivering nationwide with speed & care.
          </div>
        </div>
      </div>
    </div>
  );
}