import React, { useContext, useRef } from "react"
import { MedicationContext } from "./MedicationProvider"
import "./Medication.css"
import { useState } from "react"

export default props => {
    const { addMedication } = useContext(MedicationContext)
    const [medicationName, changeMedicationNameStateTo] = useState("")
    const name = useRef(null)

    const onUserTypingSomething = e => {
        changeMedicationNameStateTo(e.target.value)
    }

    const constructNewMedication = () => {
        addMedication({
            brandName: name.current.value
        })
        .then(() => {
            changeMedicationNameStateTo("")
        })
    }

    return (
        <form className="medicationForm">
            <h2 className="medicationForm__title">New Medication</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="brandName">Medication name: </label>
                    <input
                        type="text"
                        id="brandName"
                        ref={name}
                        value={medicationName}
                        onChange={onUserTypingSomething}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Medication name"
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault()
                        constructNewMedication()
                    }
                }
                className="btn btn-primary">
                Save Medication
            </button>
        </form>
    )
}
