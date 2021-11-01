import { deleteRequest, getClowns, getRequests, completeEvent, getCompletions, getSortedRequests } from "./dataAccess.js";



const requestItemListBuilder = (request) => {
    const clowns = getClowns()

    const completions = getCompletions()

    const foundCompletion = completions.find(
        (completion) => {
            return (completion.requestId === request.id)
        }
    )
    
    let html = ""
    if (foundCompletion) {
        const foundCompletedClown = clowns.find(
            (clown) => {
                return (clown.id === foundCompletion.clownId)
            }
        )
        html += `<li class="completed-request-item">
                <section class="completed-request-info">
                Request #${request.id}: completed by ${foundCompletedClown.name}
                </section>

                <button class="request__deny" id="request--${request.id}">
                Deny
                </button>
                </li>`
    } else {
        html += `<li class="request-item">
                <section class="request-info">
                Request #${request.id}: ${request.childName}
                </section>
    
                <select class="clowns" id="clowns">
                <option value="">Choose</option>
                ${clowns.map(
                    clown => {
                        return `<option value="${request.id}--${clown.id}">${clown.name}</option>`
                    }
                    ).join("")
                }
                </select>
    
                <button class="request__deny" id="request--${request.id}">
                Deny
                </button>
                </li>`

    }
    return html

}

export const Requests = () => {
    const sortedRequests = getSortedRequests()
    // const requests = getRequests()
    
    let html = `<ul>`
    
    const sortedListItems = sortedRequests.map(requestItemListBuilder)
    // const listItems = requests.map(requestItemListBuilder)
    
    html += sortedListItems.join("")
    // html += listItems.join("")
    html += `</ul>`

    return html

}

const mainContainer = document.querySelector("#container")
//Submit Request
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }

})

//Mark Event as Completed
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [requestId, clownId] = event.target.value.split("--")

            const completedEvent = {
                requestId: parseInt(requestId),
                clownId: parseInt(clownId),
                date_created: new Date().toLocaleDateString()
            }

            completeEvent(completedEvent)

        }
    }
)
