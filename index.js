const iconMapping = {
  "switch":    `<svg class="w-5 h-5 inline-block" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 448 512"><path d="M95.9 33.5c-44.6 8-80.5 41-91.8 84.4C0 133.6-.3 142.8.2 264.4C.4 376 .5 378.6 2.4 387.3c10.3 46.5 43.3 79.6 90.3 90.5c6.1 1.4 13.9 1.7 64.1 1.9c51.9.4 57.3.3 58.7-1.1c1.4-1.4 1.5-19.3 1.5-222.2c0-150.5-.3-221.3-.9-222.6c-.9-1.7-2.5-1.8-56.9-1.7c-44.2.1-57.5.4-63.3 1.4zm83.9 222.6V444l-37.8-.5c-34.8-.4-38.5-.6-45.5-2.3c-29.9-7.7-52-30.7-58.3-60.7c-2-9.4-2-240.1-.1-249.3c5.6-26.1 23.7-47.7 48-57.4c12.2-4.9 17.9-5.5 57.6-5.6l35.9-.1v188zm-75.9-131.2c-5.8 1.1-14.7 5.6-19.5 9.7c-9.7 8.4-14.6 20.4-13.8 34.5c.4 7.3.8 9.3 3.8 15.2c4.4 9 10.9 15.6 19.9 20c6.2 3.1 7.8 3.4 15.9 3.7c7.3.3 9.9 0 14.8-1.7c20.1-6.8 32.3-26.3 28.8-46.4c-3.9-23.7-26.6-39.7-49.9-35zm158.2-92.3c-.4.3-.6 100.8-.6 223.5c0 202.3.1 222.8 1.5 223.4c2.5.9 74.5.6 83.4-.4c37.7-4.3 71-27.2 89-61.2c2.3-4.4 5.4-11.7 7-16.2c5.8-17.4 5.7-12.8 5.7-146.1c0-106.4-.2-122.3-1.5-129c-9.2-48.3-46.1-84.8-94.5-93.1c-6.5-1.1-16.5-1.4-48.8-1.4c-22.4-.1-40.9.2-41.2.5zm99.1 202.1c14.5 3.8 26.3 14.8 31.2 28.9c3.1 8.7 3 21.5-.1 29.5c-5.7 14.7-16.8 25-31.1 28.8c-23.2 6-47.9-8-54.6-31c-2-7-1.9-18.9.4-26.2c6.9-22.7 31-36.1 54.2-30z"/></svg>`,
  "psn":       `<i class="fab fa-playstation w-5 h-5"></i>`,
  "battlenet": `<i class="fab fa-battle-net w-5 h-5"></i>`,
  "steam":     `<i class="fab fa-steam w-5 h-5"></i>`,
  "discord":   `<i class="fab fa-discord w-5 h-5"></i>`,
}

const createDivWithClass = className => {
  const div = document.createElement("div");
  div.className = className;
  return div;
};

const createPlatformLine = (platform, value) =>
  `<p><span class="community-title ${platform}">${platform}:</span> ${value}</p>`;

const addAccountInfoDOM = account => {
  const accountEl = createDivWithClass("account");

  // thumbnail 추가
  if (account.thumbnail) {
    accountEl.innerHTML = `<img class="account-thumbnail" src="${
      account.thumbnail
    }">`;
  } else {
    accountEl.innerHTML = `<img class="account-thumbnail" src="https://api.adorable.io/avatars/128/${
      account.nickname
    }.png">`;
  }

  const accountInfoEl = createDivWithClass("account-info");

  // nickname 추가
  accountInfoEl.innerHTML += `<p class="nickname">${account.nickname}</p>`;

  // platform info 추가
  for (const platform in account) {
    if (platform !== "thumbnail" && platform !== "nickname") {
      accountInfoEl.innerHTML += createPlatformLine(
        platform,
        account[platform]
      );
    }
  }

  accountEl.appendChild(accountInfoEl);

  return accountEl;
};

fetch("./accounts.json")
  .then(res => res.json())
  .then(accounts => {
    const accountsDOM = createDivWithClass("accounts");
    const filteredAccounts = accounts.filter(account => "nickname" in account); // nickname 없는 data는 빼버림
    filteredAccounts.forEach(account => {
      accountsDOM.appendChild(addAccountInfoDOM(account));
    });

    document.body.appendChild(accountsDOM);
  });
