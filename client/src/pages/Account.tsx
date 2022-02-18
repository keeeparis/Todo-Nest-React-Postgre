import React from 'react'

const Account = () => {
    return (
        <div>
            <form>
                <input 
                    type="text"
                    name='title'
                    id='title' 
                />
                <input 
                    type="textarea" 
                    name="content" 
                    id="content" 
                />
                <button type='submit'>Написать</button>
            </form>
            <div className="userPosts">

            </div>
        </div>
    )
}

export default Account