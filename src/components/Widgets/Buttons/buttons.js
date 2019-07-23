import React from 'react';

const Button = (props) => {
    let template = null;

    switch(props.type){
        case 'submit':
            template = (
               
                    <div class="form-group row">
                        <div class="col-sm-10">
                            <button type="submit" class="btn btn-primary">Submit</button>
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