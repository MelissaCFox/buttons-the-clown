import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userNumberOfChildren = document.querySelector("input[name='numberOfChildren']").value
        const userAddress = document.querySelector("input[name='eventAddress']").value
        const userDate = document.querySelector("input[name='eventDate']").value
        const userTimeLength = document.querySelector("input[name='timeLength']").value


        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: userParentName,
            childName: userChildName,
            numberOfChildren: userNumberOfChildren,
            address: userAddress,
            date: userDate,
            dateToSort: Date.parse(userDate),
            timelength: userTimeLength
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
    }
})



export const RequestForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child's Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="numberOfChildren">Number of Children Attending</label>
            <input type="number" name="numberOfChildren" class="input" />
        </div>
        <div class="field">
        <label class="label" for="eventAddress">Event Address</label>
        <input type="text" name="eventAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="eventDate">Date of Event</label>
            <input type="date" name="eventDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="timeLength">Length of Event(hrs)</label>
            <input type="number" name="timeLength" class="input" />
        </div>


        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}