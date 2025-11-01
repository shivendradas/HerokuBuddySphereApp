import React, { useState, useEffect } from "react";

function LocationAutocomplete({ value, onChange, placeholder = "Type city, locality or state", countryCode, customStyle }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&accept-language=en&q=${encodeURIComponent(
          query
        )}${countryCode ? `&countrycodes=${countryCode}` : ""}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSuggestions(
          data.map((item) => ({
            name: item.display_name,
            locality: item.address.locality || item.address.suburb || "",
            city: item.address.city || item.address.town || item.address.village || "",
            state: item.address.state || "",
            id: item.place_id,
          }))
        );
      } catch (error) {
        console.error("Fetch error: ", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query, countryCode]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleSelectSuggestion = (suggestion) => {
    const selectedValue = [suggestion.locality, suggestion.city, suggestion.state]
      .filter(Boolean)
      .join(", ");
    setQuery(selectedValue);
    setSuggestions([]);
    onChange && onChange(selectedValue);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text" className={customStyle != null ? customStyle : ""}
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        style={{ width: "100%", padding: "8px" }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: 0,
            marginTop: 0,
            position: "absolute",
            backgroundColor: "white",
            border: "1px solid #ccc",
            width: "100%",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 10,
            cursor: "pointer",
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.id}
              style={{ padding: "5px" }}
              onClick={() => handleSelectSuggestion(s)}
            >
              {s.locality && <b>{s.locality}</b>}
              {s.city && `, ${s.city}`}
              {s.state && `, ${s.state}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationAutocomplete;
