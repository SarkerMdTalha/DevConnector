import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs';

const ProfileEducation = ({ education: { school, degree, fieldofstudy, current, to, from, description } }) =>
    <div>
        <h3 className='text-dark'>{school}</h3>
        <p>
            {dayjs(from).format('YYYY/MM/DD')} -{' '}
            {to === null
                ? 'Now'
                : dayjs(to).format('YYYY/MM/DD')}
        </p>
        <p>
            <strong>Degree: {degree}</strong>
        </p>
        <p>
            <strong>Field Of Study: {fieldofstudy}</strong>
        </p>
        <p>
            <strong>Description: {description} </strong>
        </p>
    </div>

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired,

}

export default ProfileEducation
