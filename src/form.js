import React from 'react';

const Form = (props) => {
    return (
        <form onSubmit={props.loadWeather} >
            <input className="inputForm" type="text" name="city" placeholder="City..."/>
            <input className="inputForm" type="text" name="country" placeholder="Country.."/>
            <button className="btn btn-md btn-success"> Let's Go! </button>
        
        </form>
    )

}

export default Form;