// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PortableTextBlock = any;

function isVisualMarker(block: PortableTextBlock): boolean {
  if (block._type !== "block") return false;
  const text = (block.children ?? [])
    .map((child: { text?: string }) => child.text ?? "")
    .join("")
    .trim();
  return text === "[VISUAL]";
}

export function splitContentByVisualMarkers(
  content: PortableTextBlock[]
): PortableTextBlock[][] {
  if (!content || content.length === 0) return [[]];

  const segments: PortableTextBlock[][] = [];
  let current: PortableTextBlock[] = [];

  for (const block of content) {
    if (isVisualMarker(block)) {
      segments.push(current);
      current = [];
    } else {
      current.push(block);
    }
  }
  segments.push(current);

  return segments;
}
