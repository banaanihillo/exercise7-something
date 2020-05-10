import React, {useState, useImperativeHandle} from "react"
import PropTypes from "prop-types"

const Togglable = React.forwardRef((props, ref) => {
    const {buttonLabel, children} = props
    const [visible, setVisibility] = useState(false)
    const formHidden = {display: visible ? "none" : ""}
    const formVisible = {display: visible ? "" : "none"}
    const toggleVisibility = () => {
        setVisibility(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style = {formHidden}>
                <button onClick = {toggleVisibility}> {buttonLabel} </button>
            </div>
            <div style = {formVisible} className = "kinderGarten">
                {children}
                <button onClick = {toggleVisibility}> Hide form </button>
            </div>
        </div>
    )
})

Togglable.displayName = "Togglable"

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
export default Togglable
