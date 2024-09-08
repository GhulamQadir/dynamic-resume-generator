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

const addEducation = () => {
  if (education.value.trim().length < 1) {
    education.focus();
  } else {
    educationArray.unshift(education.value);
    educationList.innerHTML += `<li>${education.value}</li>`;
    education.value = "";
  }
};
const addSkill = () => {
  if (skill.value.trim().length < 1) {
    skill.focus();
  } else {
    skillsArray.unshift(skill.value);
    skillsList.innerHTML += `<li>${skill.value}</li>`;
    skill.value = "";
  }
};
const addExperience = () => {
  if (experience.value.trim().length < 1) {
    experience.focus();
  } else {
    experienceArray.unshift(experience.value);
    experienceList.innerHTML += `<li>${experience.value}</li>`;
    experience.value = "";
  }
};
const addLanguage = () => {
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
    resumeDiv.innerHTML = `<div id="myResumeDiv">
        <div class="headerDiv">
            <div class="leftHandHeader">
                <div>
                    <p class="name">${userName.value}</p>
                    <p class="jobTitle">${jobTitle.value}</p>
                </div>
                <img class="profileImg" src="${selectedFile}" />
            </div>
            <div class="rightHandHeader">
                <p class="email">Email: ${email.value}</p>
                <p class="phoneNo">Phone No: ${phoneNum.value}</p>
            </div>
        </div>

           <div class="mainContentDiv">
            <div class="leftHandMainDiv">
                <div class="aboutMeDiv mainDivs">
                    <p class="mainDivHeadings">About Me</p>
                    <p class="aboutMeContent">${profileBio.value}</p>
                </div>
                <div class="educationDiv mainDivs">
                    <p class="mainDivHeadings">Education</p>
                    <ul id="educationList">
            ${educationArray.map(
              (educationItem) => `<li>${educationItem}</li>`
            )}
                    </ul>
                </div>
                <div class="experienceDiv mainDivs">
                    <p class="mainDivHeadings">Experience</p>
                  
                    <ul id="experienceList">
                            ${experienceArray.map(
                              (expItem) => `<li>${expItem}</li>`
                            )}
                    </ul>
                </div>
            </div>

            <div class="rightHandMainDiv">
                <div class="experienceDiv mainDivs">
                    <p class="mainDivHeadings">Skills</p>
                    <ul id="skillsList">
                             ${skillsArray.map(
                               (skillItem) => `<li>${skillItem}</li>`
                             )}
                    </ul>
                </div>
                <div class="languageDiv">
                    <p class="mainDivHeadings mainDivs">Languages</p>
                    <ul id="languageList">
                           ${languageArray.map(
                             (languageItem) => `<li>${languageItem}</li>`
                           )}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </div>
    <div class="lowerBtns">
    <button class="lowerBtns" onclick="editResume('${userName.value}','${
      jobTitle.value
    }','${email.value}','${
      phoneNum.value
    }','${profileBio}',${educationArray},${skillsArray},${experienceArray},${languageArray})">Edit Resume</button>
    <button class="lowerBtns" onclick="downloadPdf()">Download pdf</button>
    <button class="lowerBtns"><a href="${generatedLink}" target="_blank">Share link</a></button>
    </div>
    `;
  }
};

const editResume = (
  name: string,
  jobTitle: string,
  email: string,
  phoneNum: string,
  profileBio: string,
  educationArray: string[],
  skillsArray: string[],
  experienceArray: string[],
  languageArray: string[]
) => {
  resumeDiv.innerHTML = `           
            <p id="createResumeHeading">Update Resume</p>
            <form method="post" onsubmit="updateResume(event)">
                <div class="inputDiv">
                    <input value="${name}" id="name" type="name" placeholder="Your Name">
                </div>
                <div class="inputDiv">
                    <input id="jobTitle" type="text" placeholder="Your job title">
                </div>
                <div class="inputDiv">
                    <input id="email" type="email" placeholder="Your Email">
                </div>
                <div class="inputDiv">
                    <input id="phoneNum" type="number" placeholder="Phone No">
                </div>
                <div class="inputDiv">
                    <textarea id="profileBio" placeholder="Enter profile bio" maxlength="400"></textarea>
                </div>
                <div class="inputDiv">
                    <input id="educationInput" type="text" placeholder="Add Education">
                    <button class="addBtn" onclick="addEducation()">+</button>
                    <ul id="educationList"></ul>
                </div>
                <div class="inputDiv">
                    <input id="experienceInput" type="text" placeholder="Add Experience">
                    <button class="addBtn" onclick="addExperience()">+</button>
                    <ul id="experienceList"></ul>
                </div>
                <div class="inputDiv">
                    <input id="skillsInput" type="text" placeholder="Add Skills">
                    <button class="addBtn" onclick="addSkill()">+</button>
                    <ul id="skillsList"></ul>
                </div>
                <div class="inputDiv">
                    <input id="languageInput" type="text" placeholder="Add Language">
                    <button class="addBtn" onclick="addLanguage()">+</button>
                    <ul id="languageList">
${languageArray.map((item) => `<li>${item}</li>`)}
                    </ul>
                </div>
                <div class="inputDiv">
                    <img id="fileImg" src="" alt="">
                    <input type="file" id="fileInput" onchange="uploadProfilePic()" />
                </div>
                <button>Update Resume</button>
                `;
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
