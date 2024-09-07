let userName = document.getElementById("name") as HTMLInputElement;
let email = document.getElementById("email") as HTMLInputElement;
let jobTitle = document.getElementById("email") as HTMLInputElement;
let profileBio = document.getElementById("profileBio") as HTMLInputElement;
let phoneNum = document.getElementById("phoneNum") as HTMLInputElement;
let skill = document.getElementById("skillsInput") as HTMLInputElement;
let education = document.getElementById("educationInput") as HTMLInputElement;
let experience = document.getElementById("experienceInput") as HTMLInputElement;
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
let selectedFile: string;

let educationArray: string[] = [];
let skillsArray: string[] = [];
let experienceArray: string[] = [];

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
    return;
  } else {
    educationArray.unshift(education.value);
    educationList.innerHTML += `<li>${education.value}</li>`;
    education.value = "";
  }
};
const addSkill = () => {
  if (skill.value.trim().length < 1) {
    skill.focus();
    return;
  } else {
    skillsArray.unshift(skill.value);
    skillsList.innerHTML += `<li>${skill.value}</li>`;
    skill.value = "";
  }
};
const addExperience = () => {
  if (experience.value.trim().length < 1) {
    experience.focus();
    return;
  } else {
    experienceArray.unshift(experience.value);
    experienceList.innerHTML += `<li>${experience.value}</li>`;
    experience.value = "";
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
  profileImg: string;
}
const createResume = (event: any) => {
  event.preventDefault();
  if (userName.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your name";
  } else if (jobTitle.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your job title";
  } else if (email.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your email";
  } else if (phoneNum.value.trim().length < 0) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your phone number";
  } else if (profileBio.value.trim().length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your profile bio";
  } else if (educationArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please add atleast your last education";
  } else if (experienceArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please enter your last experience";
  } else if (skillsArray.length < 1) {
    alertDiv.style.display = "block";
    errorMessage.innerText = "Please add atleast one skill";
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
      profileImg: selectedFile,
    };
    localStorage.setItem("resume", JSON.stringify(resume));

    resumeDiv.innerHTML = `<div>
      <h1>Your name: ${userName.value}</h1>
      <h1>Your email: ${email.value}</h1>
      <h1>Your phone number: ${phoneNum.value}</h1>
      <img src="${selectedFile}" height="100" width="100" />
      </div>`;
    userName.value = "";
    email.value = "";
    phoneNum.value = "";
  }
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

// let profileBtn = document.getElementById("profileDiv") as HTMLDivElement;
// profileBtn.addEventListener("click", (event) => {
//   event.preventDefault();
//   let fileInput = document.getElementById("fileInput") as HTMLInputElement;
//   fileInput.click();
// });
