import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile"
import PropTypes from "prop-types";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = ({ match, getProfileById, profile: { profile, loading }, auth }) => {

    useEffect(() => {
        getProfileById(match.params.id)
    }, [getProfileById, match.params.id])

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">Back to profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                        <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
                    }
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ?
                                (<Fragment>
                                    {profile.experience.map(experience => {
                                        return <ProfileExperience key={experience._id} experience={experience} />
                                    })}
                                </Fragment>) : <h4>No experience credentials</h4>}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ?
                                (<Fragment>
                                    {profile.education.map(education => {
                                        return <ProfileEducation key={education._id} education={education} />
                                    })}
                                </Fragment>) : <h4>No education credentials</h4>}
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
};

Profile.prototypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps, { getProfileById }
)(withRouter(Profile));
