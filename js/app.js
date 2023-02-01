const form = document.querySelector("form");
const btnRefresh = document.querySelector('[data-js="refresh-button"]');
const rooContainer = document.querySelector('[data-js="root-containers"]');
const newRootContainer = document.querySelector(
  '[data-js="new-root-container"]'
);
const userImgHtml = document.querySelector('[data-js="userImg"]');
const userNameHtml = document.querySelector('[data-js="userName"]');
const bioHtml = document.querySelector('[data-js="bio"]');
const listOfRepositories = document.querySelector(
  '[data-js="listOfRepositories"]'
);

const requestTo = async (endPoint) => {
  try {
    const data = await fetch(endPoint);

    if (!data.ok) {
      console.log("Status not Ok");
    }
    return await data.json();
  } catch (error) {
    alert(`ATENÇÂO: ${error.message}`);
    console.log(error);
  }
};

const togglesContainers = () => {
  rooContainer.classList.toggle("display-none");
  newRootContainer.classList.toggle("display-none");
};

const getUserInfos = async (inputValue) => {
  const endPointToUserInfos = `https://api.github.com/users/${inputValue}`;
  const userInfosParsed = await requestTo(endPointToUserInfos);
  return userInfosParsed;
};

const getRepositories = async (url) => {
  const repositoriesParsed = await requestTo(url);
  return repositoriesParsed;
};

const renderRepositories = (repositories) => {
  const string = repositories.reduce(
    (acc, { name, description, html_url, language }) => {
      return (acc += `<li class="repository">
    <p class="repository-name"><span>Nome&#58;&ensp;</span>${name}</p>
    <p class="repository-description"><span>Descrição&#58;&ensp;</span>${description}</p>
    <p class="main-laguage"><span>Linguagem principal&#58;&ensp;</span>${language}</p>
    <a href="${html_url}" target="_blank" rel="noopener noreferrer"><button class="button-to-repository">Repositório</button></a>
    </li>`);
    },
    ""
  );

  return string;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const inputValue = event.target.inputSearch.value;
  console.log(inputValue);
  togglesContainers();

  const userInfosParsed = await getUserInfos(inputValue);
  const { avatar_url, name, bio, repos_url } = userInfosParsed;

  userImgHtml.src = avatar_url;
  userNameHtml.innerHTML = name;
  bioHtml.innerHTML = bio;

  const repositories = await getRepositories(repos_url);
  listOfRepositories.innerHTML = renderRepositories(repositories);

  form.reset();
});

btnRefresh.addEventListener("click", (event) => {
  location.reload();
});
