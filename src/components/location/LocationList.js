import React, { useContext } from "react"
import { LocationContext } from "./LocationProvider"
import Location from "./Location"
import "./Locations.css"
import { EmployeeContext } from "../employee/EmployeeProvider"

export default () => {
    const { locations } = useContext(LocationContext)
    const { employees } = useContext(EmployeeContext)

    return (
        <div className="locations">
            {
                locations.map(l => {
                    const employeesHere = employees.filter(
                        (employee) => {
                            return l.id === employee.locationId
                        }
                    )
                    return <Location key={l.id}
                                     employees={employeesHere}
                                     location={l} />
                })
            }
        </div>
    )
}
