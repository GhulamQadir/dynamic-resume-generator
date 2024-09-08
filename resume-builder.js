var userName = document.getElementById("name");
var email = document.getElementById("email");
var jobTitle = document.getElementById("jobTitle");
var profileBio = document.getElementById("profileBio");
var phoneNum = document.getElementById("phoneNum");
var skill = document.getElementById("skillsInput");
var education = document.getElementById("educationInput");
var experience = document.getElementById("experienceInput");
var language = document.getElementById("languageInput");
var resumeDiv = document.getElementById("resumeDiv");
var alertDiv = document.getElementById("alert");
var errorMessage = document.getElementById("error_message");
var educationList = document.getElementById("educationList");
var skillsList = document.getElementById("skillsList");
var experienceList = document.getElementById("experienceList");
var languageList = document.getElementById("languageList");
var selectedFile;
var educationArray = [];
var skillsArray = [];
var experienceArray = [];
var languageArray = [];
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
    }
    else {
        experienceArray.unshift(experience.value);
        experienceList.innerHTML += "<li>".concat(experience.value, "</li>");
        experience.value = "";
    }
};
var addLanguage = function () {
    if (language.value.trim().length < 1) {
        language.focus();
    }
    else {
        languageArray.unshift(language.value);
        languageList.innerHTML += "<li>".concat(language.value, "</li>");
        language.value = "";
    }
};
var createResume = function (event) {
    event.preventDefault();
    if (userName.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your name";
        userName.focus();
    }
    else if (jobTitle.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your job title";
        jobTitle.focus();
    }
    else if (email.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your email";
        email.focus();
    }
    else if (phoneNum.value.trim().length < 0) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your phone number";
        phoneNum.focus();
    }
    else if (profileBio.value.trim().length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your profile bio";
        profileBio.focus();
    }
    else if (educationArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please add atleast your last education";
        education.focus();
    }
    else if (experienceArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please enter your last experience";
        experience.focus();
    }
    else if (skillsArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please add atleast one skill";
        skill.focus();
    }
    else if (languageArray.length < 1) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please add atleast one language";
        language.focus();
    }
    else if (!selectedFile) {
        alertDiv.style.display = "block";
        errorMessage.innerText = "Please upload your profile picture";
        language.focus();
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
            languages: languageArray,
            profileImg: selectedFile,
        };
        localStorage.setItem("resume", JSON.stringify(resume));
        var generatedLink = "https://dynamic-resume-generator-fg4kq6y7p-ghulamqadir1s-projects.vercel.app/".concat(userName.value);
        resumeDiv.innerHTML = "<div id=\"myResumeDiv\">\n        <div class=\"headerDiv\">\n            <div class=\"leftHandHeader\">\n                <div>\n                    <p class=\"name\">".concat(userName.value, "</p>\n                    <p class=\"jobTitle\">").concat(jobTitle.value, "</p>\n                </div>\n                <img class=\"profileImg\" src=\"").concat(selectedFile, "\" />\n            </div>\n            <div class=\"rightHandHeader\">\n                <p class=\"email\">Email: ").concat(email.value, "</p>\n                <p class=\"phoneNo\">Phone No: ").concat(phoneNum.value, "</p>\n            </div>\n        </div>\n\n           <div class=\"mainContentDiv\">\n            <div class=\"leftHandMainDiv\">\n                <div class=\"aboutMeDiv mainDivs\">\n                    <p class=\"mainDivHeadings\">About Me</p>\n                    <p class=\"aboutMeContent\">").concat(profileBio.value, "</p>\n                </div>\n                <div class=\"educationDiv mainDivs\">\n                    <p class=\"mainDivHeadings\">Education</p>\n                    <ul id=\"educationList\">\n            ").concat(educationArray.map(function (educationItem) { return "<li>".concat(educationItem, "</li>"); }), "\n                    </ul>\n                </div>\n                <div class=\"experienceDiv mainDivs\">\n                    <p class=\"mainDivHeadings\">Experience</p>\n                  \n                    <ul id=\"experienceList\">\n                            ").concat(experienceArray.map(function (expItem) { return "<li>".concat(expItem, "</li>"); }), "\n                    </ul>\n                </div>\n            </div>\n\n            <div class=\"rightHandMainDiv\">\n                <div class=\"experienceDiv mainDivs\">\n                    <p class=\"mainDivHeadings\">Skills</p>\n                    <ul id=\"skillsList\">\n                             ").concat(skillsArray.map(function (skillItem) { return "<li>".concat(skillItem, "</li>"); }), "\n                    </ul>\n                </div>\n                <div class=\"languageDiv\">\n                    <p class=\"mainDivHeadings mainDivs\">Languages</p>\n                    <ul id=\"languageList\">\n                           ").concat(languageArray.map(function (languageItem) { return "<li>".concat(languageItem, "</li>"); }), "\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n    </div>\n    <div class=\"lowerBtns\">\n    <button class=\"lowerBtns\" onclick=\"editResume('").concat(userName.value, "','").concat(jobTitle.value, "','").concat(email.value, "','").concat(phoneNum.value, "','").concat(profileBio, "',").concat(educationArray, ",").concat(skillsArray, ",").concat(experienceArray, ",").concat(languageArray, ")\">Edit Resume</button>\n    <button class=\"lowerBtns\" onclick=\"downloadPdf()\">Download pdf</button>\n    <button class=\"lowerBtns\"><a href=\"").concat(generatedLink, "\" target=\"_blank\">Share link</a></button>\n    </div>\n    ");
    }
};
var editResume = function (name, jobTitle, email, phoneNum, profileBio, educationArray, skillsArray, experienceArray, languageArray) {
    resumeDiv.innerHTML = "           \n            <p id=\"createResumeHeading\">Update Resume</p>\n            <form method=\"post\" onsubmit=\"updateResume(event)\">\n                <div class=\"inputDiv\">\n                    <input value=\"".concat(name, "\" id=\"name\" type=\"name\" placeholder=\"Your Name\">\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"jobTitle\" type=\"text\" placeholder=\"Your job title\">\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"email\" type=\"email\" placeholder=\"Your Email\">\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"phoneNum\" type=\"number\" placeholder=\"Phone No\">\n                </div>\n                <div class=\"inputDiv\">\n                    <textarea id=\"profileBio\" placeholder=\"Enter profile bio\" maxlength=\"400\"></textarea>\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"educationInput\" type=\"text\" placeholder=\"Add Education\">\n                    <button class=\"addBtn\" onclick=\"addEducation()\">+</button>\n                    <ul id=\"educationList\"></ul>\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"experienceInput\" type=\"text\" placeholder=\"Add Experience\">\n                    <button class=\"addBtn\" onclick=\"addExperience()\">+</button>\n                    <ul id=\"experienceList\"></ul>\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"skillsInput\" type=\"text\" placeholder=\"Add Skills\">\n                    <button class=\"addBtn\" onclick=\"addSkill()\">+</button>\n                    <ul id=\"skillsList\"></ul>\n                </div>\n                <div class=\"inputDiv\">\n                    <input id=\"languageInput\" type=\"text\" placeholder=\"Add Language\">\n                    <button class=\"addBtn\" onclick=\"addLanguage()\">+</button>\n                    <ul id=\"languageList\">\n").concat(languageArray.map(function (item) { return "<li>".concat(item, "</li>"); }), "\n                    </ul>\n                </div>\n                <div class=\"inputDiv\">\n                    <img id=\"fileImg\" src=\"\" alt=\"\">\n                    <input type=\"file\" id=\"fileInput\" onchange=\"uploadProfilePic()\" />\n                </div>\n                <button>Update Resume</button>\n                ");
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
