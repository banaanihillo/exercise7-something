import React, {useState, useEffect} from "react"
import axios from "axios"

const useField = (type) => {
    const [value, setValue] = useState("")

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState(
        {
            data: null,
            found: false
        }
    )

    useEffect(() => {
        axios
            .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
            .then(response => {
                setCountry({
                    data: response.data[0],
                    found: true
                })
            })
            .catch((error) => {
                console.log(`Could not find country data: ${error}`)
                setCountry({
                    data: null,
                    found: false
                })
            })
    },
    [name]
    )

    return country
}

const Country = (props) => {
    const {country} = props
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                No countries found.
            </div>
        )
    }

    return (
        <div>
            <h2> {country.data.name} </h2>
            <div> Capital: {country.data.capital} </div>
            <div> Population: {country.data.population} </div>
            <img
                src = {country.data.flag}
                height = "100"
                alt = {`The flag of ${country.data.name}`}
            />
            </div>
    )
}

const App = () => {
    const nameInput = useField("text")
    const [name, setName] = useState("Korea (Republic Of)")
    const country = useCountry(name)

    const fetch = (event) => {
        event.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <h1> Search for a country </h1>
            <form onSubmit = {fetch}>
                <input {...nameInput} />
                <button> Display country data </button>
            </form>

            <Country country = {country} />
        </div>
    )
}

export default App
