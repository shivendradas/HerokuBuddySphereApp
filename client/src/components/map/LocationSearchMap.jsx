import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LocationSearchMap({ initialAddress = "", onAddressChange, onSelect }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [map, setMap] = useState(null);
  const [address, setAddress] = useState(initialAddress);
  const [searchInput, setSearchInput] = useState(initialAddress);
  const [popupOpen, setPopupOpen] = useState(false);
  const manualAddressRef = useRef("");
  const [currentLatLng, setCurrentLatLng] = useState(null);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const initializedMap = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(initializedMap);

    initializedMap.on("click", (e) => {
      const { lat, lng } = e.latlng;
      setCurrentLatLng({ lat, lng });
      showManualAddressPopup(initializedMap, lat, lng);
    });

    setMap(initializedMap);

    return () => {
      initializedMap.remove();
    };
  }, []);

  const showManualAddressPopup = (mapInstance, lat, lng) => {
    if (popupRef.current) {
      mapInstance.removeLayer(popupRef.current);
    }

    const container = document.createElement("div");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter manual address";
    input.style.width = "180px";
    input.oninput = (e) => {
      manualAddressRef.current = e.target.value;
    };

    const submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.textContent = "Submit";
    submitBtn.style.marginLeft = "5px";
    submitBtn.onclick = (e) => {
      e.preventDefault();
      const manualAddr = manualAddressRef.current.trim();
      if (!manualAddr) {
        alert("Please enter an address");
        return;
      }
      setAddress(manualAddr);
      setSearchInput(manualAddr);
      if (markerRef.current) markerRef.current.remove();
      markerRef.current = L.marker([lat, lng]).addTo(mapInstance);
      mapInstance.setView([lat, lng], 13);

      onAddressChange && onAddressChange(manualAddr);
      onSelect && onSelect({ address: manualAddr, lat, lon: lng });
      mapInstance.closePopup(popupRef.current);
      setPopupOpen(false);
    };

    container.appendChild(input);
    container.appendChild(submitBtn);

    popupRef.current = L.popup({ closeOnClick: false, autoClose: false })
      .setLatLng([lat, lng])
      .setContent(container)
      .openOn(mapInstance);

    setPopupOpen(true);
  };

  async function geocode(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}&limit=1`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.length === 0) return null;
      return data[0];
    } catch (err) {
      console.error("Geocoding error:", err);
      return null;
    }
  }

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      alert("Please enter a location");
      return;
    }
    const result = await geocode(searchInput.trim());
    if (!result) {
      alert("Location not found");
      return;
    }
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);

    if (markerRef.current) markerRef.current.remove();
    markerRef.current = L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 13);

    setAddress(result.display_name);
    onAddressChange && onAddressChange(result.display_name);
    setCurrentLatLng({ lat, lng: lon });
  };

  const handleSelect = () => {
    if (!address) {
      alert("Please select or enter an address");
      return;
    }
    if (!currentLatLng) {
      alert("Coordinates not available");
      return;
    }
    onSelect && onSelect({ address, lat: currentLatLng.lat, lon: currentLatLng.lng });
  };

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h2>Find Location on Map</h2>
      <input
        type="text"
        value={searchInput}
        placeholder="Type location..."
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ width: 300, padding: 8, fontSize: 16 }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        style={{ padding: "8px 12px", marginLeft: 8, fontSize: 16, cursor: "pointer" }}
      >
        Search
      </button>

      <div
        ref={mapRef}
        style={{ height: 400, width: "100%", maxWidth: 600, margin: "20px auto", border: "1px solid #ccc" }}
      />

      <div
        style={{
          maxWidth: 600,
          margin: "10px auto",
          padding: 10,
          background: "#f9f9f9",
          border: "1px solid #ddd",
          minHeight: 40,
          fontSize: "1.1em",
        }}
      >
        {address || "Click on the map or search a location"}
      </div>

      <button type='button'
        onClick={(e) => {
          e.preventDefault();
          handleSelect();
        }}
        style={{ marginTop: 10, padding: "10px 20px", fontSize: 16, cursor: "pointer" }}
      >
        Select Address
      </button>
    </div>
  );
}
