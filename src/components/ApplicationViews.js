import React from "react"
import { Route } from "react-router-dom"
import LocationList from "./location/LocationList"
import { LocationProvider } from "./location/LocationProvider"
import { CustomerProvider } from "./customer/CustomerProvider"
import { EmployeeProvider } from "./employee/EmployeeProvider"
import CustomerList from "./customer/CustomerList"
import EmployeeList from "./employee/EmployeeList"
import { AnimalProvider } from "./animal/AnimalProvider"
import AnimalList from "./animal/AnimalList"

export default (props) => {
    return (
        <>
            <LocationProvider>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/">
                    <LocationList />
                </Route>
            </LocationProvider>

            <CustomerProvider>
                {/* Render the customer list when http://localhost:3000/customers */}
                <Route exact path="/customers">
                    <CustomerList />
                </Route>
            </CustomerProvider>

            <EmployeeProvider>
                {/* Render the employee list when http://localhost:3000/employees */}
                <Route exact path="/employees">
                    <EmployeeList />
                </Route>
            </EmployeeProvider>

            <AnimalProvider>
                {/* Render the animal list when http://localhost:3000/animals */}
                <Route exact path="/animals">
                    <AnimalList />
                </Route>
            </AnimalProvider>
        </>
    )
}
