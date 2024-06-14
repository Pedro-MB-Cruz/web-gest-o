(async () => {
  await fetch("/static/template/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("root").insertAdjacentHTML("afterbegin", data);
  });
})();
/**
 * Eye Closed icon SVG to hide the password
 */
const hidePasswordSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
            <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
            <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
        </svg>`;

/**
 *  Eye icon SVG to show the password
 */
const showPasswordSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
        </svg>`;

/**
 * This function is used to show the password
 * Toggling the input type between password and text
 * @param {Event} e - Event object
 */
function showPassword(e) {
  const parent = e.currentTarget.parentElement; // parent div
  const input = parent.querySelector("input"); // input element
  if (input.type === "password") {
    // if input type is password
    // change input type to text
    input.type = "text";
    e.currentTarget.innerHTML = hidePasswordSVG;
  } else {
    // if input type is text
    // change input type to password
    input.type = "password";
    e.currentTarget.innerHTML = showPasswordSVG;
  }
}

/**
 * This function is used to signout the user
 * Sending a POST request to /api/auth/signout
 * To clear the token from cookies and then from localstorage
 * Redirecting the user to /signin
 * @param {Event} e - Event object
 */
function signout(e) {
  e.preventDefault();
  // Sending a POST request to /api/auth/signout
  fetch("/api/auth/signout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    // Check the response
    if (response.status === 200) {
      // If response status is 200 (OK)
      // Clear the token from localstorage
      localStorage.removeItem("token");
      // Redirect the user to /signin
      window.location.href = "/signin";
    }
  });
}

async function checkAuth() {
  if (!localStorage.getItem("token")) {
    return {
      loggedIn: false,
    };
  }
  // Sending a GET request to /api/user
  try {
    const response = await fetch("/api/user/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      // If response status is 200 (OK)
      // Parse the response
      const data = await response.json();
      // If user is present in the response
      if (data) {
        // Return the user
        return {
          loggedIn: true,
          data,
        };
      }
    }
    return {
      loggedIn: false,
    };
  } catch (error) {
    return {
      loggedIn: false,
    };
  }
}

/**
 * Object to check if the user is logged in
 */
const loggedIn = {
  // loading property to check if the check is in progress
  loading: true,
  /**
   * Check the Auth sending a GET Request to the API
   * @returns {void}
   */
  check: async () => {
    try {
      const d = await checkAuth();
      loggedIn.loading = false;
      loggedIn.loggedIn = d.loggedIn;
      loggedIn.data = d.data;
    } catch (e) {
      loggedIn.loading = false;
    }
    return;
  },
  // loggedIn property to check if the user is logged in or not
  loggedIn: false,
  // data property to store the user data (undefined by default)
  data: undefined,
};

/**
 *
 * @param {() => void} clb
 * @returns {void}
 */
const loggedInPromise = (clb) => {
  if (!loggedIn.loading) {
    // Already loaded
    clb();
  }
  new Promise((resolve, reject) => {
    loggedIn.check().then(() => {
      clb();
      resolve();
    });
  });
};

const loginDropdownButton = `<li>
<a class="dropdown-item" href="/signin">
    <div class="d-flex flex-row align-items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
        </svg>
        Signin
    </div>
</a>
</li>`;

const registerDropdownButton = `<li>
<a class="dropdown-item" href="/signup">
    <div class="d-flex flex-row align-items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
        </svg>
        Signup
    </div>
</a>
</li>`;
const logoutDropdownButton = `<li>
<a class="dropdown-item" href="#" onclick="signout(event);">
    <div class="d-flex flex-row align-items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="icon">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        Sair
    </div>
</a>
</li>`;

const adminDropdownButton = `
<li>
  <a class="dropdown-item" href="/p/admin">
    <div class="d-flex flex-row align-items-center gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.867 19.125h.008v.008h-.008v-.008Z" />
      </svg>
      Painel Administrador
    </div>
  </a>
</li> 
`;

const dropdownDivider = `<li>
<hr class="dropdown-divider">
</li>`;

// Check if the user is logged in and render stuff with it (Dropdown Menu)
loggedInPromise(() => {
  // Dropdown Menu
  let dropdownMenu = document.getElementById(
    "dropdown-navbar-profile-menu-auth"
  );

  setTimeout(() => {

    if (loggedIn.loggedIn) {
      // Logged In
      dropdownMenu.innerHTML = `
      ${logoutDropdownButton}
      `;
      if (loggedIn.data.role === "ADMIN") {
        // Admin
        dropdownMenu.parentNode.innerHTML += `
          ${dropdownDivider}
          ${adminDropdownButton}
        `;
      }
    } else {
      // Not Logged In
      dropdownMenu.innerHTML = `
      ${registerDropdownButton}
      ${loginDropdownButton}
      `;
    }
  }, 500)

})


