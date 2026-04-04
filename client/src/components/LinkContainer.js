import { useState, useEffect } from 'react' 
import Table from './Table'
import Form from './Form'

const LinkContainer = () => {
  const [links, setLinks] = useState([])           
  const [editing, setEditing] = useState(false)   
  const [currentLink, setCurrentLink] = useState(null)

  useEffect(() => { 
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      const response = await fetch('/links')
      const data = await response.json()
      setLinks(data)
    } catch (error) {
      console.log(error)
    }
  }

  // CREATE
  const handleSubmit = async (formData) => {
    if (editing) {
      // UPDATE path
      try {
        await fetch(`/links/${currentLink.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        setLinks(links.map(link =>
          link.id === currentLink.id ? { ...link, ...formData } : link
        ))
        setEditing(false)
        setCurrentLink(null)
      } catch (error) {
        console.log(error)
      }
    } else {
      // CREATE path
      try {
        const response = await fetch('/links', {  
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        await response.text()
        fetchLinks() 
      } catch (error) {
        console.log(error)
      }
    }
  }

  // DELETE
  const handleRemove = async (id) => {
    try {
      await fetch(`/links/${id}`, { method: 'DELETE' })
      setLinks(links.filter(link => link.id !== id)) //remove state
    } catch (error) {
      console.log(error)
    }
  }

  // set up edit mode
  const handleEdit = (link) => {
    setEditing(true)
    setCurrentLink(link)
  }

  const cancelEdit = () => {
    setEditing(false)
    setCurrentLink(null)
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new URL with a name to the table.</p>

      <Table
        linkData={links}
        removeLink={handleRemove}
        editLink={handleEdit}
      />

      <br />
      <h3>{editing ? 'Edit Link' : 'Add New'}</h3>
      <Form
        handleSubmit={handleSubmit}
        editing={editing}
        currentLink={currentLink}
        cancelEdit={cancelEdit}
      />
    </div>
  )
}

export default LinkContainer