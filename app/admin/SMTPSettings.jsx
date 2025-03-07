import { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { SiMinutemailer } from 'react-icons/si'

const SMTPSetup = () => {
  const [smtpConfig, setSmtpConfig] = useState({
    email: '',
    password: '',
    host: '',
    port: '',
    ownerEmail: ''
  })

  const [smtpList, setSmtpList] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordVisibility, setPasswordVisibility] = useState({})
  const [showForm, setShowForm] = useState(false) // Toggle form visibility
  const [showPassword, setShowPassword] = useState(false);

  // Fetch SMTP Configurations
  const fetchSMTPConfigs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_URL}smtp/get`
      )
      if (!response.ok) throw new Error('Failed to fetch SMTP configurations')

      const data = await response.json()
      setSmtpList(Array.isArray(data) ? data : [data])
    } catch (error) {
      console.error('Error fetching SMTP configurations:', error)
      setSmtpList([])
    }
  }

  useEffect(() => {
    fetchSMTPConfigs()
  }, [])

  const handleChange = e => {
    setSmtpConfig({ ...smtpConfig, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)

    const method = editingId ? 'PUT' : 'POST'
    const endpoint = editingId
      ? `${process.env.NEXT_PUBLIC_FRONT_URL}smtp/${editingId}`
      : `${process.env.NEXT_PUBLIC_FRONT_URL}smtp/save`

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smtpConfig)
      })

      if (!response.ok) throw new Error('Failed to save settings.')

      await fetchSMTPConfigs()

      setSmtpConfig({
        email: '',
        password: '',
        host: '',
        port: '',
        ownerEmail: ''
      })
      setEditingId(null)
      setShowForm(false) // Close the form after submission
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = id => {
    const smtpToEdit = smtpList.find(item => item._id === id)
    if (smtpToEdit) {
      setSmtpConfig({ ...smtpToEdit })
      setEditingId(id)
      setShowForm(true) // Open the form for editing
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this SMTP config?'))
      return

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONT_URL}smtp/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) throw new Error('Failed to delete SMTP config.')

      setSmtpList(prevList => prevList.filter(item => item._id !== id))
    } catch (error) {
      console.error('Error deleting SMTP config:', error)
    }
  }

  const togglePasswordVisibility = id => {
    setPasswordVisibility(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  return (
    <div className='flex bg-gray-100'>
      {/* Sidebar */}
      <div className='w-50 bg-gray-100 p-4'>
        <button
          onClick={() => setShowForm(true)}
          className='w-full flex items-center justify-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200'
        >
          <SiMinutemailer className='text-lg' />
          Add SMTP Setup
        </button>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-6'>
        <h2 className='text-2xl font-bold mb-6 text-gray-700'>
          SMTP Configurations
        </h2>

        {/* Table */}
        <div className='overflow-x-auto bg-white rounded-lg shadow-md'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='p-3 text-left'>SMTP Email</th>
                <th className='p-3 text-left'>SMTP Password</th>
                <th className='p-3 text-left'>SMTP Host</th>
                <th className='p-3 text-left'>SMTP Port</th>
                <th className='p-3 text-left'>Owner Email</th>
                <th className='p-3 text-left'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {smtpList.length > 0 ? (
                smtpList.map(config => (
                  <tr
                    key={config._id}
                    className='hover:bg-gray-50 transition-colors'
                  >
                    <td className='p-3 border-t'>{config.email}</td>
                    <td className='p-3 border-t flex items-center'>
                      {passwordVisibility[config._id]
                        ? config.password
                        : '*'.repeat(config.password.length - 4) +
                          config.password.slice(-4)}
                      <button
                        onClick={() => togglePasswordVisibility(config._id)}
                        className='ml-2 text-gray-500 hover:text-gray-700'
                      >
                        {passwordVisibility[config._id] ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </button>
                    </td>
                    <td className='p-3 border-t'>{config.host}</td>
                    <td className='p-3 border-t'>{config.port}</td>
                    <td className='p-3 border-t'>{config.ownerEmail}</td>
                    <td className='p-3 border-t flex space-x-2'>
                      <button
                        className='bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200'
                        onClick={() => handleUpdate(config._id)}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200'
                        onClick={() => handleDelete(config._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='p-4 text-center text-gray-500'>
                    No SMTP configurations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-6'>
            <h2 className='text-xl font-bold mb-4 text-gray-700'>
              {editingId ? 'Edit SMTP Setup' : 'Add SMTP Setup'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-gray-700 font-medium'>
                  SMTP Email
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='Enter SMTP Email'
                  className='w-full p-2 border rounded'
                  value={smtpConfig.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='relative'>
                <label className='block text-gray-700 font-medium'>
                  SMTP Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='Enter SMTP Password'
                  className='w-full p-2 border rounded pr-10'
                  value={smtpConfig.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type='button'
                  className='absolute top-10 right-3 text-gray-600'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div>
                <label className='block text-gray-700 font-medium'>
                  SMTP Host
                </label>
                <input
                  type='text'
                  name='host'
                  placeholder='Enter SMTP Host'
                  className='w-full p-2 border rounded'
                  value={smtpConfig.host}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium'>
                  SMTP Port
                </label>
                <input
                  type='number'
                  name='port'
                  placeholder='Enter SMTP Port'
                  className='w-full p-2 border rounded'
                  value={smtpConfig.port}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className='block text-gray-700 font-medium'>
                  Owner Email
                </label>
                <input
                  type='email'
                  name='ownerEmail'
                  placeholder='Enter Owner Email'
                  className='w-full p-2 border rounded'
                  value={smtpConfig.ownerEmail}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type='submit'
                className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2'
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className='animate-spin h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z'
                    ></path>
                  </svg>
                ) : null}
                {editingId ? 'Update' : 'Save'}
              </button>
            </form>
            <button
              onClick={() => setShowForm(false)}
              className='mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200'
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SMTPSetup
