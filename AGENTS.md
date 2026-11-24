<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.

<!-- LOVABLE:END -->

- Keep the ECFS landing page and detail routes server-rendered; load the facility scene as an isolated client-only enhancement so WebGL never blocks access to page content.
- Share service, sector, location, and FAQ data between visible pages and structured metadata to prevent content drift.
- Use explicit routes for primary ECFS navigation and preserve the original slug-based detail URLs so existing links remain valid.
- Centralize photo references and illustrative alt text in the ECFS imagery module so page cards and detail views stay consistent.
- Keep blog articles in one shared content module used by the directory, article routes, and sitemap so published entries stay in sync.
- Keep the maintenance adviser stateless and server-side; resolve model-selected guide slugs against the shared blog catalog so it never invents links.
- Keep maintenance enquiry submissions separate from recommendation requests; validate and store them server-side so contact details never enter the model prompt or become publicly readable.
