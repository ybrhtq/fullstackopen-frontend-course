const Notification = ({ message, type }) => {
    console.log('cur notification message is', message, '; type is', type)
    if (message === null || type === null ) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

export default Notification