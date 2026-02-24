import { notFound, redirect } from "next/navigation";
import { whitePaperConfig } from "../../whitePaperConfig";

export default function WhitePaperRedirect({
  params,
}: {
  params: { slug: string };
}) {
  const papers = whitePaperConfig[params.slug];
  if (!papers || papers.length === 0) notFound();
  redirect(`/platform/${params.slug}/white-paper/${papers[0].id}`);
}
