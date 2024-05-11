import './index.css'

const Filters = props => {
  const {salaryRangesList, employmentTypesList, locationDetails} = props

  const renderEmployeeTypes = () => {
    const {onChangeEmployees, onRemoveEmployees} = props

    return employmentTypesList.map(eachEmployee => {
      const onClickEmployee = () => {
        const element = document.getElementById(
          `checkbox ${eachEmployee.employmentTypeId}`,
        )
        if (element.checked === true) {
          onChangeEmployees(eachEmployee.employmentTypeId)
        } else {
          onRemoveEmployees(eachEmployee.employmentTypeId)
        }
      }
      return (
        <li
          className="each-employee-item"
          onClick={onClickEmployee}
          key={eachEmployee.employmentTypeId}
        >
          <input
            type="checkbox"
            id={`checkbox ${eachEmployee.employmentTypeId}`}
          />
          <label
            htmlFor={`checkbox ${eachEmployee.employmentTypeId}`}
            className="employee-label"
          >
            {eachEmployee.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryTypes = () => {
    const {onChangeSalary} = props
    return salaryRangesList.map(each => {
      const onClickSalaryId = () => {
        onChangeSalary(each.salaryRangeId)
      }
      return (
        <li
          className="each-employee-item"
          onClick={onClickSalaryId}
          key={each.salaryRangeId}
        >
          <input
            type="radio"
            name="salary"
            id={`checkbox ${each.salaryRangeId}`}
          />
          <label
            htmlFor={`checkbox ${each.salaryRangeId}`}
            className="employee-label"
          >
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderLocationTypes = () => {
    const {onChangeLocations, onRemoveLocations} = props

    return locationDetails.map(eachLocation => {
      const onClickEmployee = () => {
        const element = document.getElementById(
          `checkbox ${eachLocation.locationTypeId}`,
        )
        if (element.checked === true) {
          onChangeLocations(eachLocation.label)
        } else {
          onRemoveLocations(eachLocation.label)
        }
      }
      return (
        <li
          className="each-employee-item"
          onChange={onClickEmployee}
          key={eachLocation.locationTypeId}
        >
          <input
            type="checkbox"
            id={`checkbox ${eachLocation.locationTypeId}`}
          />
          <label
            htmlFor={`checkbox ${eachLocation.locationTypeId}`}
            className="employee-label"
          >
            {eachLocation.label}
          </label>
        </li>
      )
    })
  }

  const employees = () => (
    <>
      <h1 className="employee-heading">Type of Employment</h1>
      <ul className="unordered-employees-list-container">
        {renderEmployeeTypes()}
      </ul>
    </>
  )

  const salaries = () => (
    <>
      <h1 className="employee-heading">Salary Ranges</h1>
      <ul className="unordered-employees-list-container">
        {renderSalaryTypes()}
      </ul>
    </>
  )

  const locations = () => (
    <>
      <h1 className="employee-heading">Locations</h1>
      <ul className="unordered-employees-list-container">
        {renderLocationTypes()}
      </ul>
    </>
  )

  return (
    <div className="filters-container">
      {employees()}
      <hr className="hr-line" />
      {salaries()}
      <hr className="hr-line" />
      {locations()}
    </div>
  )
}
export default Filters
