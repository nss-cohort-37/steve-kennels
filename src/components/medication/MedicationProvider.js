import React, { useState, useEffect } from "react"

export const MedicationContext = React.createContext()

export const MedicationProvider = (props) => {
    const [medications, changeMedicationState] = useState([])

    const getMedications = () => {
        return fetch("http://localhost:8088/medications")
            .then(res => res.json())
            .then(changeMedicationState)
    }

    const addMedication = medication => {
        return fetch("http://localhost:8088/medications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medication)
        })
            .then(getMedications)
    }

    const deleteMedication = medication => {
        return fetch(`http://localhost:8088/medications/${medication.id}`, {
            method: "DELETE"
        })
        .then(getMedications)
    }

    const updateMedication = medication => {
        return fetch(`http://localhost:8088/medications/${medication.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medication)
        })
            .then(getMedications)
    }

    useEffect(() => {
        getMedications()
    }, [])

    useEffect(() => {
        console.log(medications)
    }, [medications])

    return (
        <MedicationContext.Provider value={{
            medications, addMedication, deleteMedication, updateMedication
        }}>
            {props.children}
        </MedicationContext.Provider>
    )
}
