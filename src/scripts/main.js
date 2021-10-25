import { ButtonsTheClown } from "./ButtonsTheClown.js"
import { fetchData } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchData().then(
        () => {
            mainContainer.innerHTML = ButtonsTheClown()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)
