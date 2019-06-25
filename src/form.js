import React from 'react';

const Form = (props) => {
    return (
        <form onSubmit={props.loadWeather} >
            <div>
                <input className="inputForm" type="text" name="city" placeholder="City..."/>
            </div>
            <div>
                <input className="inputForm" type="text" name="country" placeholder="Country.."/>
            </div>
            <div>
            <button className="btn btn-md btn-danger"> Let's Go! </button>
            </div>
        
        </form>
    )

}

export default Form;