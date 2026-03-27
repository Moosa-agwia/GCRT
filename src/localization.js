let defaultLanguage = navigator.language.toLocaleLowerCase().includes("ar")
  ? "ar"
  : "en";
if (localStorage.getItem("Lang")) {
  defaultLanguage = localStorage.getItem("Lang");
}
let MembersJsonFile = null;
let FeatsJsonFile = null;
let ActivitiesJsonFile = null;
let LocaleEnKeys = null;
let LocaleArKeys = null;

const MembersGrid = document.querySelector(".members-grid");
const FeatsGrid = document.querySelector(".feats-grid");
const ActivitiesGrid = document.querySelector(".activities-grid");

MembersGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on
FeatsGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on
ActivitiesGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on

const LoadLocales = () => {
  let translations = defaultLanguage == "en" ? LocaleEnKeys : LocaleArKeys;
  Object.keys(translations).forEach((key) => {
    // Find elements with class name matching the key
    const elements = document.getElementsByClassName(key);
    Array.from(elements).forEach((element) => {
      element.innerHTML = translations[key];
      //   .replaceAll("&lt;", "<")
      //   .replaceAll("&gt;", ">");
    });
  });
  console.log("Translated Succsesfully!");
};

const FetchLocales = () => {
  fetch(`./locales/${defaultLanguage}.json`)
    .then((response) => response.json())
    .then((translations) => {
      defaultLanguage == "en"
        ? (LocaleEnKeys = translations)
        : (LocaleArKeys = translations);
      LoadLocales();
    })
    .catch((error) => {
      console.error("Error loading locale file:", error);
    });
};

const LoadMembers = () => {
  let members = MembersJsonFile;

  members.Members.forEach((member) => {
    const memberDiv = document.createElement("div");
    memberDiv.innerHTML = `<div class="member-card">
            <div class="member-avatar">
              <img
                src="${member.Image}"
                alt="Team Member"
                class="member-logo"
              />
            </div>
            <h3>${
              defaultLanguage == "en" ? member.Name : member["Name-Arabic"]
            }</h3>
            <p class="member-role">${
              defaultLanguage == "en" ? member.Role : member["Role-Arabic"]
            }</p>
          </div>`;
    MembersGrid.appendChild(memberDiv);
  });
};

const LoadFeats = () => {
  let feats = FeatsJsonFile;

  feats.Feats.forEach((feat) => {
    const FeatDiv = document.createElement("div");
    FeatDiv.innerHTML = `
            <div class="feat-card">
              <div
                class="feat-image"
                style="background-image: url(${feat.Image})"
              ></div>
              <h3 class="feat-title">${
                defaultLanguage == "en" ? feat.Title : feat["Title-Arabic"]
              }</h3>
              <p class="feat-subtitle">
                ${
                  defaultLanguage == "en"
                    ? feat.Subtitle
                    : feat["Subtitle-Arabic"]
                }
              </p>
              <p class="feat-date">${feat.Date}</p>
              <a href="${feat.Link}" class="btn btn-secondary feat-button">${
                defaultLanguage == "en"
                  ? feat["learn-more"]
                  : feat["learn-more-Arabic"]
              }</a>
            </div>`;
    FeatsGrid.appendChild(FeatDiv);
  });
};

const LoadActivities = () => {
  let activities = ActivitiesJsonFile;

  activities.Activities.forEach((activity) => {
    const activitiesDiv = document.createElement("div");
    activitiesDiv.innerHTML = `
            <div class="activity-card">
              <div
                class="activity-image"
                style="background-image: url(${activity.Image})"
              ></div>
              <h3 class="activity-title">${
                defaultLanguage == "en"
                  ? activity.Title
                  : activity["Title-Arabic"]
              }</h3>
              <p class="activity-date">${activity.Date}</p>
              <a href="${activity.Link}" class="btn btn-secondary activity-button">${
                defaultLanguage == "en"
                  ? activity["learn-more"]
                  : activity["learn-more-Arabic"]
              }</a>
            </div>`;
    ActivitiesGrid.appendChild(activitiesDiv);
  });
};

const SetLanguage = () => {
  MembersGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on
  FeatsGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on
  ActivitiesGrid.textContent = ""; // Clearing so if we change languages we have a new slate to plob our members on

  // Figuring out RTL LTR
  if (defaultLanguage == "ar") {
    document.body.dir = "rtl";
    document.body.lang = "ar"; // for css purposes
  } else {
    document.body.dir = "ltr";
    document.body.lang = "en"; // for css purposes
  }

  // Fetch the locale file and apply translations

  if (defaultLanguage.toLocaleLowerCase() == "en") {
    LocaleEnKeys == null ? FetchLocales() : LoadLocales();
  } else if (defaultLanguage.toLocaleLowerCase() == "ar") {
    LocaleArKeys == null ? FetchLocales() : LoadLocales();
  }

  // Apply The locale file and apply translations for the members

  fetch("./Members.json")
    .then((response) => response.json())
    .then((members) => {
      MembersJsonFile = members;
      LoadMembers();
      console.log("Members loaded Succsesfully! From Fetch");
    });
  fetch("./Feats.json")
    .then((response) => response.json())
    .then((Feats) => {
      FeatsJsonFile = Feats;
      LoadFeats();
      console.log("Feats loaded Succsesfully! From Fetch");
    });

  fetch("./activities.json")
    .then((response) => response.json())
    .then((activites) => {
      ActivitiesJsonFile = activites;
      LoadActivities();
      console.log("Activities loaded Succsesfully! From Fetch");
    });
};

// Figuring out RTL LTR
const ChangeLanguage = () => {
  defaultLanguage == "en" ? (defaultLanguage = "ar") : (defaultLanguage = "en");
  localStorage.setItem("Lang", defaultLanguage);
  SetLanguage();
};

SetLanguage(); // Set the language on page load