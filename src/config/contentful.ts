
export const CONTENTFUL = {
  aboutApiKey: "personalPortfolioAboutPage",
  projectsApiKey: "projects",
  blogApiKey: "blogPost",
  contactApiKey: "personalPortfolioContactPage",
  spaceId: `${process.env.CONTENTFUL_SPACE_ID}`,
  accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
  galleryApiKeys: [
    { key: "traditionalArt", label: "Traditional" },
    { key: "DigitalArt", label: "Digital" },
    //You can add more gallery types here, just make sure to create a content type in Contentful with the same name
  ],
};