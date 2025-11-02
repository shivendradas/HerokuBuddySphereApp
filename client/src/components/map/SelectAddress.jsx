import React, { useState } from "react";
import LocationSearchMap from "./LocationSearchMap";

export default function SelectAddress({ customClassName, onAddressChange }) {
  // [selectedAddress, setSelectedAddress] = useState(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);

  const handleAddressSelect = (addressObj) => {
    onAddressChange(addressObj); // notify parent form
    setShowLocationSearch(false);
  };

  return (
    <div>
      {/* <p>
        Selected Address:{" "}
        <span style={{ fontWeight: "bold" }}>
          {selectedAddress ? selectedAddress.address : "No address selected"}
          {console.log("Selected Address Object:", selectedAddress)}
        </span>
      </p> */}
      <button type="button" className={customClassName ? customClassName : ""}
        onClick={() => setShowLocationSearch(true)}
      >
        Search Location
      </button>

      {showLocationSearch && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: 700,
              background: "white",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 0 10px rgba(0,0,0,0.3)",
              position: "relative",
            }}
          >
            <LocationSearchMap
              onSelect={handleAddressSelect}
              onAddressChange={(addr) => console.log("Address changed:", addr)}
            />
            <button type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowLocationSearch(false);
              }}
              style={{
                marginTop: 10,
                padding: "8px 12px",
                cursor: "pointer",
                position: "absolute",
                top: 10,
                right: 10,
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
