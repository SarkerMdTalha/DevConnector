import React from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs';

const ProfileExperience = ({ experience: { company, title, location, current, to, from, description } }) =>
    <div>
        <h3 className='text-dark'>{company}</h3>
        <p>
            {dayjs(from).format('YYYY/MM/DD')} -{' '}
            {to === null
                ? 'Now'
                : dayjs(to).format('YYYY/MM/DD')}
        </p>
        <p>
            <strong>Postion: {title}</strong>
        </p>
        <p>
            <strong>Description: {description} </strong>
        </p>
    </div>

ProfileExperience.propTypes = {

}

export default ProfileExperience
