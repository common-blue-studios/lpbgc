import { CONTENTFUL } from "@/config/contentful";
import client from "../contentful";

export interface ArtPiece {
  id: string;
  title: string;
  type: string;
  assets: {
    id: string;
    url: string;
    blurDataUrl?: string;
  }[];
}

export async function getArtPieces(): Promise<ArtPiece[]> {
  const promises = CONTENTFUL.galleryApiKeys.map(async ({ key }) => {
    const entries = await client.getEntries({ content_type: key });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled",
      type: key,
      assets: item.fields.assets.map((asset: any) => ({
        id: asset.sys.id,
        url: `https:${asset.fields.file.url}`,
        blurDataUrl: `https:${asset.fields.file.url}`,
      })),
    }));
  });

  const results = await Promise.all(promises);
  return results.flat();
}
