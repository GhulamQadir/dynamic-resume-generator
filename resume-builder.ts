let userName = document.getElementById("name") as HTMLInputElement;
let email = document.getElementById("email") as HTMLInputElement;
let jobTitle = document.getElementById("jobTitle") as HTMLInputElement;
let profileBio = document.getElementById("profileBio") as HTMLInputElement;
let phoneNum = document.getElementById("phoneNum") as HTMLInputElement;
let skill = document.getElementById("skillsInput") as HTMLInputElement;
let education = document.getElementById("educationInput") as HTMLInputElement;
let experience = document.getElementById("experienceInput") as HTMLInputElement;
let language = document.getElementById("languageInput") as HTMLInputElement;
let resumeDiv = document.getElementById("resumeDiv") as HTMLDivElement;
let alertDiv = document.getElementById("alert") as HTMLDivElement;
let errorMessage = document.getElementById("error_message") as HTMLSpanElement;
let educationList = document.getElementById(
  "educationList"
) as HTMLUListElement;
let skillsList = document.getElementById("skillsList") as HTMLUListElement;
let experienceList = document.getElementById(
  "experienceList"
) as HTMLUListElement;
let languageList = document.getElementById("languageList") as HTMLUListElement;

let selectedFile: string;

let educationArray: string[] = [];
let skillsArray: string[] = [];
let experienceArray: string[] = [];
let languageArray: string[] = [];

const closeErrorAlert = () => {
  alertDiv.style.opacity = "0";
  setTimeout(() => {
    alertDiv.style.opacity = "1";
    alertDiv.style.display = "none";
  }, 600);
};

const addEducation = (event) => {
  event.preventDefault();
  if (education.value.trim().length < 1) {
    education.focus();
  } else {
    educationArray.unshift(education.value);
    educationList.innerHTML += `<li>${education.value}</li>`;
    education.value = "";
  }
};
const addSkill = (event) => {
  event.preventDefault();
  if (skill.value.trim().length < 1) {
    skill.focus();
  } else {
    skillsArray.unshift(skill.value);
    skillsList.innerHTML += `<li>${skill.value}</li>`;
    skill.value = "";
  }
};
const addExperience = (event) => {
  event.preventDefault();
  if (experience.value.trim().length < 1) {
    experience.focus();
  } else {
    experienceArray.unshift(experience.value);
    experienceList.innerHTML += `<li>${experience.value}</li>`;
    experience.value = "";
  }
};
const addLanguage = (event) => {
  event.preventDefault();
  if (language.value.trim().length < 1) {
    language.focus();
  } else {
    languageArray.unshift(language.value);
    languageList.innerHTML += `<li>${language.value}</li>`;
    language.value = "";
  }
};

interface Resume {
  name: string;
  email: string;
  phoneNum: number;
  jobTitle: string;
  profileBio: string;
  skills: string[];
  education: string[];
  experience: string[];
  languages: string[];
  profileImg: string;
}

const htmlContent = (generatedLink) => {
  let getData = localStorage.getItem("resume");
  let parsedData = getData ? JSON.parse(getData) : null;
  let {
    name,
    email,
    phoneNum,
    jobTitle,
    profileBio,
    languages,
    experience,
    education,
    skills,
  }: Resume = parsedData;
  resumeDiv.innerHTML = `<div id="myResumeDiv">
  <div class="headerDiv">
      <div class="leftHandHeader">
          <div>
              <p class="name">${name}</p>
              <p class="jobTitle">${jobTitle}</p>
          </div>
          <img class="profileImg" src="${selectedFile}" />
      </div>
      <div class="rightHandHeader">
          <p class="email">Email: ${email}</p>
          <p class="phoneNo">Phone No: ${phoneNum}</p>
      </div>
  </div>

     <div class="mainContentDiv">
      <div class="leftHandMainDiv">
          <div class="aboutMeDiv mainDivs">
              <p class="mainDivHeadings">About Me</p>
              <p class="aboutMeContent">${profileBio}</p>
          </div>
          <div class="educationDiv mainDivs">
              <p class="mainDivHeadings">Education</p>
              <ul id="educationList">
      ${education.map((educationItem) => `<li>${educationItem}</li>`)}
              </ul>
          </div>
          <div class="experienceDiv mainDivs">
              <p class="mainDivHeadings">Experience</p>
            
              <ul id="experienceList">
                      ${experience.map((expItem) => `<li>${expItem}</li>`)}
              </ul>
          </div>
      </div>

      <div class="rightHandMainDiv">
          <div class="experienceDiv mainDivs">
              <p class="mainDivHeadings">Skills</p>
              <ul id="skillsList">
                       ${skills.map((skillItem) => `<li>${skillItem}</li>`)}
              </ul>
          </div>
          <div class="languageDiv">
              <p class="mainDivHeadings mainDivs">Languages</p>
              <ul id="languageList">
                     ${languages.map(
                       (languageItem) => `<li>${languageItem}</li>`
                     )}
              </ul>
          </div>
      </div>
  </div>
</div>
</div>
<div class="lowerBtnsDiv">
<button class="lowerBtns" onclick="editResume()">Edit Resume</button>
<button class="lowerBtns" onclick="downloadPdf()">Download pdf</button>
<button class="lowerBtns"><a href="${generatedLink}" target="_blank">Share link</a></button>
</div>
`;
};

