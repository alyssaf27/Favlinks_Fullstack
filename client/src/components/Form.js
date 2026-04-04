import { useState } from 'react' 

const Form = (props) => {
  // useState to track form field values
  const [formData, setFormData] = useState({ name: '', URL: '' })

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (!formData.name || !formData.URL) return 
    props.handleSubmit(formData)         // pass data to parent
    setFormData({ name: '', URL: '' })   // reset form after submit
  }

  return (
    <form onSubmit={onFormSubmit}>
      <label>Name: </label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Link name"
      />
      <label> URL: </label>
      <input
        type="text"
        name="URL"
        value={formData.URL}
        onChange={handleChange}
        placeholder="https://..."
      />
      <button type="submit">{props.editing ? 'Update' : 'Add Link'}</button>
      {props.editing && (
        <button type="button" onClick={props.cancelEdit}>Cancel</button>
      )}
    </form>
  )
}

export default Form
