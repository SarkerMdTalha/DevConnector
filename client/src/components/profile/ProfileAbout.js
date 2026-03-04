import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {
    if (!profile) return null;

    const { bio, skills, user } = profile;
    const name = user ? user.name : '';

    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <Fragment>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}'s bio</h2>
                    <p>
                        {bio}
                    </p>
                    <div className="line"></div>

                </Fragment>)}

            <h2 className="text-primary">Skills</h2>
            <div className="skills">
                {skills && skills.map((skill, idx) => (
                    <div key={idx} className="p-1">
                        <i className="fa fa-check"></i> {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,

}

export default ProfileAbout
