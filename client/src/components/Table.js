import React from 'react'

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>URL</th>
        <th>Edit</th>
        <th>Remove</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const rows = props.linkData.map((row, index) => {
    return (
      <tr key={row.id}>
        <td>{row.name}</td>
        <td><a href={row.url}>{row.url}</a></td>
        <td>
          <button onClick={() => props.editLink(row)}>Edit</button>
        </td>
        <td>
          <button onClick={() => props.removeLink(row.id)}>Delete</button>
        </td>
      </tr>
    )
  })
  return <tbody>{rows}</tbody>
}

const Table = (props) => {
  return (
    <table>
      <TableHeader />
      <TableBody
        linkData={props.linkData}
        removeLink={props.removeLink}
        editLink={props.editLink}
      />
    </table>
  )
}

export default Table
