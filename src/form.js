import React from 'react';

const Form = (props) => {
    return (
        <form onSubmit={props.loadWeather} >
            
            <input className="inputForm" type="text" name="city" placeholder="City..."/>
            
            <div>
                <button className="btn btn-md btn-danger"> Let's Go! </button>
            </div>
        
        </form>
    )

}

export default Form;