const createResume = (event) => {
  event.preventDefault();
  if (userName.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your name";
    userName.focus();
  } else if (jobTitle.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your job title";
    jobTitle.focus();
  } else if (email.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your email";
    email.focus();
  } else if (phoneNum.value.trim().length < 0) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your phone number";
    phoneNum.focus();
  } else if (profileBio.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your profile bio";
    profileBio.focus();
  } else if (educationArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please add atleast your last education";
    education.focus();
  } else if (experienceArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your last experience";
    experience.focus();
  } else if (skillsArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please add atleast one skill";
    skill.focus();
  } else if (languageArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please add atleast one language";
    language.focus();
  } else if (!selectedFile) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please upload your profile picture";
    language.focus();
  } else {
    let resume: Resume = {
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

    let generatedLink = `https://dynamic-resume-generator-fg4kq6y7p-ghulamqadir1s-projects.vercel.app/${userName.value}`;
    htmlContent(generatedLink);
  }
};

let editResumeDiv = document.getElementById(
  "editResumeDiv"
) as HTMLInputElement;
let editUserName = document.getElementById("editNameField") as HTMLInputElement;
let editEmail = document.getElementById("editEmailField") as HTMLInputElement;
let editJobTitle = document.getElementById(
  "editJobTitleField"
) as HTMLInputElement;
let editProfileBio = document.getElementById(
  "editProfileBioField"
) as HTMLInputElement;
let editPhoneNum = document.getElementById(
  "editPhoneNumField"
) as HTMLInputElement;
let editSkill = document.getElementById(
  "editSkillsInputField"
) as HTMLInputElement;
let editEducation = document.getElementById(
  "editEducationInputField"
) as HTMLInputElement;
let editExperience = document.getElementById(
  "editExperienceInputField"
) as HTMLInputElement;
let editLanguage = document.getElementById("languageInput") as HTMLInputElement;
let editEducationList = document.getElementById(
  "editEducationList"
) as HTMLUListElement;
let editSkillsList = document.getElementById(
  "editSkillsList"
) as HTMLUListElement;
let editExperienceList = document.getElementById(
  "editExperienceList"
) as HTMLUListElement;
let editLanguageList = document.getElementById(
  "editLanguageList"
) as HTMLUListElement;

const addeditEducation = (event) => {
  event.preventDefault();
  if (editEducation.value.trim().length < 1) {
    editEducation.focus();
  } else {
    educationArray.unshift(editEducation.value);
    editEducationList.innerHTML += `<li>${editEducation.value}</li>`;
    editEducation.value = "";
  }
};
const addeditSkill = (event) => {
  event.preventDefault();
  if (editSkill.value.trim().length < 1) {
    editSkill.focus();
  } else {
    skillsArray.unshift(editSkill.value);
    editSkillsList.innerHTML += `<li>${editSkill.value}</li>`;
    editSkill.value = "";
  }
};
const addeditExperience = (event) => {
  event.preventDefault();
  if (editExperience.value.trim().length < 1) {
    editExperience.focus();
  } else {
    experienceArray.unshift(editExperience.value);
    editExperienceList.innerHTML += `<li>${editExperience.value}</li>`;
    editExperience.value = "";
  }
};
const addeditLanguage = (event) => {
  event.preventDefault();
  if (editLanguage.value.trim().length < 1) {
    editLanguage.focus();
  } else {
    languageArray.unshift(editLanguage.value);
    editLanguageList.innerHTML += `<li>${editLanguage.value}</li>`;
    editLanguage.value = "";
  }
};
const editResume = () => {
  let getData = localStorage.getItem("resume");
  let parsedData = getData ? JSON.parse(getData) : null;
  let {
    name,
    email,
    phoneNum,
    jobTitle,
    profileBio,
    languages,
    experience,
    education,
    skills,
  } = parsedData;
  resumeDiv.innerHTML = "";
  editResumeDiv.style.display = "block";
  editUserName.value = name;
  editEmail.value = email;
  editPhoneNum.value = phoneNum;
  editJobTitle.value = jobTitle;
  editProfileBio.value = profileBio;
  editEducationList.innerHTML = `${education.map(
    (item: string) => `<li>${item}</li>`
  )}`;
  editExperienceList.innerHTML = `${experience.map(
    (item: string) => `<li>${item}</li>`
  )}`;
  editSkillsList.innerHTML = `${skills.map(
    (item: string) => `<li>${item}</li>`
  )}`;
  editLanguageList.innerHTML = `${languages.map(
    (item: string) => `<li>${item}</li>`
  )}`;
};

const updateResume = (event) => {
  event.preventDefault();

  let resume: Resume = {
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
  let generatedLink = `https://dynamic-resume-generator-fg4kq6y7p-ghulamqadir1s-projects.vercel.app/${userName.value}`;
  htmlContent(generatedLink);
};
const uploadProfilePic = () => {
  let fileInput = document.getElementById("fileInput") as HTMLInputElement;
  const fileImg = document.getElementById("fileImg") as HTMLImageElement;
  fileImg.style.display = "block";
  if (fileInput.files && fileInput.files[0]) {
    selectedFile = URL.createObjectURL(fileInput.files[0]);
    fileImg.src = URL.createObjectURL(fileInput.files[0]);
  }
};
