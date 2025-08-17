export function paginate(total: number, page = 1, limit = 20) {
  const pages = Math.max(1, Math.ceil(total / limit));
  const current = Math.min(Math.max(1, page), pages);
  const skip = (current - 1) * limit;
  return { pages, current, skip, limit };
}
