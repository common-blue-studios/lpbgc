# Art Portfolio Template




https://github.com/user-attachments/assets/c63a7484-a4ce-4a4d-91df-9d64f6f42094



Welcome to the **Art Portfolio Template Repository**! This repository is designed to be a fully customizable project that uses **Contentful** as the content management system (CMS) and **Next.js** for the frontend. This guide will help you set up, customize, and extend the template for your needs.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Contentful Setup](#contentful-setup)
  - [Content Structure](#content-structure)
  - [Adding Content](#adding-content)
3. [Customizing the Template](#customizing-the-template)
  - [Changing Navigation](#changing-navigation)
  - [Adding/Removing Pages](#addingremoving-pages)
  - [Updating Assets](#updating-assets)
4. [How to Add a New Gallery Filter](#how-to-add-a-new-gallery-filter)
5. [Deployment](#deployment)

---

## Getting Started

1. **Use this template:**

2. **Install Dependencies:**

  Ensure you have Node.js installed, then run:

  ```bash
  npm install
  ```

3. **Create a .env.local File:**

  Create a `.env.local` file at the root of your project with the following keys - [docs](https://www.contentful.com/developers/docs/references/authentication/#:~:text=API%20keys%20in%20the%20Contentful%20web%20app&text=Open%20the%20space%20that%20you,to%20the%20Settings%20%3E%20API%20keys.)

  ```plaintext
  CONTENTFUL_SPACE_ID=your_space_id
  CONTENTFUL_ACCESS_TOKEN=your_access_token
  ```

4. **Run the Development Server:**

  Start the server locally:

  ```bash
  npm run dev
  ```

  Open [http://localhost:3000](http://localhost:3000) to see your app in action.

---

## Contentful Setup

Contentful is the content management system we use to populate the website. Create an account with the free plan: https://www.contentful.com/

### Content Structure

Your Contentful space should follow this structure:

- **Gallery**: You can create a content-type for each type of media you want. In this case, I used two: Digital art and traditional art. Each one must have these fields:
  - `slug` - Entry title, short text
  - `title` - Text
  - `assets` - Media (Array of images or files for that media type)

   ![image](https://github.com/user-attachments/assets/01b3bb11-be46-4772-8091-590dc983b4c9)

   ![image](https://github.com/user-attachments/assets/a580b74c-b269-4c57-8bbe-5e090c771d14)

- **About**:
  - `slug`
  - `title`
  - `content` (LongText, markdown)
  - `banner` (Single file)

   ![image](https://github.com/user-attachments/assets/569bac37-54f1-40cd-adda-d208db194f0a)

- **Contact page**:
   - `slug`
  - `title`
  - `content` (LongText, markdown)   
   ![image](https://github.com/user-attachments/assets/7527d542-7331-4b66-bc6a-a311d449d27e)

- **Blog post**:
   - `slug`
  - `title`
  - `subtitle` 
  - `banner` (Single file)
  - `Post` (Rich Text)   
   <img width="1488" alt="image" src="https://github.com/user-attachments/assets/e9c0d9da-5640-4cdf-aeb9-19de4cf8a253" />


### Adding Content

1. Select the appropriate content type.
2. Fill in the fields.
3. Publish the entry.
4. Preview Your Changes: Your changes will automatically reflect if you're running the development server.

---

## Customizing the Template

### Changing Website Fixed Content

1. Open `src/config/presentation.ts`.
2. Update the `PRESENTATION` object with your information:

  ```javascript
  export const PRESENTATION = {
    home: {
     heroBackgroundImg: "/hero-pattern.png",
     heroLogoImg: "/hero-name.png",
     subtitle: "visual artist, designer",
    },
    blog: {
     author: "Luana",
    },
    footer: {
     instagram: "https://www.instagram.com/luana.g.m/",
     bluesky: "https://bsky.app/profile/luanagm.bsky.social",
     behance: "https://www.behance.net/luana_goes",
    }
  };
  ```

### Add API Keys to Contentful Configuration File

To adjust the configuration you made on your Contentful account with the project:

1. Open `src/config/contentful.ts`.
2. Update the `CONTENTFUL` object with your information:

  ```javascript
  export const CONTENTFUL = {
    aboutApiKey: "personalPortfolioAboutPage",
    projectsApiKey: "projects",
    blogApiKey: "blogPost",
    contactApiKey: "personalPortfolioAboutPage",
    spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
    accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    galleryApiKeys: [
     { key: "traditionalArt", label: "Traditional" },
     { key: "DigitalArt", label: "Digital" },
     // You can add more gallery types here, just make sure to create a content type in Contentful with the same name
    ],
  };
  ```

### Changing Navigation

To update the navigation:

1. Open `src/config/presentation.ts`.
2. Update the `NAVIGATION` array. For example, to remove the Contact page:

  ```javascript
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    // Remove Contact
  ];
  ```

3. Save the file and reload the app.

### Changing Meta Tags

To update the meta tags:

1. Open `src/config/seo.tsx`.
2. Update the `SEO` object:

  ```javascript
  export const SEO = {
    title: "Luana Góes",
    description: "Luana Góes - Visual Artist and Designer",
  };
  ```

3. Save the file and reload the app.

### Adding/Removing Pages

**To Add a New Page:**

1. Add a new entry in Contentful with the page content type.
2. Create a new file in `src/app` (e.g., `src/app/new-page/page.tsx`).
3. Fetch the page data from Contentful.

**To Remove a Page:**

1. Delete the corresponding file in `src/pages`.
2. Remove any navigation links pointing to the page.

### Updating Assets

Assets like logos and images are stored in the `/public` directory. To replace or add assets:

1. Place your images in the `/public` directory (e.g., `/public/images`).
2. Update references in the code. For example, to change the gallery logo in `GalleryClient`:

  ```tsx
  <Image src="/images/new-logo.png" alt="New Logo" width={300} height={300} />
  ```

---

## How to Add a New Gallery Filter

To add a new filter dynamically:

1. **Update Contentful:**

  Add a new option to the `type` field in the gallery content type (e.g., sculpture).

2. **Update the Template:**

  The filters and fetch logic are dynamic and will automatically include the new type. Add a new label in the `CONTENTFUL.galleryApiKeys` array:

  ```javascript
  galleryApiKeys: [
    { key: "traditional", label: "Traditional" },
    { key: "digital", label: "Digital" },
    { key: "sculpture", label: "Sculpture" }, // New Filter
  ];
  ```

---

## Deployment

1. **Build the Project:**

  ```bash
  npm run build
  ```

2. **Deploy to Vercel:**

  This project is optimized for Vercel. Connect your repository to Vercel, set your environment variables, and deploy.

3. **Set Environment Variables:**

  Ensure the `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are added in the deployment environment.

---

## Customization Options

- **Remove Pages:** Delete unnecessary pages and navigation links.
- **Add New Filters:** Update the `CONTENTFUL.galleryApiKeys` for new gallery types.
- **Update Branding:** Replace assets in `/public` and update references in the code.

---
