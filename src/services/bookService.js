const GOOGLE_BOOKS_QUERY = import.meta.env.VITE_GOOGLE_BOOKS_QUERY || 'best seller';
const GOOGLE_BOOKS_API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY || '';

function buildGoogleBooksUrl(query) {
  const params = new URLSearchParams({
    q: query,
    maxResults: '8',
    printType: 'books',
    projection: 'lite',
  });

  if (GOOGLE_BOOKS_API_KEY) {
    params.set('key', GOOGLE_BOOKS_API_KEY);
  }

  return `https://www.googleapis.com/books/v1/volumes?${params.toString()}`;
}

function mapGoogleBooksResponse(data) {
  if (!data?.items || !Array.isArray(data.items) || data.items.length === 0) return null;

  return data.items.map((item) => {
    const info = item.volumeInfo || {};
    const imageUrl =
      info.imageLinks?.thumbnail ||
      info.imageLinks?.smallThumbnail ||
      info.imageLinks?.small ||
      info.imageLinks?.medium ||
      info.imageLinks?.large ||
      info.imageLinks?.extraLarge ||
      '';

    return {
      title: info.title || 'Sin título',
      category: Array.isArray(info.categories) ? info.categories[0] : info.categories || 'General',
      image: imageUrl ? imageUrl.replace(/^http:/, 'https:') : '',
    };
  });
}

export async function fetchBookData(query) {
  const customUrl = import.meta.env.VITE_BOOK_API_URL;
  const requestUrl = customUrl || buildGoogleBooksUrl(query || GOOGLE_BOOKS_QUERY);

  const response = await fetch(requestUrl);
  if (!response.ok) {
    throw new Error(`Error al cargar libros: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const googleBooks = mapGoogleBooksResponse(data);
  if (googleBooks && googleBooks.length > 0) return googleBooks;

  return Array.isArray(data.books) ? data.books : null;
}
