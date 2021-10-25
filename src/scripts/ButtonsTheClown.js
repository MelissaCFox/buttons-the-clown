import { RequestForm } from "./RequestForm.js"
import { Requests } from "./Requests.js"


export const ButtonsTheClown = () => {
    return `
        <h1>Buttons the Clown</h1>
        <section class="serviceForm">
            ${RequestForm()}
        </section>

        <section class="eventRequests">
            <h2>Event Requests</h2>
            ${Requests()}
        </section>

    `
}