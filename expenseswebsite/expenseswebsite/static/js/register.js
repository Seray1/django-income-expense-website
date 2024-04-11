const usernameField = document.getElementById("usernamefield");
const feedBackArea = document.querySelector(".invalid_feedback");
const emailField = document.querySelector("#emailfield");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
const usernamesuccessOutput = document.querySelector(".usernamesuccessOutput");
const emailsuccessOutput = document.querySelector(".emailsuccessOutput");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const passwordfield = document.querySelector(".passwordfield");

const handleToggleInput = (e) => {
    if(showPasswordToggle.textContent === "SHOW"){
        showPasswordToggle.textContent = "HIDE"
        passwordfield.setAttribute("type", "text")
}else{
    showPasswordToggle.textContent = "SHOW"
    passwordfield.setAttribute("type", "password")
}
}
showPasswordToggle.addEventListener("click",handleToggleInput)

emailField.addEventListener("keyup", function (event) {
    const emailValue = emailField.value
    emailsuccessOutput.style.display = "block"
    emailsuccessOutput.textContent = `Checking ${emailValue}`
    emailField.classList.remove("is-invalid")
    emailFeedBackArea.style.display = "none"

    if(emailValue.length > 0){
        fetch("/authentication/validate-email/", {
            body: JSON.stringify({email: emailValue}),
            method: "POST",
        }).then(response => response.json()).then(data => {
            console.log("data: ",data)
            emailsuccessOutput.style.display = "none"
            if(data.email_error){
                emailField.classList.add("is-invalid")
                emailFeedBackArea.style.display = "block"
                emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`
            }
        })
    }

})

usernameField.addEventListener("keyup", function (event) {
    const usernameValue =usernameField.value
    usernamesuccessOutput.style.display = "block"
    usernamesuccessOutput.textContent = `Checking ${usernameValue}`
    usernameField.classList.remove("is-invalid")
    feedBackArea.style.display = "none"

    if(usernameValue.length > 0){
    fetch("/authentication/validate-username/", {
        body: JSON.stringify({username: usernameValue}),
        method: "POST",
    }).then(response => response.json()).then(data => {
        console.log("data: ",data)
        usernamesuccessOutput.style.display = "none"
        if(data.username_error){
            usernameField.classList.add("is-invalid")
            feedBackArea.style.display = "block"
            feedBackArea.innerHTML = `<p>${data.username_error}</p>`
        }
 })
}
})