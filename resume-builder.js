var userName = document.getElementById("name");
var email = document.getElementById("email");
var jobTitle = document.getElementById("email");
var profileBio = document.getElementById("profileBio");
var phoneNum = document.getElementById("phoneNum");
var skill = document.getElementById("skillsInput");
var education = document.getElementById("educationInput");
var experience = document.getElementById("experienceInput");
var resumeDiv = document.getElementById("resumeDiv");
var alertDiv = document.getElementById("alert");
var errorMessage = document.getElementById("error_message");
var educationList = document.getElementById("educationList");
var skillsList = document.getElementById("skillsList");
var experienceList = document.getElementById("experienceList");
var selectedFile;
var educationArray = [];
var skillsArray = [];
var experienceArray = [];
var closeErrorAlert = function () {
    alertDiv.style.opacity = "0";
    setTimeout(function () {
        alertDiv.style.opacity = "1";
        alertDiv.style.display = "none";
    }, 600);
};
var addEducation = function () {
    if (education.value.trim().length < 1) {
        education.focus();
        return;
    }
    else {
        educationArray.unshift(education.value);
        educationList.innerHTML += "<li>".concat(education.value, "</li>");
        education.value = "";
    }
};
var addSkill = function () {
    if (skill.value.trim().length < 1) {
        skill.focus();
        return;
    }
    else {
        skillsArray.unshift(skill.value);
        skillsList.innerHTML += "<li>".concat(skill.value, "</li>");
        skill.value = "";
    }
};
var addExperience = function () {
    if (experience.value.trim().length < 1) {
        experience.focus();
        return;
    }
    else {
        experienceArray.unshift(experience.value);
        experienceList.innerHTML += "<li>".concat(experience.value, "</li>");
        experience.value = "";
    }
};
var createResume = function (event) {
    event.preventDefault();
    if (userName.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your name";
    }
    else if (jobTitle.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your job title";
    }
    else if (email.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your email";
    }
    else if (phoneNum.value.trim().length < 0) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your phone number";
    }
    else if (profileBio.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your profile bio";
    }
    else if (educationArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please add atleast your last education";
    }
    else if (experienceArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your last experience";
    }
    else if (skillsArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please add atleast one skill";
    }
    else {
        var resume = {
            name: userName.value,
            email: email.value,
            phoneNum: parseInt(phoneNum.value),
            jobTitle: jobTitle.value,
            profileBio: profileBio.value,
            skills: skillsArray,
            education: educationArray,
            experience: experienceArray,
            profileImg: selectedFile,
        };
        localStorage.setItem("resume", JSON.stringify(resume));
        resumeDiv.innerHTML = "<div>\n      <h1>Your name: ".concat(userName.value, "</h1>\n      <h1>Your email: ").concat(email.value, "</h1>\n      <h1>Your phone number: ").concat(phoneNum.value, "</h1>\n      <img src=\"").concat(selectedFile, "\" height=\"100\" width=\"100\" />\n      </div>");
        userName.value = "";
        email.value = "";
        phoneNum.value = "";
    }
};
var uploadProfilePic = function () {
    var fileInput = document.getElementById("fileInput");
    var fileImg = document.getElementById("fileImg");
    fileImg.style.display = "block";
    if (fileInput.files && fileInput.files[0]) {
        selectedFile = URL.createObjectURL(fileInput.files[0]);
        fileImg.src = URL.createObjectURL(fileInput.files[0]);
    }
};
// let profileBtn = document.getElementById("profileDiv") as HTMLDivElement;
// profileBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   let fileInput = document.getElementById("fileInput") as HTMLInputElement;
//   fileInput.click();
// });
