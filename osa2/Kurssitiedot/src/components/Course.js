import React from 'react'

const CourseTitle = ({ title }) => {
    return (
    <h2>{title}</h2>
    )
}

const Content = ({ parts }) => {
    const course = () => parts.map( part => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />)
    return(
        <div>{course()}</div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s,p) => { return s + p.exercises },0)
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Part = ({ name, exercises }) => {
    return (
    <p>{name} {exercises}</p>
    )
}
  
const Course = ({ course }) => {
    return (
        <div>
            <CourseTitle title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course