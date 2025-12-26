import { isGuest, stripGuestAuthHeader } from "@utils/auth";

const originalFetch = window.fetch.bind(window);
window.fetch = async (input, init) => {
  const { url, method } = resolveRequest(input, init);

  if (isGuest()) {
    const headers = new Headers(
      (init && (init.headers as HeadersInit)) ||
      (input instanceof Request ? input.headers : undefined)
    );
    stripGuestAuthHeader(headers);
    init = { ...(init || {}), headers };
  }

  if (isGuest() && method === "GET" && url.pathname === "/api/projects") {
    const data = await readProjects();
    return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  return originalFetch(input as any, init as any);
};
