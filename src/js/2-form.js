const refs = {
    form: document.querySelector(".feedback-form"),
}
const formData = {
    email: "",
    message: ""
}
refs.form.addEventListener('submit', e => {
    e.preventDefault()
    if(refs.form.elements.email.value.trim().length !== 0 && refs.form.elements.message.value.trim().length !== 0){
    console.log(formData)
    refs.form.reset()
    localStorage.removeItem("feedback-form-state")
    formData.email = ""
    formData.message = ""
    return;
    }
    alert("Fill please all fields")

})
refs.form.addEventListener('input', (e) => {
    if(e.target.getAttribute("name") === "email"){
        formData.email = e.target.value
    }else if(e.target.getAttribute("name") === "message"){
        formData.message = e.target.value
    }
    localStorage.setItem("feedback-form-state", JSON.stringify(formData))
})
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("feedback-form-state") === null){
        return;
    }
    const importFromLS = JSON.parse(localStorage.getItem("feedback-form-state"))
    refs.form.elements.email.value = importFromLS.email
    refs.form.elements.message.value = importFromLS.message
    formData.email = importFromLS.email
    formData.message = importFromLS.message
})