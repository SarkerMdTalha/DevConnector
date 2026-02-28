import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const Experience = ({ experience }) => {
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className='hide-sm'>{exp.title}</td>
            <td className='hide-sm'>
                {dayjs(exp.from).format('YYYY/MM/DD')} -{' '}
                {exp.to === null
                    ? 'Now'
                    : dayjs(exp.to).format('YYYY/MM/DD')}
            </td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));
    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                        <th></th>
                    </tr>
                </thead>
                <tbody>{experiences}</tbody>
            </table>

        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,

}

export default Experience
