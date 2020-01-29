import React, { useState, useEffect } from "react"

export const LocationMedicationContext = React.createContext()

export const LocationMedicationProvider = (props) => {
    const [locationMedicationRelationships, changeLocationMedicationRelationshipState] = useState([])

    const getLocationMedications = () => {
        return fetch("http://localhost:8088/locationmedications")
            .then(res => res.json())
            .then(changeLocationMedicationRelationshipState)
    }

    const addLocationMedication = medication => {
        return fetch("http://localhost:8088/locationmedications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medication)
        })
            .then(getLocationMedications)
    }

    const deleteLocationMedication = medication => {
        return fetch(`http://localhost:8088/locationmedications/${medication.id}`, {
            method: "DELETE"
        })
        .then(getLocationMedications)
    }

    const updateLocationMedication = medication => {
        return fetch(`http://localhost:8088/locationmedications/${medication.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medication)
        })
            .then(getLocationMedications)
    }

    useEffect(() => {
        getLocationMedications()
    }, [])

    useEffect(() => {
        console.log(locationMedicationRelationships)
    }, [locationMedicationRelationships])

    return (
        <LocationMedicationContext.Provider value={{
            locationMedicationRelationships,
            addLocationMedication,
            updateLocationMedication,
            deleteLocationMedication
        }}>
            {props.children}
        </LocationMedicationContext.Provider>
    )
}
