import React from 'react';

const Button = (props) => {
    let template = null;

    switch(props.type){
        case 'submit':
            template = (
               
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
               
            )
            break;
        default:
            template = null
    }
    return template;
}
export default Button;