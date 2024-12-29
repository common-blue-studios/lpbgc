import client from "../contentful";

export interface ArtPiece {
  id: string;
  title: string;
  type: "traditional" | "digital";
  assets: {
    id: string;
    url: string;
    blurDataUrl?: string;
  }[];
}

export async function getArtPieces(): Promise<ArtPiece[]> {
  const fetchArtPieces = async (contentType: string, type: "traditional" | "digital") => {
    const entries = await client.getEntries({
      content_type: contentType,
      limit: 1,
    });
    return entries.items.map((item: any) => {

      const assets = item.fields.assets.map((asset: any) => ({
        id: asset.sys.id,
        url: `https:${asset.fields.file.url}`,
        blurDataUrl: `https:${asset.fields.file.url}`
      }));

      return {
        id: item.sys.id,
        title: item.fields.title || "Untitled",
        type,
        assets,
      };
    });
  };

  const traditionalArtPieces = await fetchArtPieces("traditionalArt", "traditional");
  const digitalArtPieces = await fetchArtPieces("DigitalArt", "digital");

  return [...traditionalArtPieces, ...digitalArtPieces];
}
