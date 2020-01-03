import React, { useContext } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import Employee from "./Employee"
import "./Employees.css"

export default () => {
    const { employees } = useContext(EmployeeContext)

    return (
        <div className="Employees">
            {employees.map(employee => <Employee key={employee.id} employee={employee} />)}
        </div>
    )
}
