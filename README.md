<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bfptec/bfptec">
    <img src="public/images/logo.png" alt="Logo" width="120" height="80">
  </a>

  <h3 align="center">Bfptec</h3>

  <p align="center">
     A full-stack blogging platform with Next.js, Payload CMS, and Mongodb.
    <br />
    <br />
    <a href="https://bfptec.jsclimber.ir/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#tech-stack">Tech Stack</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Bfptec Website Screen Shot][product-screenshot]](https://bfptec.jsclimber.ir/)

Bfptec is a full-stack blogging platform focused on water and wastewater purification technologies. It features a modern UI, a comprehensive admin panel, and robust data management capabilities. Powered by Next.js 15, the application leverages React, Shadcn UI, and other cutting-edge technologies to deliver an intuitive user experience.

### Admin Panel

[![Admin Panel Screen Shot][admin-screenshot]](https://bfptec.jsclimber.ir/admin)

The application is built with **Payload CMS**, which provides a feature-rich admin panel for content management. Some key features include:

- **Rich Text Editor:** Create and format posts with an easy-to-use editor supporting headings, lists, links, and more.
- **File Uploads:** Seamlessly upload and manage images, documents, and other media assets.
- **SEO Tools:** Optimize metadata, slugs, and other SEO-related fields directly within the admin interface.
- **Dynamic Page Builder:** Create and manage pages dynamically without touching the codebase.
- **Real-time Preview:** Preview content changes in real-time before publishing.
- **Customizable Dashboard:** Tailor the admin panel to your needs with plugins and configurations.

These features make the admin panel user-friendly and flexible, enabling efficient content management and website updates.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tech Stack

### Frontend

- [![React.js][React.js]][React-url]
- [![Tailwind CSS][Tailwind.css]][Tailwind-url]
- [![TypeScript][TypeScript]][TypeScript-url]

### Backend

- [![Next.js][Next.js]][Next-url]
- [![Payload CMS][Payload]][Payload-url]

### Database

- [![MongoDB][MongoDB]][MongoDB-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: Version `^18.20.2 || >=20.9.0` is required. Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions:
  ```sh
  nvm install 20.9.0
  nvm use 20.9.0
  ```

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/bfptec/bfptec.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd bfptec
    ```
3.  Install NPM packages
    ```sh
    npm install
    ```
4.  Configure environment variables:

    - Create a .env file in the root directory
    - Add the following variables:

    ```sh
    DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/bfptec
    NEXT_PUBLIC_SITE_URL=https://bfptec.example.com
    PAYLOAD_SECRET=your-secret-key
    ```

5.  Build and Run
    ```sh
    npm run build
    npm start
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## CI/CD

The deployment process is fully automated using **GitHub webhooks** and a custom **Bash script**. This ensures reliable, consistent, and efficient deployments to the production environment.

### Github Webhook

end point url wil be: *https://you-live-site.com/api/webhooks/github*

WEBHOOKS*SECRET: \_place at .env file.*

### Bash Script

!Note: this setup is for the CPanel Hosting services. for other deployment tools or services follow their documents.

- REPO_PATH: Path to the application.

  ```sh
  REPO_PATH="/home/jsclimbe/repositories/bfptec"
  ```

- TEMP_BUILD_PATH: a temporary directory. it will be removed after each deployment.

  ```sh
  TEMP_BUILD_PATH="/home/jsclimbe/repositories/bfptec-temp"
  ```

- HTACCESS: after a number of deployments cpanel restricts the process, so it's needed to cleer .htaccess file content.

  ```sh
  HTACCESS="/home/jsclimbe/bfptec.jsclimber.ir/.htaccess"
  ```

- APP_NAME: pm2 process name, by default it is set domain name.

  ```sh
  APP_NAME="bfptec.jsclimber.ir"
  ```

- LOG_FILE: bash logs stores at this log file, you can change the path if you like:

  ```sh
  LOG_FILE="/home/jsclimbe/deploy_bfptec.log"
  ```

See `deploy.sh` for more information.

## Backup

- **Media :** You need to download media folder from public directory regularly, this folder contains your uploaded files.
- **Database :** You need to backup Mongodb database then restore it with your local database or just keep it safe.

  1.  Extract downloaded database:
      ```sh
      tar -xvzf downloaded_monodb_database.tar.gz
      ```
  2.  (optional):if you set a local copy of project then, Restore:
      ```sh
      mongorestore --uri="mongodb://127.0.0.1/bfptec" --drop ./extracted_monodb_database
      ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

Roadmap

- [x] Add blogging functionality with an admin panel.
- [ ] Extend the Bfptec blogging website into a virtual water and wastewater lab.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Top contributors:

<a href="https://github.com/bfptec/bfptec/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bfptec/bfptec" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the Unlicense License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Amir Aryan - [@amiraryan1996](https://github.com/amiraryan1996) - amir.aryan.dv@gmail.com

Project Link: [https://github.com/bfptec/bfptec/](https://github.com/bfptec/bfptec/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Here are some resources that helped shape this project. Thanks to all the amazing tools and communities that make development easier and more efficient:

- [React](https://react.dev) - A JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org) - A React framework for building modern web applications.
- [Payload CMS](https://payloadcms.com) - A powerful headless CMS for managing content.
- [Shadcn UI](https://ui.shadcn.com) - A library of prebuilt and customizable UI components.
- [MongoDB](https://www.mongodb.com) - A NoSQL database for scalable and flexible data storage.
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework for rapid UI development.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: public/images/screenshot.png
[admin-screenshot]: public/images/screenshot-admin-panel.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Payload]: https://img.shields.io/badge/Payload%20CMS-000000?style=for-the-badge&logo=payloadcms&logoColor=white
[Payload-url]: https://payloadcms.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[Tailwind.css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[linkedin-url]: https://linkedin.com/in/amiraryan1996
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[contributors-shield]: https://img.shields.io/github/contributors/bfptec/bfptec.svg?style=for-the-badge
[contributors-url]: https://github.com/bfptec/bfptec/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bfptec/bfptec.svg?style=for-the-badge
[forks-url]: https://github.com/bfptec/bfptec/network/members
[stars-shield]: https://img.shields.io/github/stars/bfptec/bfptec.svg?style=for-the-badge
[stars-url]: https://github.com/bfptec/bfptec/stargazers
[issues-shield]: https://img.shields.io/github/issues/bfptec/bfptec.svg?style=for-the-badge
[issues-url]: https://github.com/bfptec/bfptec/issues
[license-shield]: https://img.shields.io/github/license/bfptec/bfptec.svg?style=for-the-badge
[license-url]: https://github.com/bfptec/bfptec/blob/master/LICENSE.txt
