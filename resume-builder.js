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
var addEducation = function (event) {
    event.preventDefault();
    if (education.value.trim().length < 1) {
        education.focus();
    }
    else {
        educationArray.unshift(education.value);
        educationList.innerHTML += "<li>".concat(education.value, "</li>");
        education.value = "";
    }
};
var addSkill = function (event) {
    event.preventDefault();
    if (skill.value.trim().length < 1) {
        skill.focus();
    }
    else {
        skillsArray.unshift(skill.value);
        skillsList.innerHTML += "<li>".concat(skill.value, "</li>");
        skill.value = "";
    }
};
var addExperience = function (event) {
    event.preventDefault();
    if (experience.value.trim().length < 1) {
        experience.focus();
    }
    else {
        experienceArray.unshift(experience.value);
        experienceList.innerHTML += "<li>".concat(experience.value, "</li>");
        experience.value = "";
    }
};
var addLanguage = function (event) {
    event.preventDefault();
    if (language.value.trim().length < 1) {
        language.focus();
    }
    else {
        languageArray.unshift(language.value);
        languageList.innerHTML += "<li>".concat(language.value, "</li>");
        language.value = "";
    }
};
var htmlContent = function (generatedLink) {
    var getData = localStorage.getItem("resume");
    var parsedData = getData ? JSON.parse(getData) : null;
    var name = parsedData.name, email = parsedData.email, phoneNum = parsedData.phoneNum, jobTitle = parsedData.jobTitle, profileBio = parsedData.profileBio, languages = parsedData.languages, experience = parsedData.experience, education = parsedData.education, skills = parsedData.skills;
    resumeDiv.innerHTML = "<div id=\"myResumeDiv\">\n  <div class=\"headerDiv\">\n      <div class=\"leftHandHeader\">\n          <div>\n              <p class=\"name\">".concat(name, "</p>\n              <p class=\"jobTitle\">").concat(jobTitle, "</p>\n          </div>\n          <img class=\"profileImg\" src=\"").concat(selectedFile, "\" />\n      </div>\n      <div class=\"rightHandHeader\">\n          <p class=\"email\">Email: ").concat(email, "</p>\n          <p class=\"phoneNo\">Phone No: ").concat(phoneNum, "</p>\n      </div>\n  </div>\n\n     <div class=\"mainContentDiv\">\n      <div class=\"leftHandMainDiv\">\n          <div class=\"aboutMeDiv mainDivs\">\n              <p class=\"mainDivHeadings\">About Me</p>\n              <p class=\"aboutMeContent\">").concat(profileBio, "</p>\n          </div>\n          <div class=\"educationDiv mainDivs\">\n              <p class=\"mainDivHeadings\">Education</p>\n              <ul id=\"educationList\">\n      ").concat(education.map(function (educationItem) { return "<li>".concat(educationItem, "</li>"); }), "\n              </ul>\n          </div>\n          <div class=\"experienceDiv mainDivs\">\n              <p class=\"mainDivHeadings\">Experience</p>\n            \n              <ul id=\"experienceList\">\n                      ").concat(experience.map(function (expItem) { return "<li>".concat(expItem, "</li>"); }), "\n              </ul>\n          </div>\n      </div>\n\n      <div class=\"rightHandMainDiv\">\n          <div class=\"experienceDiv mainDivs\">\n              <p class=\"mainDivHeadings\">Skills</p>\n              <ul id=\"skillsList\">\n                       ").concat(skills.map(function (skillItem) { return "<li>".concat(skillItem, "</li>"); }), "\n              </ul>\n          </div>\n          <div class=\"languageDiv\">\n              <p class=\"mainDivHeadings mainDivs\">Languages</p>\n              <ul id=\"languageList\">\n                     ").concat(languages.map(function (languageItem) { return "<li>".concat(languageItem, "</li>"); }), "\n              </ul>\n          </div>\n      </div>\n  </div>\n</div>\n</div>\n<div class=\"lowerBtnsDiv\">\n<button class=\"lowerBtns\" onclick=\"editResume()\">Edit Resume</button>\n<button class=\"lowerBtns\" onclick=\"downloadPdf()\">Download pdf</button>\n<button class=\"lowerBtns\"><a href=\"").concat(generatedLink, "\" target=\"_blank\">Share link</a></button>\n</div>\n");
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
        htmlContent(generatedLink);
    }
};
var editResumeDiv = document.getElementById("editResumeDiv");
var editUserName = document.getElementById("editNameField");
var editEmail = document.getElementById("editEmailField");
var editJobTitle = document.getElementById("editJobTitleField");
var editProfileBio = document.getElementById("editProfileBioField");
var editPhoneNum = document.getElementById("editPhoneNumField");
var editSkill = document.getElementById("editSkillsInputField");
var editEducation = document.getElementById("editEducationInputField");
var editExperience = document.getElementById("editExperienceInputField");
var editLanguage = document.getElementById("languageInput");
var editEducationList = document.getElementById("editEducationList");
var editSkillsList = document.getElementById("editSkillsList");
var editExperienceList = document.getElementById("editExperienceList");
var editLanguageList = document.getElementById("editLanguageList");
var addeditEducation = function (event) {
    event.preventDefault();
    if (editEducation.value.trim().length < 1) {
        editEducation.focus();
    }
    else {
        educationArray.unshift(editEducation.value);
        editEducationList.innerHTML += "<li>".concat(editEducation.value, "</li>");
        editEducation.value = "";
    }
};
var addeditSkill = function (event) {
    event.preventDefault();
    if (editSkill.value.trim().length < 1) {
        editSkill.focus();
    }
    else {
        skillsArray.unshift(editSkill.value);
        editSkillsList.innerHTML += "<li>".concat(editSkill.value, "</li>");
        editSkill.value = "";
    }
};
var addeditExperience = function (event) {
    event.preventDefault();
    if (editExperience.value.trim().length < 1) {
        editExperience.focus();
    }
    else {
        experienceArray.unshift(editExperience.value);
        editExperienceList.innerHTML += "<li>".concat(editExperience.value, "</li>");
        editExperience.value = "";
    }
};
var addeditLanguage = function (event) {
    event.preventDefault();
    if (editLanguage.value.trim().length < 1) {
        editLanguage.focus();
    }
    else {
        languageArray.unshift(editLanguage.value);
        editLanguageList.innerHTML += "<li>".concat(editLanguage.value, "</li>");
        editLanguage.value = "";
    }
};
var editResume = function () {
    var getData = localStorage.getItem("resume");
    var parsedData = getData ? JSON.parse(getData) : null;
    var name = parsedData.name, email = parsedData.email, phoneNum = parsedData.phoneNum, jobTitle = parsedData.jobTitle, profileBio = parsedData.profileBio, languages = parsedData.languages, experience = parsedData.experience, education = parsedData.education, skills = parsedData.skills;
    console.log(languageArray);
    resumeDiv.innerHTML = "";
    editResumeDiv.style.display = "block";
    editUserName.value = name;
    editEmail.value = email;
    editPhoneNum.value = phoneNum;
    editJobTitle.value = jobTitle;
    editProfileBio.value = profileBio;
    editEducationList.innerHTML = "".concat(education.map(function (item) { return "<li>".concat(item, "</li>"); }));
    editExperienceList.innerHTML = "".concat(experience.map(function (item) { return "<li>".concat(item, "</li>"); }));
    editSkillsList.innerHTML = "".concat(skills.map(function (item) { return "<li>".concat(item, "</li>"); }));
    editLanguageList.innerHTML = "".concat(languages.map(function (item) { return "<li>".concat(item, "</li>"); }));
};
var updateResume = function (event) {
    event.preventDefault();
    var resume = {
        name: editUserName.value,
        email: editEmail.value,
        phoneNum: parseInt(editPhoneNum.value),
        jobTitle: editJobTitle.value,
        profileBio: editProfileBio.value,
        skills: skillsArray,
        education: educationArray,
        experience: experienceArray,
        languages: languageArray,
        profileImg: selectedFile,
    };
    localStorage.setItem("resume", JSON.stringify(resume));
    editResumeDiv.style.display = "none";
    var generatedLink = "https://dynamic-resume-generator-fg4kq6y7p-ghulamqadir1s-projects.vercel.app/".concat(userName.value);
    htmlContent(generatedLink);
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
