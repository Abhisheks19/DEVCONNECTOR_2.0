import React, { Fragment } from "react";
import Moment from 'react-moment'
import PropTypes from "prop-types";

const ProfileExperience = ({
    experience: {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    }
}) => {
    return (
        <Fragment>
            <div>
                <h3 className="text-dark">{company}</h3>
                <p><Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
                    {!to ? (
                        " Now"
                    ) : (
                            <Moment format="YYYY/MM/DD">{to}</Moment>
                        )}</p>
                <p><strong>Position: </strong>{title}</p>
                <p>
                    <strong>Description: </strong>{description}
            </p>
            </div>
        </Fragment>
    );
};

ProfileExperience.prototypes = {
    experience: PropTypes.array.isRequired
};

export default ProfileExperience;
