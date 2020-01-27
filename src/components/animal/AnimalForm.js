import React, { useContext, useRef, useState, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"


export default props => {
    const { locations } = useContext(LocationContext)
    const { addAnimal, animals, updateAnimal } = useContext(AnimalContext)
    const [ chosenLocation, setLocation ] = useState()
    const [ animal, setAnimal ] = useState({})

    const name = useRef(null)
    const breed = useRef(null)
    const location = useRef(null)

    useEffect(() => {
        if (props.match.params.hasOwnProperty("animalId")) {
            const animalId = parseInt(props.match.params.animalId, 10)
            const selectedAnimal = animals.find(a => a.id === animalId) || {}
            setAnimal(selectedAnimal)
            setLocation(selectedAnimal.locationId)
        }
    }, [animals])

    const constructNewAnimal = () => {
        const locationId = parseInt(location.current.value)

        if (locationId === 0) {
            window.alert("Please select a location")
        } else {
            if (props.match.params.hasOwnProperty("animalId")) {
                updateAnimal({
                    id: animal.id,
                    name: name.current.value,
                    breed: breed.current.value,
                    locationId: chosenLocation,
                    customerId: parseInt(localStorage.getItem("kennel_customer"), 10)
                })
                .then(() => props.history.push("/animals"))
            } else {
                addAnimal({
                    name: name.current.value,
                    breed: breed.current.value,
                    locationId: locationId,
                    customerId: parseInt(localStorage.getItem("kennel_customer"), 10)
                })
                .then(() => props.history.push("/animals"))
            }
        }
    }

    return (
        <form className="animalForm">
            <h2 className="animalForm__title">Admit Animal</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalName">Animal name: </label>
                    <input
                        type="text"
                        name="animalName"
                        ref={name}
                        defaultValue={animal.name}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Animal name"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="animalBreed">Animal breed: </label>
                    <input
                        type="text"
                        name="animalBreed"
                        ref={breed}
                        defaultValue={animal.breed}
                        required
                        className="form-control"
                        placeholder="Animal breed"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <select
                        name="location"
                        ref={location}
                        value={chosenLocation}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control"
                    >
                        <option value="0">Select a location</option>
                        {locations.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={
                    evt => {
                        evt.preventDefault()
                        constructNewAnimal()
                    }
                }
                className="btn btn-primary">
                Make Reservation
            </button>
        </form>
    )
}
