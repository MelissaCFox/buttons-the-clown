const applicationState = {
    requests: [],
    clowns: [],
    completions: []

}

const API = "http://localhost:8088"


export const fetchData = () => {
    fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (eventRequests) => {
                // Store the external state in application state
                applicationState.requests = eventRequests
            }
        )
    fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (clowns) => {
                applicationState.clowns = clowns
            }
        )
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (eventCompletions) => {
            // Store the external state in application state
                applicationState.completions = eventCompletions
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

export const getSortedRequests = () => {
    return applicationState.requests.sort(
        (a, b) => {

            const completions = getCompletions()
        
            const aFoundCompletion = completions.find(
                (completion) => {
                    return (completion.requestId === a.id)
                }
            )
            let aValue = false
            if (aFoundCompletion) {
                aValue = true
            } 

            const bFoundCompletion = completions.find(
                (completion) => {
                    return (completion.requestId === b.id)
                }
            )
            let bValue = false
            if (bFoundCompletion) {
                bValue = true
            } 

            return aValue - bValue
        
        }      
    )
}



export const getClowns = () => {
    return applicationState.clowns.map
    (clown => ({...clown}))
}

export const getCompletions = () => {
    return applicationState.completions.map
    (completion => ({...completion}))
}


const mainContainer = document.querySelector("#container")

export const sendRequest = (userEventRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userEventRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}



export const completeEvent = (completedEvent) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },    
        body: JSON.stringify(completedEvent)
    }    
    return fetch(`${API}/completions`, fetchOptions)
    .then(completion => completion.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })    
}    


