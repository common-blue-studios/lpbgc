import client from "../contentful";
import { getBlurData } from "@/utils/blur-data-generator";

export interface ArtPiece {
  id: string;
  title: string;
  type: "traditional" | "digital"; 
  assets: {
    id: string;
    url: string;
    blurDataUrl: string;
  }[];
}

export async function getArtPieces(): Promise<ArtPiece[]> {
  const fetchArtPieces = async (contentType: string, type: "traditional" | "digital") => {
    const entries = await client.getEntries({
      content_type: contentType,
      limit: 1,
    });
    return await Promise.all(
      entries.items.map(async (item: any) => {
        const assets = await Promise.all(
          item.fields.assets.map(async (asset: any) => {
            const url = `https:${asset.fields.file.url}`;
            const { base64 } = await getBlurData(url);

            return {
              id: asset.sys.id,
              title: asset.title,
              url,
              blurDataUrl: base64,
            };
          })
        );

        return {
          id: item.sys.id,
          title: item.fields.title,
          type,
          assets,
        };
      })
    );
  };

  const traditionalArtPieces = await fetchArtPieces("traditionalArt", "traditional");
  const digitalArtPieces = await fetchArtPieces("DigitalArt", "digital");

  return [...traditionalArtPieces, ...digitalArtPieces];
}