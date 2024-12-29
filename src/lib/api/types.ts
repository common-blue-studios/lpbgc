// types/contentful.ts
import { Entry } from "contentful";

export interface ArtPiece {
  contentTypeId: string;
  sys: {
    id: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    slug: string;
    title: string;
    type: "traditional" | "digital";
    assets: {
      fields: {
        file: {
          url: string;
        };
      };
    }[];
  };
}

export interface DigitalArtPiece extends ArtPiece {}
export interface TraditionalArtPiece extends ArtPiece {}
