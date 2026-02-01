import { useState } from "react"
import "../Profile/profile.css"

function Profile({ user, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:8080/api/auth/update/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Update failed")
      }

      const updatedUser = await response.json()
      onUpdate(updatedUser) // update parent state
      alert("Profile updated successfully!")
    } catch (error) {
      console.error(error)
      alert("Failed to update user")
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return

    try {
      const response = await fetch(`http://localhost:8080/api/auth/delete/${user.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Delete failed")
      }

      onDelete() // tell parent to logout
    } catch (error) {
      console.error(error)
      alert("Failed to delete account")
    }
  }

  return (
    <div className="profile-page">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
      </form>

      <hr />
        <h2>Delete Profile</h2>
      <button className="delete-btn" onClick={handleDelete}>
        Delete Account
      </button>
    </div>
  )
}

export default Profile
