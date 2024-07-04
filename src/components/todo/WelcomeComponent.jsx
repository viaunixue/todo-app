import {useParams, Link} from 'react-router-dom'
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService'
import { useState } from 'react'
import { useAuth } from './security/AuthContext'

function WelcomeComponent() {

    const {username} = useParams()

    // console.log(username)

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi() {
        console.log('called')
        // axios call
        // axios.get('http://localhost:8080/hello-world')
        //     .then((response) => successfulResponse(response))
        //     .catch( (error) => errorResponse(error))
        //     .finally ( () => console.log('cleanup'))

        // axios.get('http://localhost:8080/hello-world-bean')
        //     .then((response) => successfulResponse(response))
        //     .catch( (error) => errorResponse(error))
        //     .finally ( () => console.log('cleanup'))

        retrieveHelloWorldPathVariable('JongHyun', authContext.token)
            .then( (response) => successfulResponse(response) )
            .catch ( (error) => errorResponse(error) )
            .finally ( () => console.log('cleanup') )

    }

    function successfulResponse(response){
        console.log(response)
        // setMessage(response.data)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to="/todos">Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World REST API
                </button>
                <div className="text-info">{message}</div>
            </div>
        </div>
    )
}

export default WelcomeComponent